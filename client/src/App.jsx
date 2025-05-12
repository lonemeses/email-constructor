import React from 'react';
import './App.css'
import Header from "./components/Header/Header.jsx";
import SideBar from "./components/SideBar/SideBar.jsx";
import {Route, Routes} from "react-router";
import {useSelector} from "react-redux";
import Constructor from "../pages/Constructor.jsx";
import Auth from "../pages/Auth.jsx";


const App = () => {
    const {isAuth} = useSelector(state => state.user)
    return (
        <div className='app'>
            <Header/>
            {isAuth ?
                <Routes>
                    <Route index path={'/constructor'} element={<Constructor />}/>
                </Routes>
            :
                <Routes>
                    <Route index path={'*'} element={<Auth />}/>
                </Routes>}

            <SideBar/>
        </div>
    );
};

export default App;