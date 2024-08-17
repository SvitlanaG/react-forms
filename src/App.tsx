import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.scss';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import ReactHookFormPage from './pages/ReactHookFormPage';
import UncontrolledFormPage from './pages/UncontrolledFormPage';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomePage />,
            errorElement: <ErrorPage />,
        },
        {
            path: '/uncontrolled-form',
            element: <UncontrolledFormPage />,
            errorElement: <ErrorPage />,
        },
        {
            path: '/react-hook-form',
            element: <ReactHookFormPage />,
            errorElement: <ErrorPage />,
        },
    ]);
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
