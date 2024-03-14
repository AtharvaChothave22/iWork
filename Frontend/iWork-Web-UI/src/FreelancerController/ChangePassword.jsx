import React, { useState } from 'react';
import { useSelector } from 'react-redux';
const ChangePassword = () => {
     const userId = useSelector(state => state.userId); 
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleChange = () => {
        fetch('http://localhost:9091/freelancing/api/users/change-password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                oldPassword: oldPassword,
                newPassword: newPassword
            })
        })
        .then(response => {
            if (response.ok) {
                window.location.href = '/another-page'; 
            } else {
                console.error('Error changing password');
            }
        })
        .catch(error => {
            console.error('Error changing password:', error);
        });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="oldPassword" className="form-label">Old Password:</label>
                            <input type="password" className="form-control" id="oldPassword" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label">New Password:</label>
                            <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={handleChange}>Change</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
