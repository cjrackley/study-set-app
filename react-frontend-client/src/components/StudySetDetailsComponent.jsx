import { useState, useEffect } from 'react';
import StudySetService from '../StudySetService';
import NoteService from '../NoteService';
import { useParams, Link } from 'react-router-dom';

const StudySetDetailsComponent = () => {
    const { title } = useParams();
    const [studySet, setStudySet] = useState(null);
    const [notes, setNotes] = useState([]);
    const [term, setTerm] = useState("");
    const [definition, setDefinition] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        document.title = 'Study Set Details';

        StudySetService.getStudySetByTitle(title).then((res) => {
            const set = res.data;
            setStudySet(set);

            if (set?.id) {
                NoteService.getNotesBySet(set.id).then((res) => {
                    setNotes(res.data);
                });
            }
            });


    }, [title]);

    const handleAddNote = (e) => {
        e.preventDefault();

        const setId = studySet?.id;

        if (!setId) {
            console.error("Missing study set id:", studySet);
            return;
        }

        const newNote = {
            set_id: setId,
            term,
            definition,
            image_url: imageUrl || null
        };

        NoteService.createNote(newNote).then((res) => {
            setNotes([...notes, res.data]);

            setTerm("");
            setDefinition("");
            setImageUrl("");
        });
    };

    return (
        <div>
            <h2 className="text-center">Study Set Details</h2>

            <Link to="/" className="btn btn-outline-primary">
                Back to Study Sets
            </Link>

            <div className="card mt-3 p-3">
                <h3>{studySet?.title}</h3>
                <p>{studySet?.description}</p>
            </div>
            <h4 className="mt-4">Add Note</h4>

            <form onSubmit={handleAddNote} className="card p-3 mt-2">
                <input
                    className="form-control mb-2"
                    placeholder="Term"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    required />

                <textarea
                    className="form-control mb-2"
                    placeholder="Definition"
                    value={definition}
                    onChange={(e) => setDefinition(e.target.value)}
                    required />

                <input
                    className="form-control mb-2"
                    placeholder="Image URL (optional)"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)} />

                <button className="btn btn-primary" type="submit">
                    Add Note
                </button>
            </form>

            <h4 className="mt-4">Notes</h4>

            {notes.map(note => (
                <div key={note.id} className="card mt-2 p-2">
                    <h5>{note.term}</h5>
                    <p>{note.definition}</p>
                    {note.image_url && (
                        <img src={note.image_url} alt="" style={{ maxWidth: '200px' }} />
                    )}
                </div>
            ))}
        </div>
    );
};

export default StudySetDetailsComponent;