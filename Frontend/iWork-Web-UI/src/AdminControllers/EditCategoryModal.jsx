import React from 'react';

const EditCategoryModal = ({ editData, handleInputChange, handleSubmit, setIsEditing }) => {
    return (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Category</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setIsEditing(false)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Title:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={editData.title}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Description:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="description"
                                    value={editData.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mr-2">Save</button>
                            <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCategoryModal;