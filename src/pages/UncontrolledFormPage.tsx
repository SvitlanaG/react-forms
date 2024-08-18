import { RefObject, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ValidationError } from 'yup';
import Navigation from '../components/Navigation';
import { addUser } from '../store/user/userSlice';
import { countries } from '../utils/constants/countries';
import { fileToBase64 } from '../utils/formUtils';
import { userSchema } from '../utils/validations/UserValidation';

interface UserFormRefs {
    name: RefObject<HTMLInputElement>;
    age: RefObject<HTMLInputElement>;
    email: RefObject<HTMLInputElement>;
    password: RefObject<HTMLInputElement>;
    confirmPassword: RefObject<HTMLInputElement>;
    gender: RefObject<HTMLSelectElement>;
    terms: RefObject<HTMLInputElement>;
    picture: RefObject<HTMLInputElement>;
    country: RefObject<HTMLInputElement>;
}

export default function UncontrolledFormPage() {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user: UserFormRefs = {
        name: useRef<HTMLInputElement>(null),
        age: useRef<HTMLInputElement>(null),
        email: useRef<HTMLInputElement>(null),
        password: useRef<HTMLInputElement>(null),
        confirmPassword: useRef<HTMLInputElement>(null),
        gender: useRef<HTMLSelectElement>(null),
        terms: useRef<HTMLInputElement>(null),
        picture: useRef<HTMLInputElement>(null),
        country: useRef<HTMLInputElement>(null),
    };

    const resetForm = () => {
        Object.values(user).forEach((ref) => {
            if (ref.current) {
                if (ref.current instanceof HTMLInputElement) {
                    if (ref.current.type === 'checkbox') {
                        ref.current.checked = false;
                    } else {
                        ref.current.value = '';
                    }
                } else if (ref.current instanceof HTMLSelectElement) {
                    ref.current.selectedIndex = 0;
                }
            }
        });
    };

    const createUserProfile = async () => {
        if (
            user.name.current &&
            user.age.current &&
            user.email.current &&
            user.password.current &&
            user.confirmPassword.current &&
            user.gender.current &&
            user.terms.current &&
            user.picture.current &&
            user.country.current
        ) {
            const pictureFile = user.picture.current.files?.[0];
            let base64Picture: string | undefined = undefined;

            if (pictureFile) {
                base64Picture = await fileToBase64(pictureFile);
            }
            const testData = {
                name: user.name.current.value,
                age: Number(user.age.current.value),
                email: user.email.current.value,
                password: user.password.current.value,
                confirmPassword: user.confirmPassword.current.value,
                gender: user.gender.current.value as 'male' | 'female' | 'diverse',
                terms: user.terms.current.checked,
                picture: user.picture.current.files?.[0],
                country: user.country.current.value,
            };
            const userData = {
                name: user.name.current.value,
                age: Number(user.age.current.value),
                email: user.email.current.value,
                password: user.password.current.value,
                confirmPassword: user.confirmPassword.current.value,
                gender: user.gender.current.value as 'male' | 'female' | 'diverse',
                terms: user.terms.current.checked,
                picture: base64Picture,
                country: user.country.current.value,
            };
            try {
                await userSchema.validate(testData, { abortEarly: false });
                setErrors({});
                dispatch(addUser(userData));

                resetForm();
                setTimeout(() => navigate('/', { state: { newUser: true } }), 200);
            } catch (validationErrors) {
                if (validationErrors instanceof ValidationError) {
                    const errorMessages: { [key: string]: string } = {};
                    validationErrors.inner.forEach((error) => {
                        if (error.path) {
                            errorMessages[error.path] = error.message;
                        }
                    });
                    setErrors(errorMessages);
                }
            }
        }
    };
    return (
        <>
            <Navigation />
            <div className="form-container">
                <h2>Uncontrolled Form Page</h2>
                <h3>Personal Information</h3>
                <span>Fields marked with * are required.</span>
                <form>
                    <div>
                        <label htmlFor="name">Name*:</label>
                        <input type="text" id="name" ref={user.name} required />
                        <span className="error-message">{errors.name}</span>
                    </div>
                    <div>
                        <label htmlFor="age">Age*:</label>
                        <input type="number" id="age" ref={user.age} required />
                        <span className="error-message">{errors.age}</span>
                    </div>
                    <div>
                        <label htmlFor="email">Email*:</label>
                        <input type="email" id="email" ref={user.email} required />
                        <span className="error-message">{errors.email}</span>
                    </div>
                    <div>
                        <label htmlFor="password">Password*:</label>
                        <input
                            type="password"
                            id="password"
                            ref={user.password}
                            required
                        />
                        <span className="error-message">{errors.password}</span>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password*:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            ref={user.confirmPassword}
                            required
                        />
                        <span className="error-message">
                            {errors.confirmPassword}
                        </span>
                    </div>
                    <div>
                        <label htmlFor="gender">Gender*:</label>
                        <select id="gender" ref={user.gender}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="diverse">Diverse</option>
                        </select>
                        <span className="error-message">{errors.gender}</span>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" ref={user.terms} required />{' '}
                            Accept Terms and Conditions *
                        </label>
                        <span className="error-message">{errors.terms}</span>
                    </div>
                    <div>
                        <label htmlFor="picture">Upload Picture:</label>
                        <input type="file" id="picture" ref={user.picture} />
                        <span className="error-message">{errors.picture}</span>
                    </div>
                    <div>
                        <label htmlFor="country">Country*:</label>
                        <input
                            type="text"
                            id="country"
                            ref={user.country}
                            list="countries"
                            required
                        />
                        <datalist id="countries">
                            {countries.map((country) => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </datalist>
                        <span className="error-message">{errors.country}</span>
                    </div>
                    <button type="button" onClick={createUserProfile}>
                        Create Profile
                    </button>
                </form>
            </div>
        </>
    );
}
