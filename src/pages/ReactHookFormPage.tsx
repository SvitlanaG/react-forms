import { yupResolver } from '@hookform/resolvers/yup';
import { Resolver, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { FormData } from '../interfaces/FormData';
import { countries } from '../utils/constants/countries';
import { userSchema } from '../utils/validations/UserValidationControlled';

export default function ReactHookFormPage() {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<FormData>({
        mode: 'onChange',
        resolver: yupResolver(userSchema) as Resolver<FormData>,
    });

    const navigate = useNavigate();

    const createProfile = (data: FormData) => {
        alert(JSON.stringify(data, null, 2));
        reset();
        setTimeout(() => navigate('/'), 200);
    };

    return (
        <>
            <Navigation />
            <div className="form-container">
                <h2>React Hook Form Page</h2>
                <h3>Personal Information</h3>
                <span>Fields marked with * are required.</span>
                <form onSubmit={handleSubmit(createProfile)}>
                    <div>
                        <label htmlFor="name">Name*:</label>
                        <input
                            type="text"
                            id="name"
                            {...register('name', {
                                required: true,
                            })}
                        />
                        {errors.name && <span>{errors.name.message}</span>}
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
                        {errors.age && <span>{errors.age.message}</span>}
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
                        {errors.email && <span>{errors.email.message}</span>}
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
                        {errors.password && <span>{errors.password.message}</span>}
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
                        {errors.confirmPassword && (
                            <span>{errors.confirmPassword.message}</span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="gender">Gender*:</label>
                        <select id="gender" {...register('gender')}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="diverse">Diverse</option>
                        </select>
                        {errors.gender && <span>{errors.gender.message}</span>}
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
                        {errors.terms && <span>{errors.terms.message}</span>}
                    </div>

                    <div>
                        <label htmlFor="picture">Upload Picture:</label>
                        <input type="file" id="picture" {...register('picture')} />
                        {errors.picture && <span>{errors.picture.message}</span>}
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
                        {errors.country && <span>{errors.country.message}</span>}
                    </div>
                    <button type="button" onClick={handleSubmit(createProfile)}>
                        Create Profile
                    </button>
                </form>
            </div>
        </>
    );
}
