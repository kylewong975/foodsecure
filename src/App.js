import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Logo from '@material-ui/icons/Fastfood';
import HelpIcon from '@material-ui/icons/HelpOutline';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import ListingCard from './Components/ListingCard';
import UpcomingDelivery from './Components/UpcomingDelivery';

import './App.css';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
});

const items = {
  'Apple': 11,
  'Banana': 7,
  'Orange': 23,
};

const deliveries = [
  {
    'bankName': '1',
    'deliveryDate': 'Sunday, 14 April 2019',
    'farmName': '1',
    'items': items,
    'percentAdditional': 40,
    'percentComplete': 35,
  },
  {
    'bankName': '1',
    'deliveryDate': 'Sunday, 14 April 2019',
    'farmName': '1',
    'items': items,
    'percentAdditional': 40,
    'percentComplete': 35,
  },
  {
    'bankName': '1',
    'deliveryDate': 'Sunday, 14 April 2019',
    'farmName': '1',
    'items': items,
    'percentAdditional': 40,
    'percentComplete': 35,
  },
  {
    'bankName': '1',
    'deliveryDate': 'Sunday, 14 April 2019',
    'farmName': '1',
    'items': items,
    'percentAdditional': 40,
    'percentComplete': 35,
  },
  {
    'bankName': '1',
    'deliveryDate': 'Sunday, 14 April 2019',
    'farmName': '1',
    'items': items,
    'percentAdditional': 40,
    'percentComplete': 35,
  },
]

const listings = [
  {
    itemName: 'Apple',
    percentAdditional: 40,
    percentComplete: 60,
    price: '3.50',
    timeLeft: '3d',
  },
  {
    itemName: 'Apple',
    percentAdditional: 40,
    percentComplete: 60,
    price: '3.50',
    timeLeft: '3d',
  },
  {
    itemName: 'Apple',
    percentAdditional: 40,
    percentComplete: 60,
    price: '3.50',
    timeLeft: '3d',
  },
  {
    itemName: 'Apple',
    percentAdditional: 40,
    percentComplete: 60,
    price: '3.50',
    timeLeft: '3d',
  },
  {
    itemName: 'Apple',
    percentAdditional: 40,
    percentComplete: 60,
    price: '3.50',
    timeLeft: '3d',
  },
  {
    itemName: 'Apple',
    percentAdditional: 40,
    percentComplete: 60,
    price: '3.50',
    timeLeft: '3d',
  },
  {
    itemName: 'Apple',
    percentAdditional: 40,
    percentComplete: 60,
    price: '3.50',
    timeLeft: '3d',
  },
  {
    itemName: 'Apple',
    percentAdditional: 40,
    percentComplete: 60,
    price: '3.50',
    timeLeft: '3d',
  },
  {
    itemName: 'Apple',
    percentAdditional: 40,
    percentComplete: 60,
    price: '3.50',
    timeLeft: '3d',
  },
]

class App extends Component {
  help = () => {
    let image = document.createElement("img");
    image.src = "/img/apple.png";
    swal({
      content: image,
      button: {
        text: "Close",
      },
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className="page">
          <AppBar>
            <Toolbar className="header">
              <Icon color="action" className="logo">
                <Logo />
              </Icon>
              <Typography variant="h5" color="default" noWrap>
                FoodSecure
              </Typography>
              <div className="headerIcons">
                <Tooltip title="Help">
                  <IconButton color="default" onClick={this.help}>
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Notifications">
                  <IconButton color="default">
                    <Badge className={classes.margin} badgeContent={4} color="primary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Profile">
                  <IconButton color="default">
                    <ProfileIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </Toolbar>
          </AppBar>
          <Grid container direction="row" className="page-container">
            <Grid item xs={6} className="Inventory">
              <div className="scroll-container">
                <br/><br/>
                <Grid container>
                  {listings.map((val) => {
                    return (<Grid item xs={12} md={6} lg={4}>
                      <ListingCard 
                        itemName={val['itemName']}
                        percentAdditional={val['percentAdditional']}
                        percentComplete={val['percentComplete']}
                        price={val['price']}
                        timeLeft={val['timeLeft']}
                      />
                    </Grid>);
                  })}
                </Grid>
              </div>
            </Grid>
            <Grid item xs={6} className="UpcomingDeliveries">
              <div className="scroll-container">
                <br/><br/>
                <Typography variant="h4" color="default" noWrap className="deliveryHeader">
                  Upcoming Deliveries
                </Typography>
                <Grid container>
                  {deliveries.map((val) => {
                    return (<UpcomingDelivery 
                      bankName={val['bankName']}
                      deliveryDate={val['deliveryDate']} 
                      farmName={val['farmName']}
                      items={val['items']} 
                      percentAdditional={val['percentAdditional']}
                      percentComplete={val['percentComplete']}
                    />);
                  })}
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
