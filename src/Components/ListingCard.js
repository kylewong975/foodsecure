import React, { Component } from 'react';
import swal from 'sweetalert';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './ListingCard.css';

const styles = theme => ({
    button: {
        margin: 5,
        flex: 1,
        marginLeft: 85,
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
    formControl: {
        minWidth: 100,
        marginRight: 10,
        marginBottom: 10,
    },
    textField: {
        width: 60,
        marginRight: 20,
        marginTop: -36,
    },
    textField2: {
        marginTop: -20,
        width: 150,
    }
});

class ListingCard extends React.Component {

    state = {
        qty: null,
        dlvDate: null,  // Delivery Date
        frequency: '',
        duration: '',
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.qty);
        event.preventDefault();
    };

    pluralizeWord(word) {
        if (!word)
            return '';
        let noPluralize = ["peanut butter", "soda", "pizza", "chips", "butter", "pasta", "salmon"];
        if (!noPluralize.includes(word.toLowerCase()))
            return word + "s";
        return word;
    }

    getRecipes = () => {
        let food = this.props.itemName.toLowerCase()
        if (food == "apple") {
            return 'Apple Pie\nApple Cider\nCinnamon Toast with Apple';
        }
        else if (food == "banana") {
            return 'Banana Cream Pie\nStrawberry Banana Smoothie';
        }
        else if (food == "broccoli") {
            return 'Broccoli Casserole\nVegetable Platter with Ranch Dressing';
        }
        else if (food == "butter") {
            return 'Cheesecake\nDanish Cookie\nCake'
        }
        else if (food == "carrot") {
            return 'Carrot Lentil Soup\nVegetable Platter with Ranch Dressing';
        }
        else if (food == "chips") {
            return 'Fish and Chips\nTurkey Sandwich with Chips\nHam Sandwich with Chips';
        }
        else if (food == "orange") {
            return 'Orange Smoothie\nTangerine Cake\nOrange Sorbet';
        }
        else if (food == "pasta") {
            return 'Spaghetti and Meatballs\nPesto Pasta\nLasagna';
        }
        else if (food == "peanut butter") {
            return 'Greek Yogurt with Peanut Butter Drizzle\nAcai Bowl with Peanut Butter Drizzle\nPeanut Butter Cookie';
        }
        else if (food == "pizza") {
            return 'Cheese Pizza\nPepperoni Pizza\nCombo Pizza';
        }
        else if (food == "salmon") {
            return 'Seared Salmon\nLox Bagel\nFresh Salmon';
        }
        else if (food == "soda") {
            return 'Sprite\nGinger Ale\nCoca Cola';
        }
        return 'No recommended recipes';
    }

    recommendedRecipes = () => {
        swal({
            title: 'Recommended Recipes',
            text: this.getRecipes(),
            buttons: {
                cancel: "Close",
                success: "Share with Friends",
            },
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardActionArea
                    onClick={this.recommendedRecipes}
                    value={this.props.itemName.toLowerCase()}
                >
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
                        <div>
                            <div className="inlineForm">
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
                                    className={classes.textField2}
                                    margin="normal"
                                />
                            </div>
                            <div>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Frequency</InputLabel>
                                    <Select
                                        value={this.state.frequency}
                                        onChange={this.handleChange('frequency')}
                                        inputProps={{
                                            name: 'frequency',
                                            id: 'frequency-simple',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"Daily"}>Daily</MenuItem>
                                        <MenuItem value={"Weekly"}>Weekly</MenuItem>
                                        <MenuItem value={"Every 2 Weeks"}>Every 2 Weeks</MenuItem>
                                        <MenuItem value={"Every 3 Weeks"}>Every 2 Weeks</MenuItem>
                                        <MenuItem value={"Every Month"}>Every 2 Weeks</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Duration</InputLabel>
                                    <Select
                                        value={this.state.duration}
                                        onChange={this.handleChange('duration')}
                                        inputProps={{
                                            name: 'duration',
                                            id: 'duration-simple',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"1 week"}>1 week</MenuItem>
                                        <MenuItem value={"2 weeks"}>2 weeks</MenuItem>
                                        <MenuItem value={"3 weeks"}>3 weeks</MenuItem>
                                        <MenuItem value={"1 month"}>1 month</MenuItem>
                                        <MenuItem value={"2 months"}>2 months</MenuItem>
                                        <MenuItem value={"3 months"}>3 months</MenuItem>
                                        <MenuItem value={"4 months"}>4 months</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
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