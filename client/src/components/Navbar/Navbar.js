import React from 'react';
import { AppBar, Typography } from '@material-ui/core';
import useStyles from './styles';
//Importing Logo
import furnitureExchange from '../../images/furnitureExchange.png';
import { Link } from 'react-router-dom';
//component={Link} to="/" -> is where app is crashing right now, remove it to view UI.
const Navbar = () => {
    const classes = useStyles();
    return (
        <AppBar className={classes.appBar} position = "static" color="inherit">
            <div className={classes.brandContainer}> 

                <Typography className ={classes.heading} variant="h2" align="center" height="40" component={Link} to="/">
                    Furniture Exchange
                </Typography>
                <img className ={classes.img} src={furnitureExchange} alt="furnitureExchange" height="60"/>
            </div>
        </AppBar>
    );
};

export default Navbar;
