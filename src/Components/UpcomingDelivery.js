import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/GroupAdd';
import './UpcomingDelivery.css';

export default class UpcomingDelivery extends React.Component {
    render() {
        return (
            <Card className="deliveryCard">
                <Grid container direction="row">
                    <Grid item xs={6} className="deliveryCardMetadata">
                        <CardContent>
                            <Typography variant="p" className="deliveryCardDate">
                                Sunday, 14 Apr 2019
                            </Typography>
                            <Typography variant="p" className="deliveryCardBank">
                                Bank 1
                            </Typography>
                            <Typography variant="p" className="deliveryCardFarm">
                                Farm 1
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item xs={6}>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                    </Grid>
                </Grid>
                <div className="referralArea">
                    <div>
                        <Typography variant="p" className="deliveryCardInviteText">
                            Invite your friends to order this food item for faster and cheaper delivery!
                        </Typography>
                        <div className="referRightIcon">
                            <IconButton color="default">
                                <AddIcon />
                            </IconButton>
                        </div> 
                    </div>
                    <LinearProgress 
                        className="ReferralProgressBar" 
                        value={70} 
                        valueBuffer={100} 
                        variant="buffer" 
                    />
                </div>
            </Card>
        );
    }
}