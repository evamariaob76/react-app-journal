import React from 'react'
import { useDispatch } from 'react-redux'
import {  startLogout } from '../../actions/auth'
import { JournalEntries } from './JournalEntries'
import { getAuth } from "firebase/auth";
import { startNewNote } from '../../actions/notes';


export const Sidebar = () => {
    const dispatch = useDispatch();
    const auth = getAuth();

    const {displayName} = auth.currentUser;
    const nombre= displayName.charAt(0).toUpperCase()+displayName.slice(1);
    //otra forma de hacerlo con el useState
    /*const state = useSelector(state=>state.auth);
    console.log(state.name)*/




    const handleLogout=() =>{
        dispatch(startLogout());
    }

    const handleAddNew=()=>{
        dispatch(startNewNote());
    }
    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
            <h3 className="mt-5">
                <i className="far fa-moon"></i>

                <span >  {nombre}</span>
            </h3>
            <button className="btn" onClick={handleLogout}>Logout</button>
            </div>
            <div className="journal__new-entry" onClick={handleAddNew}>

                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">new entry</p>
            </div>

            <JournalEntries/>
        </aside>
    )
}
