import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component: Component, loggedIn, ...props }) {

  return (  
    <Route>
      {() => 
        localStorage.getItem('token') ? ( 
          <Component {...props} />
        ) : (
          <Redirect to='/signin' />
        )
      }
    </Route>
  );
}

export default ProtectedRoute;