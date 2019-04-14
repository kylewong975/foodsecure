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
import SearchBar from 'material-ui-search-bar';
import Downshift from 'downshift';
import axios from 'axios';
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

const SEARCH_FOOD_API = "http://localhost:8080/search_foods"

/*
const SEARCH_RESULTS = [
  { name: "Harry Potter" },
  { name: "Net Moves" },
  { name: "Half of a yellow sun" },
  { name: "The Da Vinci Code" },
  { name: "Born a crime" }
];
*/

const items = {
  'Apple': 11,
  'Banana': 7,
  'Peanut Butter': 23,
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
    'percentAdditional': 27,
    'percentComplete': 2,
  },
  {
    'bankName': '1',
    'deliveryDate': 'Sunday, 14 April 2019',
    'farmName': '1',
    'items': items,
    'percentAdditional': 70,
    'percentComplete': 20,
  },
  {
    'bankName': '1',
    'deliveryDate': 'Sunday, 14 April 2019',
    'farmName': '1',
    'items': items,
    'percentAdditional': 50,
    'percentComplete': 50,
  },
  {
    'bankName': '1',
    'deliveryDate': 'Sunday, 14 April 2019',
    'farmName': '1',
    'items': items,
    'percentAdditional': 45,
    'percentComplete': 35,
  },
]

const listings = [
  {
    itemName: 'Apple',
    percentAdditional: 51,
    percentComplete: 45,
    price: '0.99',
    timeLeft: '3d',
  },
  {
    itemName: 'Banana',
    percentAdditional: 0,
    percentComplete: 33,
    price: '0.75',
    timeLeft: '11d',
  },
  {
    itemName: 'Broccoli',
    percentAdditional: 40,
    percentComplete: 60,
    price: '1.69',
    timeLeft: '2d',
  },
  {
    itemName: 'Butter',
    percentAdditional: 50,
    percentComplete: 50,
    price: '2.99',
    timeLeft: '4d',
  },
  {
    itemName: 'Chips',
    percentAdditional: 25,
    percentComplete: 25,
    price: '3.49',
    timeLeft: '8d',
  },
  {
    itemName: 'Orange',
    percentAdditional: 10,
    percentComplete: 60,
    price: '1.49',
    timeLeft: '22h',
  },
  {
    itemName: 'Pasta',
    percentAdditional: 30,
    percentComplete: 65,
    price: '2.99',
    timeLeft: '3d',
  },
  {
    itemName: 'Peanut Butter',
    percentAdditional: 12,
    percentComplete: 80,
    price: '4.99',
    timeLeft: '10h',
  },
  {
    itemName: 'Pizza',
    percentAdditional: 30,
    percentComplete: 30,
    price: '9.99',
    timeLeft: '4d',
  },
  {
    itemName: 'Salmon',
    percentAdditional: 5,
    percentComplete: 95,
    price: '14.99',
    timeLeft: '2d',
  },
  {
    itemName: 'Soda',
    percentAdditional: 0,
    percentComplete: 5,
    price: '5.99',
    timeLeft: '20d',
  },
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarText: "",
      searchResults: [],
      selectedFood: ""
    }
  }

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
              {/* <SearchBar
                className="searchBarMaterial"
                value={this.state.searchBarText}
                onChange={(value) => {
                  this.setState({ searchBarText: value })
                }}
                onRequestSearch={() => { return }}
              /> */}
              <Downshift
                onInputValueChange={item => {
                  this.setState({ searchBarText: item })
                  axios.get(SEARCH_FOOD_API + "?search=" + item)
                  .then(response => {
                    this.setState({ searchResults: response.data })
                  })
                  .catch(message => console.warn(message))
                }}
                onChange={selectedItem => {
                  this.setState({ selectedFood: selectedItem.name })
                }}
                itemToString={item => item ? item.name : ""}
              >
                {({
                  getInputProps,
                  getItemProps,
                  isOpen,
                  inputValue,
                  highlightedIndex,
                  selectedItem,
                  highlightedItem,
                  getLabelProps
                }) => (
                    <div className="searchBar">
                      <input {...getInputProps({ placeholder: "Search Foods" })} id="searchBarInput" />
                      {isOpen ? (
                        <div className="downshift-dropdown">
                          {this.state.searchResults ? this.state.searchResults.map((item, index) => (
                                <div
                                  className="dropdown-item"
                                  {...getItemProps({ key: item.name, index, item })}
                                  style={{
                                    backgroundColor:
                                      highlightedIndex === index ? "lightgray" : "white",
                                    color: 'black',
                                    fontWeight: selectedItem === item ? "bold" : "normal",
                                    fontSize: "20px",
                                    height: "30px",
                                    padding: "7.5px"
                                  }}
                                >
                                  {item.name}
                                </div>
                              )) : null
                            })
                        </div>
                      ) : null}
                    </div>
                  )}
              </Downshift>
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
