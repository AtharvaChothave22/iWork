import React, { useState } from 'react';
import ViewAllCategory from './ViewAllCategory';
import ViewAllUser from './ViewAllUser';
import AddCategoryParent from './AddCategoryParent';


const AdminLandingPage = () => {

    const [showAllUsers, setShowAllUsers] = useState(false);
    const [showAllCategory, setShowAllCategory] = useState(false);
    const [showAddCategory, setShowAddCategory] = useState(false);

    const handleViewAllCategory = () => {
        setShowAllCategory(true);
        setShowAllUsers(false);
        setShowAddCategory(false);
    };

    const handleViewUsers = () => {
        setShowAllUsers(true);
        setShowAllCategory(false);
        setShowAddCategory(false);
    };

    const handleViewAddCategory = () => {
        setShowAddCategory(true);
        setShowAllUsers(false);
        setShowAllCategory(false);
    };

    return (
        <div className="container mt-4">
            <h2><u>Welcome Admin</u></h2>

            <div className="btn-group-vertical">
                <button className="btn btn-primary mb-2" onClick={handleViewUsers}>View Users</button>
                <button className="btn btn-primary mb-2" onClick={handleViewAllCategory}>View All Category</button>
                <button className="btn btn-success mb-2" onClick={handleViewAddCategory}>Add Category</button>
            </div>
            {showAllUsers && <ViewAllUser />}
            {showAllCategory && <ViewAllCategory />}
            {showAddCategory && <AddCategoryParent />}
        </div>
    );
};

export default AdminLandingPage;