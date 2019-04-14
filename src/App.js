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
  // overrides: {
  //     MuiButton: {
  //       text: {
  //         backgroundColor: '#F68080',
  //         borderRadius: 3,
  //         border: 0,
  //         color: 'white',
  //         height: 30,
  //         padding: '0 30px',
  //         margin: '20px',
  //         boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  //         fontFamily: 'Poppins',
  //         fontWeight: 700,
  //         fontSize: 14
  //       },
  //     },
  //     MuiBottomNavigation: {
  //       root: {
  //         backgroundColor: '#FFAFA4',
  //       }
  //     },
  //     MuiBottomNavigationAction: {
  //       root: {
  //         color: '#000000',
  //       },
  //       iconOnly: {
  //         color: '#FF0000'
  //       },
  //       wrapper: {
  //         color: '#FFFFFF ',
  //       }
  //     }
  //   },
  //   MuiPickers: {
  //     root: {
  //       backgroundColor: '#FFAFA4'
  //     },
  //   },
  //   MuiCard: {
  //     root: {
  //       backgroundColor: '#FFAFA4'
  //     }
  //   },
  typography: {
    useNextVariants: true,
    //     h1: {
    //       fontFamily: 'Poppins',
    //       fontWeight: 700,
    //       color: '#FFFFFF',
    //       fontSize: 44,
    //       marginBottom: 20
    //     },
    //     h2: {
    //       fontFamily: 'Poppins',
    //       fontWeight: 700,
    //       color: '#FFFFFF',
    //       fontSize: 48,
    //       margin: 0
    //     },
    //     h3: {
    //       fontFamily: 'Poppins',
    //       fontWeight: 700,
    //       color: '#F68080',
    //       fontSize: 24,
    //       marginBottom: '16px'
    //     },
    //     h4: {
    //       fontFamily: 'Poppins',
    //       fontWeight: 700,
    //       color: 'white',
    //       fontSize: 24,
    //     },
    //     h5: {
    //       fontFamily: 'Poppins',
    //       fontWeight: 700,
    //       color: 'black',
    //       fontSize: 18,
    //     },
    //     h6: {
    //       fontFamily: 'Poppins',
    //       color: '#F68080',
    //       fontSize: 12,
    //     }
  },
});

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
});

const SEARCH_FOOD_API = "localhost:8080/search_foods"

const SEARCH_RESULTS = [
  { name: "Harry Potter" },
  { name: "Net Moves" },
  { name: "Half of a yellow sun" },
  { name: "The Da Vinci Code" },
  { name: "Born a crime" }
];


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarText: "",
      searchResults: []
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
                onChange={selectedItem => alert(`You have selected ${selectedItem.name}`)}
                itemToString={item => (SEARCH_RESULTS ? SEARCH_RESULTS.name : "")}
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
                          {SEARCH_RESULTS
                            .filter(
                              item =>
                                !inputValue ||
                                item.name.toLowerCase().includes(inputValue.toLowerCase())
                            )
                            .map((item, index) => (
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
                            ))}
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
                  <Grid item xs={12} md={6} lg={4}>
                    <ListingCard />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <ListingCard />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <ListingCard />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <ListingCard />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <ListingCard />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <ListingCard />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <ListingCard />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <ListingCard />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <ListingCard />
                  </Grid>
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
                  <UpcomingDelivery />
                  <UpcomingDelivery />
                  <UpcomingDelivery />
                  <UpcomingDelivery />
                  <UpcomingDelivery />
                  <UpcomingDelivery />
                </Grid>
              </div>
            </Grid>
          </Grid>
          {/* <div className="pageBody">
            <div className="Inventory">
              <InventoryCard />
              <InventoryCard />
              <InventoryCard />
              <InventoryCard />
              <InventoryCard />
              <InventoryCard />
            </div>
            <hr className="SectionDivider" />
            <div className="Map">
              <img src="/img/map.png" className="MapImage" />
            </div>
            <hr className="SectionDivider" />
            <Typography variant="h5" color="default" noWrap className="SectionTitle">
              You May Need
            </Typography>
            <div className="RecommendedSection">
              <ListingCard />
              <ListingCard />
              <ListingCard />
              <ListingCard />
              <ListingCard />
              <ListingCard />
            </div>
            <hr className="SectionDivider" />
            <Typography variant="h5" color="default" noWrap className="SectionTitle">
              Highly Discounted
            </Typography>
            <div className="DiscountSection">
              <ListingCard />
              <ListingCard />
              <ListingCard />
              <ListingCard />
              <ListingCard />
              <ListingCard />
            </div>
          </div> */}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
