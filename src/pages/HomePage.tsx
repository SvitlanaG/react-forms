import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import UserProfileCard from '../components/UserProfileCard';
import { RootState } from '../store/store';

export default function HomePage() {
    const location = useLocation();
    const users = useSelector((state: RootState) => state.user.users);
    const [highlightIndex, setHighlightIndex] = useState<number | null>(null);

    useEffect(() => {
        if (location.state?.newUser && users.length > 0) {
            setHighlightIndex(users.length - 1);
            const timer = setTimeout(() => {
                setHighlightIndex(null);
            }, 4 * 1000);

            return () => clearTimeout(timer);
        }
    }, [location.state, users]);

    return (
        <>
            <Navigation />
            <div>
                <h2>Home Page</h2>
            </div>
            {users.map((user, index) => (
                <UserProfileCard
                    key={index}
                    {...user}
                    isHighlighted={index === highlightIndex}
                />
            ))}
        </>
    );
}
