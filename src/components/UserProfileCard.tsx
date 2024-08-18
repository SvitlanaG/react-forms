import { UserProfile } from '../store/user/userSlice';
import './UserProfileCard.scss';

interface UserProfileCardProps extends UserProfile {
    isHighlighted?: boolean;
}

export default function UserProfileCard({
    name,
    age,
    email,
    password,
    gender,
    terms,
    picture,
    country,
    isHighlighted,
}: UserProfileCardProps) {
    return (
        <div className={`user-profile-card ${isHighlighted ? 'user-profile-card-highlight' : ''}`}>
            <div>
                <h3>User Profile</h3>
                <p>
                    <strong>Name:</strong> {name}
                </p>
                <p>
                    <strong>Age:</strong> {age}
                </p>
                <p>
                    <strong>Email:</strong> {email}
                </p>
                <p>
                    <strong>Password:</strong> {password}
                </p>
                <p>
                    <strong>Gender:</strong> {gender}
                </p>
                <p>
                    <strong>Terms Accepted:</strong> {terms ? 'Yes' : 'No'}
                </p>
                <p>
                    <strong>Country:</strong> {country}
                </p>
            </div>
            <div>
                {picture ? (
                    <div>
                        <p>
                            <strong>Picture:</strong>
                        </p>
                        <img
                            src={picture}
                            alt="Uploaded"
                            className="user-profile-picture"
                        />
                    </div>
                ) : (
                    <p>
                        <strong>Picture:</strong> No picture uploaded
                    </p>
                )}
            </div>
        </div>
    );
}
