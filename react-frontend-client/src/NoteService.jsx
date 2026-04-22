import axios from 'axios';

const BASE = import.meta.env.VITE_API_URL;

class NoteService {
    
    getNotes() {
        return axios.get(`${BASE}/notes`);
    }

    createNote(note) {
        return axios.post(`${BASE}/notes`, note);
    }

    getNotesBySet(setId){
        return axios.get(`${BASE}/notes/set/${setId}`);
    }
}

export default new NoteService();