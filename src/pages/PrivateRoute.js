import React, {useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';
// will remove later
import {useUserContext} from '../context/user_context';

const PrivateRoute = ({children, ...rest}) => {
	//console.log("children", children);
	//console.log(rest);

	// this is one way of doing that.
	//const myUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
	const {myUser, isLoading} = useUserContext();

	if (isLoading) {
		return <></>
	}

	return (
		<Route {...rest} render={() => {
			return myUser ? children : <Redirect to="/"></Redirect>
		}}>
		</Route>
	)
};
export default PrivateRoute;
