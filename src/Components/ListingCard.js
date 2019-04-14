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
        width: 345,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        flex: 1,
        overflow: 'auto',
    },
};

class ListingCard extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardMedia
                    className="listingCardImg"
                    image="/img/apple.png"
                    title="Apple"
                />
                <CardContent>
                    <Typography variant="h6" className="listingCardDesc">
                        Apples
                    </Typography>
                    <Typography variant="h6" className="listingCardDesc">
                        $3
                    </Typography>
                </CardContent>
                <LinearProgress className="ProgressBar" value={70} valueBuffer={100} variant="buffer" />
                <CardContent>
                    <Typography variant="h6" className="listingCardDesc">
                        Time left: 3d
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(ListingCard);