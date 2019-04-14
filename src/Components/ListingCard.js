import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './ListingCard.css';

const styles = {
    button: {
        margin: 5,
        flex: 1,
    },
    card: {
        width: 250,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        marginBottom: 15,
        paddingTop: 0,
        paddingBottom: 0,
        flex: 1,
    },
};

class ListingCard extends React.Component {

    state = {
        qty: null,
        dlvDate: null  // Delivery Date
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.qty);
        event.preventDefault();
    };

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
                <CardActionArea>
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
                </CardActionArea>
                <CardActions>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            id="standard-number"
                            label="Quantity"
                            value={this.state.qty}
                            onChange={this.handleChange('qty')}
                            type="number"
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-number"
                            value={this.state.dlvDate}
                            onChange={this.handleChange('dlvDate')}
                            type="date"
                            className={classes.textField}
                            margin="normal"
                        />
                        <Button variant="contained" color="primary" className={classes.button} type="submit">
                            Buy
                        </Button>
                    </form>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(ListingCard);