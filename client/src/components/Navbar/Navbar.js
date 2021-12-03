import React, {useState, useEffect} from 'react';
import { AppBar, Avatar, Button, Typography, Toolbar } from '@material-ui/core';
import useStyles from './styles';
//Importing Logo
import furnitureExchange from '../../images/furnitureExchange.png';
//Make our app multi-page using react-router-dom
import { Link, useHistory, useLocation } from 'react-router-dom';
import {useDispatch} from 'react-redux';

import decode from "jwt-decode";

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    //How to access data from the local storage using json.parse.
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    
    const logout = () => {
        dispatch({type: 'LOGOUT'});
        
        history.push('/auth');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;
        //jwt with manual signup

        //handles token expiry. Check if token exists, if so, then decode it.
        if(token){
            const decodedToken = decode(token);
            
            //ms time
            if(decodedToken.exp * 1000 < new Date().getTime()){
                logout();
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
    
    return (
        <AppBar className={classes.appBar} position = "static" color="inherit">
            <div className={classes.brandContainer}> 

                <Typography  className ={classes.heading} variant="h4" align="center" height="40" component={Link} to="/">
                    Furniture Exchange
                </Typography>
               
            </div>
            <Toolbar className={classes.toolbar}>
                {user?.result ? (
                    <div className={classes.profile}> 
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)} </Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>
                            Logout
                        </Button>
                    </div>
                ): (
                    <Button component={Link} to="/auth" color="primary" variant="contained"> 
                        Sign In
                    </Button>
                )}
            </Toolbar>

        </AppBar>
    );
};

export default Navbar;
