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
    pluralizeWord(word) {
        if(!word)
            return '';
        let noPluralize = ["peanut butter", "soda", "pizza", "chips", "butter", "pasta", "salmon"];
        if(!noPluralize.includes(word.toLowerCase()))
            return word + "s";
        return word;
    }

    render() {
        return (
            <div className="FoodItem">
                <img src={`/img/${this.props.itemName.toLowerCase()}.png`} className="FoodItemImg" />
                <span className="FoodItemName">{this.pluralizeWord(this.props.itemName)}</span>
                <span className="FoodItemName">{this.props.itemName}</span>
                <span className="FoodItemDesc">x{this.props.quantity}</span>
            </div>
        );
    }
}