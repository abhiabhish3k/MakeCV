import { useState } from 'react'
import Header from './components/Headers/Header'
import Footer from './components/Footers/Footer'
import Form from './components/Form'
import Preview from './components/Preview'
import './App.css'

const emptyCvData = {
  name: '',
  email: '',
  phone: '',
  jobTitle: '',
  location: '',
  portfolioURL: '',
  LinkedinURL: '',
  professionalSummary: '',
}

const makeEmptyExperience = () => ({
  id: crypto.randomUUID(),
  jobTitle: '',
  orgname: '',
  startDate: '',
  endDate: '',
  isCurrent: false,
  description: '',
})

const makeEmptyEducation = () => ({
  id: crypto.randomUUID(),
  degree: '',
  institution: '',
  startDate: '',
  endDate: '',
  isCurrent: false,
  description: '',
})

const makeEmptyProject = () => ({
  id: crypto.randomUUID(),
  projectName: '',
  projectURL: '',
  startDate: '',
  endDate: '',
  isCurrent: false,
  description: '',
})

function App() {
  // CV data lives here so both Form (left) and Preview (right) share it.
  // Previously this state only existed inside Form, so Preview never saw updates.
  const [cvData, setCvData] = useState(emptyCvData)
  const [experienceList, setExperienceList] = useState([makeEmptyExperience()])
  const [educationList, setEducationList] = useState([makeEmptyEducation()])
  const [projectsList, setProjectsList] = useState([makeEmptyProject()])
  const [skills, setSkills] = useState([])
  const [languages, setLanguages] = useState([])

  const [zoom, setZoom] = useState(100)
  const [selectedTemplate, setSelectedTemplate] = useState('modernTemplate')

  const handleZoomIn = () => setZoom((z) => Math.min(150, z + 10))
  const handleZoomOut = () => setZoom((z) => Math.max(50, z - 10))
  const handleZoomReset = () => setZoom(100)

  return (
    <>
      <Header
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onZoomReset={handleZoomReset}
        selectedTemplate={selectedTemplate}
        onSelectTemplate={setSelectedTemplate}
      />
      <main className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        <div className="h-full w-full overflow-y-auto border-r border-slate-200 bg-white lg:w-1/2">
          <Form
            cvData={cvData}
            setCvData={setCvData}
            experienceList={experienceList}
            setExperienceList={setExperienceList}
            educationList={educationList}
            setEducationList={setEducationList}
            projectsList={projectsList}
            setProjectsList={setProjectsList}
            skills={skills}
            setSkills={setSkills}
            languages={languages}
            setLanguages={setLanguages}
          />
        </div>

        <div className="h-full w-full overflow-y-auto bg-slate-100 lg:w-1/2">
          <Preview
            selectedTemplate={selectedTemplate}
            zoom={zoom}
            cvData={cvData}
            experienceList={experienceList}
            educationList={educationList}
            projectsList={projectsList}
            skills={skills}
            languages={languages}
          />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
