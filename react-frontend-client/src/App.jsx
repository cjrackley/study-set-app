import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import AddStudySetComponent from './components/AddStudySetComponent';
import StudySetDetailsComponent from './components/StudySetDetailsComponent';
import StudySetListComponent from './components/StudySetListComponent';



function App() {

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<StudySetListComponent/>} />
          <Route path="study-sets/:title" element={<StudySetDetailsComponent/>} />
          <Route path="/add-study-set" element={<AddStudySetComponent/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
