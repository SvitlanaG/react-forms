export interface FormData {
    name: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
    gender: 'male' | 'female' | 'diverse';
    terms: boolean;
    picture: FileList;
    country: string;
}
