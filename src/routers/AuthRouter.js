import React from 'react'
import {Switch, Route, Redirect } from'react-router-dom'
import { LoginScreen } from '../componentes/auth/LoginScreen'
import { RegisterSreen } from '../componentes/auth/RegisterSreen'

export const AuthRouter = () => {
    return (
            <div className="auth__main">
                <div className="auth__box-container">
                     <Switch>
                        <Route path="/auth/login" component={LoginScreen}/>
                        <Route path="/auth/register" component={RegisterSreen}/>

                        <Redirect to="/auth/login"/>


                     </Switch>

                    
                </div>
           
            </div>
            
    )
}
