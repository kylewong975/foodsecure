import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import './ListingCard.css';

const styles = {
    card: {
        width: 250,
        height: 275,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        marginBottom: 15,
        paddingTop: 15,
        flex: 1,
    },
};

class ListingCard extends React.Component {
    pluralizeWord(word) {
        if(!word)
            return '';
        let noPluralize = ["peanut butter", "soda", "pizza", "chips", "butter", "pasta", "salmon"];
        if(!noPluralize.includes(word.toLowerCase()))
            return word + "s";
        return word;
    }

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardMedia
                    className="listingCardImg"
                    image={`/img/${this.props.itemName.toLowerCase()}.png`}
                    title="Apple"
                />
                <CardContent>
                    <Typography variant="h6" className="listingCardDesc">
                        {this.pluralizeWord(this.props.itemName)}
                    </Typography>
                    <Typography variant="h6" className="listingCardDesc">
                        ${this.props.price}
                    </Typography>
                </CardContent>
                <LinearProgress className="ProgressBar" value={this.props.percentComplete} valueBuffer={this.props.percentAdditional + this.props.percentComplete} variant="buffer" />
                <CardContent>
                    <Typography variant="h6" className="listingCardDesc">
                        Time left: {this.props.timeLeft}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(ListingCard);