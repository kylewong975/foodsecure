import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/GroupAdd';
import './FoodItem.css';

export default class FoodItem extends React.Component {
    render() {
        return (
            <div className="FoodItem">
                <img src="/img/apple.png" className="FoodItemImg" />
                <span className="FoodItemName">Apple</span>
                <span className="FoodItemDesc">x11</span>
            </div>
        );
    }
}