import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EmailVerified = () => {
    const { id, token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/auth/${id}/verify/${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.Message) {
                console.log(data.Message);
                // Redirect to the signin route upon successful verification
                navigate('/auth/signin');
            } else {
                console.error("Verification failed:", data.Error);
            }
        })
        .catch(error => {
            console.error("Verification error:", error);
        });
    }, [id, token, navigate]);

    return (
        <div>
            {/* You can display a loading spinner or a message during the verification process */}
            <p>Verifying...</p>
        </div>
    );
};

export default EmailVerified;
