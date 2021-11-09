import React, { useEffect, useState } from 'react'
import { AuthRouter } from './AuthRouter'
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";import {JournalScreen} from '../componentes/journal/JournalScreen';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';
import { startLoadingNotes } from '../actions/notes';




export const AppRouter = () => {
    const dispatch = useDispatch();
    const [cheking, setcheking] = useState(true);
    const [isLoggedIn, setisLoggedIn] = useState(false);



    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged (auth, async (user) => {
                if (user?.uid) {
                    dispatch(login(user.uid, user.displayName)); 
                    setisLoggedIn(true);
                    dispatch(startLoadingNotes(user.uid))
                } 
                else {setisLoggedIn(false);}
                 setcheking(false);

        });

    }, [dispatch, setcheking,setisLoggedIn])

        if(cheking){
            return(
                <h1>Espere...</h1>
            )
        }


    return (
     <Router>

        <div>
            <Switch>
                <PublicRouter isAuthenticated={isLoggedIn} path="/auth" component={AuthRouter}/>
                <PrivateRouter isAuthenticated={isLoggedIn} exact  path="/" component={JournalScreen}/>

                 <Redirect to="/auth/login"/>


            </Switch>
            
        </div>
    </Router>

    )
}
