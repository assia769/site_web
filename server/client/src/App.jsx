import './App.css'
import Header from './components/Header'
import Body from './components/Body'
import { Routes , Route } from 'react-router-dom'
import { MainUserContext } from './components/context/MainUserContext'

const user = {
  id:"1",
  name:"AYMEN IGRI"
}

function App() {
  

  return (
    <>
      <MainUserContext.Provider value={user}>
        <Header />
      </MainUserContext.Provider>
      <Routes>
        <Route path='/' element={<MainUserContext.Provider value={user}><Body /></MainUserContext.Provider>} /> 
        <Route path="/home" element={<MainUserContext.Provider value={user}><Body /></MainUserContext.Provider>}/>
        <Route path='/profile' element={<h1 style={{fontSize:"30px", color:"white"}}>my profile</h1>}/>
        <Route path='/myposts' element={<h1 style={{fontSize:"30px", color:"white"}}>my posts</h1>}/>
      </Routes>
    </>
  )
}

export default App

