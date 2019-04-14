import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './InventoryCard.css';

const styles = {
    card: {
        width: 345,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        height: 225,
        flex: 1,
    },
};

class InventoryCard extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardHeader title="Apples" className="cardDesc" />
                <CardMedia
                    className={"cardImg"}
                    image="/img/apple.png"
                    title="Apple"
                />
                <CardContent>
                    <Typography variant="h6" className="cardDesc">
                        5x
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(InventoryCard);