import { useState, useEffect } from 'react';
import StudySetService from '../StudySetService';
import { useNavigate } from 'react-router-dom';

const AddStudySetComponent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newStudySet = {title, description};

        StudySetService.createStudySet(newStudySet).then(() => {
            navigate('/');
        });
    };

    useEffect(() => {
        document.title= 'Add Study Set';
    }, []);

    return (
        <div>
            <h2 className="text-center">Add Study Set</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                </div>

                <div className="form-group">
                    <label>Description:</label>
                    <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required/>
                </div>

                <button className="btn btn-primary mt-3">
                    Add Study Set
                </button>
            </form>
        </div>
    );
};

export default AddStudySetComponent;