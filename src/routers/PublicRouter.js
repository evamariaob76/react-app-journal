import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'

export const PublicRouter = ({
    component:Component,
    isAuthenticated,
    ...rest
}) => {
    return (
          <Route {...rest}
        component={(props)=>(
            (!isAuthenticated)
                ?<Component {...props}/>
                : <Redirect to='/'/>
        )}
        
        />


    )
}

PublicRouter.propTypes={
    component: PropTypes.func.isRequired
}