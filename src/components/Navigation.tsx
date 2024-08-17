import { NavLink } from 'react-router-dom';
import './Navigation.scss';

export default function Navigation() {
    return (
        <>
            <div className="nav">
                <h1>React forms</h1>
                <nav>
                    <ul>
                        <li>
                            <NavLink
                                to={`/`}
                                className={({ isActive }) =>
                                    isActive ? 'active' : 'inactive'
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/uncontrolled-form`}
                                className={({ isActive }) =>
                                    isActive ? 'active' : 'inactive'
                                }
                            >
                                Uncontrolled Form
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/react-hook-form`}
                                className={({ isActive }) =>
                                    isActive ? 'active' : 'inactive'
                                }
                            >
                                React Hook Form
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}
