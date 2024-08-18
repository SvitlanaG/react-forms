import { yupResolver } from '@hookform/resolvers/yup';
import { Resolver, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { FormData } from '../interfaces/FormData';
import { addUser } from '../store/user/userSlice';
import { countries } from '../utils/constants/countries';
import { fileToBase64 } from '../utils/formUtils';
import { userSchema } from '../utils/validations/UserValidationControlled';

export default function ReactHookFormPage() {
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
    } = useForm<FormData>({
        mode: 'onChange',
        resolver: yupResolver(userSchema) as Resolver<FormData>,
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const createUserProfile = async (data: FormData) => {
        const pictureFile = data.picture?.[0];
        let base64Picture: string | undefined = undefined;

        if (pictureFile) {
            base64Picture = await fileToBase64(pictureFile);
        }
        const userData = {
            ...data,
            name: data.name,
            age: data.age,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
            gender: data.gender,
            terms: data.terms,
            picture: base64Picture,
            country: data.country,
        };
        dispatch(addUser(userData));
        reset();
        setTimeout(() => navigate('/', { state: { newUser: true } }), 200);
    };

    return (
        <>
            <Navigation />
            <div className="form-container">
                <h2>React Hook Form Page</h2>
                <h3>Personal Information</h3>
                <span>Fields marked with * are required.</span>
                <form onSubmit={handleSubmit(createUserProfile)}>
                    <div>
                        <label htmlFor="name">Name*:</label>
                        <input
                            type="text"
                            id="name"
                            {...register('name', {
                                required: true,
                            })}
                        />
                        <span className="error-message">
                            {errors.name && errors.name.message}
                        </span>
                    </div>

                    <div>
                        <label htmlFor="age">Age*:</label>
                        <input
                            type="number"
                            id="age"
                            {...register('age', {
                                required: true,
                            })}
                        />
                        <span className="error-message">
                            {errors.age && errors.age.message}
                        </span>
                    </div>

                    <div>
                        <label htmlFor="email">Email*:</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', {
                                required: true,
                            })}
                        />
                        <span className="error-message">
                            {errors.email && errors.email.message}
                        </span>
                    </div>

                    <div>
                        <label htmlFor="password">Password*:</label>
                        <input
                            type="password"
                            id="password"
                            {...register('password', {
                                required: true,
                            })}
                        />
                        <span className="error-message">
                            {errors.password && errors.password.message}
                        </span>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword">Confirm Password*:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            {...register('confirmPassword', {
                                required: true,
                            })}
                        />
                        <span className="error-message">
                            {errors.confirmPassword &&
                                errors.confirmPassword.message}
                        </span>
                    </div>

                    <div>
                        <label htmlFor="gender">Gender*:</label>
                        <select id="gender" {...register('gender')}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="diverse">Diverse</option>
                        </select>
                        <span className="error-message">
                            {errors.gender && errors.gender.message}
                        </span>
                    </div>

                    <div>
                        <label>
                            <input
                                type="checkbox"
                                {...register('terms', {
                                    required: true,
                                })}
                            />{' '}
                            Accept Terms and Conditions *
                        </label>
                        <span className="error-message">
                            {errors.terms && errors.terms.message}
                        </span>
                    </div>

                    <div>
                        <label htmlFor="picture">Upload Picture:</label>
                        <input type="file" id="picture" {...register('picture')} />
                        <span className="error-message">
                            {errors.picture && errors.picture.message}
                        </span>
                    </div>

                    <div>
                        <label htmlFor="country">Country*:</label>
                        <input
                            type="text"
                            id="country"
                            list="countries"
                            {...register('country', {
                                required: true,
                            })}
                        />
                        <datalist id="countries">
                            {countries.map((country) => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </datalist>
                        <span className="error-message">
                            {errors.country && errors.country.message}
                        </span>
                    </div>
                    <button type="submit" disabled={!isValid}>
                        Create Profile
                    </button>
                </form>
            </div>
        </>
    );
}
