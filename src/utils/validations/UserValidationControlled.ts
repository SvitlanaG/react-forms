import * as yup from 'yup';

const passwordStrength = yup
    .string()
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,12}$/,
        'Password must include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.'
    );

export const userSchema = yup.object().shape({
    name: yup
        .string()
        .matches(
            /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/,
            'Name must start with an uppercase letter'
        )
        .required(),
    age: yup
        .number()
        .positive('Age must be a positive number')
        .integer('Age must be an integer')
        .required(),
    email: yup.string().email('Must be a valid email').required(),
    password: passwordStrength.required(),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required(),
    gender: yup
        .string()
        .oneOf(['male', 'female', 'diverse'], 'Select a valid gender')
        .required(),
    terms: yup
        .boolean()
        .oneOf([true], 'You must accept the terms and conditions')
        .required(),
    picture: yup
        .mixed<FileList>()
        .test('fileSize', 'File size too large', (value) => {
            if (!value || value.length === 0) return true;
            return value[0].size <= 4 * 1024 * 1024;
        })
        .test('fileType', 'Unsupported file format', (value) => {
            if (!value || value.length === 0) return true;
            return ['image/jpeg', 'image/png'].includes(value[0].type);
        }),
    country: yup.string().required(),
});
