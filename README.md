# react-forms
This project involves building a React application that demonstrates the use of routing, form handling with both uncontrolled components and React Hook Form, and state management with Redux.
The application will feature three routes and a centralized state to manage and display data from two forms.

## Routes:

### Main Route:

- Serves as the landing page with links to the two form routes.
- Displays submitted data from both forms using tiles.
- Uses Redux to store and manage form data.
- Newly submitted data is highlighted for better UX.

  
### Uncontrolled Form Route:

- A form built using the uncontrolled components approach.
- Form fields include name, age, email, passwords, gender, terms agreement, file upload, and country selection.
- Validation is applied on form submission using custom validation logic.
- Upon successful submission, data is stored in Redux and the user is redirected to the Main Route.

  
### React Hook Form Route:

- A similar form but built using the React Hook Form library.
- Implements live validation using Yup for field validation as users interact with the form.
- Prevents form submission until all validation errors are resolved.
- Upon successful submission, data is stored in Redux and the user is redirected to the Main Route.
