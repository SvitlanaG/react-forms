import { Link } from 'react-router-dom';
import './Navigation.scss';

export default function Navigation() {
    return (
        <>
            <div className="nav">
                <h1>React forms</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to={`/`}>Home</Link>
                        </li>
                        <li>
                            <Link to={`/uncontrolled-form`}>Uncontrolled Form</Link>
                        </li>
                        <li>
                            <Link to={`/react-hook-form`}>React Hook Form</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}
