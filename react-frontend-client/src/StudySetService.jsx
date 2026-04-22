import axios from 'axios';

const STUDYSETS_API_BASE_URL = import.meta.env.VITE_API_URL;

class StudySetService {
    
    getStudySets() {
        return axios.get(STUDYSETS_API_BASE_URL + "/study-sets");
    }

    createStudySet(studySet) {
        return axios.post(`${STUDYSETS_API_BASE_URL}/study-sets`, studySet);
    }

    getStudySetByTitle(title){
        return axios.get(`${STUDYSETS_API_BASE_URL}/study-sets/${title}`);
    }

}

export default new StudySetService();