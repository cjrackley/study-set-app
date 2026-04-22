import { useState, useEffect } from 'react';
import StudySetService from '../StudySetService';
import { Link } from 'react-router-dom';

const StudySetListComponent = () => {
    const [studySets, setStudySets] = useState([]);

    useEffect(() => {
        document.title = 'Study Sets List';

        StudySetService.getStudySets().then((res) => {
            setStudySets(res.data);
        });
    }, []);

    return (
        <div>
            <h2 className="text-center">Study Sets</h2>

            <Link to="/add-study-set" className="btn btn-primary">
                Add Study Set
            </Link>

            <div className="row mt-3">
                {studySets.map(set => (
                    <div key={set.id} className="card p-3 m-2">
                        <h3>{set.title}</h3>
                        <p>{set.description}</p>

                        <Link to={`/study-sets/${set.title}`} className="btn btn-outline-primary">
                            View
                        </Link>

                        <button className="btn btn-delete mt-2" onClick={() => StudySetService.deleteStudySet(set.title).then(() =>
                         setStudySets(prev => prev.filter(s => s.title !== set.title)))}>
                            Delete
                         </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudySetListComponent;