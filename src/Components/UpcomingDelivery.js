import React, { Component } from 'react';
import swal from 'sweetalert';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/GroupAdd';
import FoodItem from './FoodItem';
import './UpcomingDelivery.css';

export default class UpcomingDelivery extends React.Component {
    friends = () => {
        let image = document.createElement("img");
        image.src = "/img/friends.png";
        image.classList.add("friendImg");
        swal({
        content: image,
        button: {
            text: "Close",
        },
        })
    }

    constructor(props) {
        super(props);
        this.FB = window.FB;

    }

    render() {
        return (
            <Card className="deliveryCard">
                <Grid container direction="row">
                    <Grid item xs={6} className="deliveryCardMetadata">
                        <CardContent>
                            <Typography variant="h5" className="deliveryCardDate">
                                {this.props.deliveryDate}
                            </Typography>
                            <Typography variant="p" className="deliveryCardBank">
                                Bank: {this.props.bankName}
                            </Typography>
                            <Typography variant="p" className="deliveryCardFarm">
                                Farm: {this.props.farmName}
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item xs={6} className="FoodItemList">
                        {Object.keys(this.props.items).map((val, i) => {
                            console.log("xxxxxxxxxxxxxxxxxxxxxxxxx")
                            console.log(val);
                            if(i >= 3)
                                return null;
                            return <FoodItem itemName={this.props.items[val]["food_name"]} quantity={this.props.items[val]["qty"]} />;
                        })}
                    </Grid>
                </Grid>
                <div className="referralArea">
                    <div>
                        <Typography variant="p" className="deliveryCardInviteText">
                            Invite your friends to order this food item for faster and cheaper delivery!
                        </Typography>
                        <div className="referRightIcon">
                            <IconButton color="default" onClick={this.friends}>
                                <AddIcon />
                            </IconButton>
                        </div> 
                    </div>
                    <LinearProgress 
                        className="ReferralProgressBar" 
                        value={this.props.percentComplete} 
                        valueBuffer={this.props.percentComplete + this.props.percentAdditional} 
                        variant="buffer" 
                    />
                </div>
            </Card>
        );
    }
}