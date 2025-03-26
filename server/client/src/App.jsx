import './App.css'
import Header from './components/header'
import Body from './components/Body'
import { Routes , Route } from 'react-router-dom'



function App() {
  

  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<Body />} /> 
        <Route path="/home" element={<Body />}/>
        <Route path='/profile' element={<h1 style={{fontSize:"30px", color:"white"}}>my profile</h1>}/>
        <Route path='/myposts' element={<h1 style={{fontSize:"30px", color:"white"}}>my posts</h1>}/>
      </Routes>
    </>
  )
}

export default App

