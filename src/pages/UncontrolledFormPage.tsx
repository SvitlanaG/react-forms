import { RefObject, useRef, useState } from 'react';
import { ValidationError } from 'yup';
import Navigation from '../components/Navigation';
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

    const createProfile = async () => {
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
            const userData = {
                name: user.name.current.value,
                age: user.age.current.value,
                email: user.email.current.value,
                password: user.password.current.value,
                confirmPassword: user.confirmPassword.current.value,
                gender: user.gender.current.value,
                terms: user.terms.current.checked,
                picture: user.picture.current.files?.[0],
                country: user.country.current.value,
            };
            try {
                await userSchema.validate(userData, { abortEarly: false });
                setErrors({});
                alert(`
                    Name: ${userData.name}
                    Age: ${userData.age}
                    Email: ${userData.email}
                    Password: ${userData.password}
                    Confirm Password: ${userData.confirmPassword}
                    Gender: ${userData.gender}
                    Terms Accepted: ${userData.terms ? 'Yes' : 'No'}
                    Picture Uploaded: ${userData.picture}
                    Country: ${userData.country}
                `);
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
            <div>
                <h1>Uncontrolled Form Page</h1>
                <h2>Personal Information</h2>
                <span>Fields marked with * are required.</span>
                <form>
                    <div>
                        <label htmlFor="name">Name*:</label>
                        <input type="text" id="name" ref={user.name} required />
                        {errors.name && <span>{errors.name}</span>}
                    </div>
                    <div>
                        <label htmlFor="age">Age*:</label>
                        <input type="number" id="age" ref={user.age} required />
                        {errors.age && <span>{errors.age}</span>}
                    </div>
                    <div>
                        <label htmlFor="email">Email*:</label>
                        <input type="email" id="email" ref={user.email} required />
                        {errors.email && <span>{errors.email}</span>}
                    </div>
                    <div>
                        <label htmlFor="password">Password*:</label>
                        <input
                            type="password"
                            id="password"
                            ref={user.password}
                            required
                        />
                        {errors.password && <span>{errors.password}</span>}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password*:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            ref={user.confirmPassword}
                            required
                        />
                        {errors.confirmPassword && (
                            <span>{errors.confirmPassword}</span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="gender">Gender*:</label>
                        <select id="gender" ref={user.gender}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="diverse">Diverse</option>
                        </select>
                        {errors.gender && <span>{errors.gender}</span>}
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" ref={user.terms} required />{' '}
                            Accept Terms and Conditions *
                        </label>
                        {errors.terms && <span>{errors.terms}</span>}
                    </div>
                    <div>
                        <label htmlFor="picture">Upload Picture:</label>
                        <input type="file" id="picture" ref={user.picture} />
                        {errors.picture && <span>{errors.picture}</span>}
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
                            <option value="Ukraine" />
                            <option value="Germany" />
                            <option value="United Kingdom" />
                            <option value="Australia" />
                        </datalist>
                        {errors.country && <span>{errors.country}</span>}
                    </div>
                    <button type="button" onClick={createProfile}>
                        Create Profile
                    </button>
                </form>
            </div>
        </>
    );
}
