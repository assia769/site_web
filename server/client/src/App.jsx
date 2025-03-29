import './App.css'
import Header from './components/Header'
import Body from './components/Body'
import { Routes , Route } from 'react-router-dom'
import { MainUserContext } from './components/context/MainUserContext'
import Profile from './components/Profile'
import SavedPosts from './components/SavedPosts'

const mainUser = {
  id:"1",
  name:"AYMEN IGRI",
  age:"23 years"  
}

function App() {
  

  return (
    <>
      <MainUserContext.Provider value={mainUser}>
        <Header />
      </MainUserContext.Provider>
      <Routes>
        <Route path='/' element={<MainUserContext.Provider value={mainUser}><Body /></MainUserContext.Provider>} /> 
        <Route path="/home" element={<MainUserContext.Provider value={mainUser}><Body /></MainUserContext.Provider>}/>
        <Route path='/profile' element={<MainUserContext.Provider value={mainUser}><Profile /></MainUserContext.Provider>}/>
        <Route path='/myposts' element={<MainUserContext.Provider value={mainUser}><SavedPosts /></MainUserContext.Provider>}/>
      </Routes>
    </>
  )
}

export default App

