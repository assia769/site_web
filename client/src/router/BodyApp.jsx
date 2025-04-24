// router/BodyApp.jsx
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import { MainUserContext } from '../components/context/MainUserContext';

const mainUser = {
  id: "1",
  name: "AYMEN IGRI",
  age: "23 years"  
};

function BodyApp() {
  return (
    <MainUserContext.Provider value={mainUser}>
      <Header />
      <Outlet />
    </MainUserContext.Provider>
  );
}

export default BodyApp;