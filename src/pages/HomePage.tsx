import { useSelector } from 'react-redux';
import Navigation from '../components/Navigation';
import UserProfileCard from '../components/UserProfileCard';
import { RootState } from '../store/store';

export default function HomePage() {
    const users = useSelector((state: RootState) => state.user.users);
    return (
        <>
            <Navigation />
            <div>
                <h2>Home Page</h2>
            </div>
            {users.map((user, index) => (
                <UserProfileCard key={index} {...user} />
            ))}
        </>
    );
}
