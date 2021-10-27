import React from 'react';
import { AppBar, Avatar, Button, Typography, Toolbar } from '@material-ui/core';
import useStyles from './styles';
//Importing Logo
import furnitureExchange from '../../images/furnitureExchange.png';
//Make our app multi-page using react-router-dom
import { Link } from 'react-router-dom';

const Navbar = () => {
    const classes = useStyles();
    //Mock user, can be later filled.
    const user = null;
    return (
        <AppBar className={classes.appBar} position = "static" color="inherit">
            <div className={classes.brandContainer}> 

                <Typography className ={classes.heading} variant="h2" align="center" height="40" component={Link} to="/">
                    Furniture Exchange
                </Typography>
                <img className ={classes.img} src={furnitureExchange} alt="furnitureExchange" height="60"/>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}> 
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)} </Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary">
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

//component={Link} to="/" -> is where app is crashing right now, remove it to view UI. Stopped at 15minutes.
export default Navbar;
