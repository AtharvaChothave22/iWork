import React, { useState } from 'react';
import AddCategoryForm from './AddCategoryForm';
import ViewAllCategory from './ViewAllCategory';

const AddCategoryParent = () => {
  const [showForm, setShowForm] = useState(true);

  const handleSubmit = (formData) => {

    setShowForm(false);
  };

  return (
    <div>
      {showForm ? (
        <AddCategoryForm onSubmit={handleSubmit} />
      ) : (
        <ViewAllCategory />
      )}
    </div>
  );
};

export default AddCategoryParent;