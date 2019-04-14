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

const API_ROOT_ADDRESS = "http://c09d378a.ngrok.io/"
const SEARCH_FOOD_API = "https://0b6281fd.ngrok.io/search_foods"

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
  'Peanut Butter': 3,
};

const items2 = {
  'Carrot': 20,
  'Salmon': 11,
  'Soda': 45,
};

const items3 = {
  'Butter': 3,
  'Pasta': 2,
  'Pizza': 5,
};

const items4 = {
  'Orange': 15,
  'Pasta': 17,
  'Pizza': 1,
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
    'deliveryDate': 'Tuesday, 16 April 2019',
    'farmName': '2',
    'items': items2,
    'percentAdditional': 27,
    'percentComplete': 2,
  },
  {
    'bankName': '2',
    'deliveryDate': 'Saturday, 20 April 2019',
    'farmName': '1',
    'items': items3,
    'percentAdditional': 70,
    'percentComplete': 20,
  },
  {
    'bankName': '2',
    'deliveryDate': 'Sunday, 21 April 2019',
    'farmName': '2',
    'items': items4,
    'percentAdditional': 50,
    'percentComplete': 50,
  },
  {
    'bankName': '2',
    'deliveryDate': 'Monday, 22 April 2019',
    'farmName': '3',
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
    itemName: 'Carrot',
    percentAdditional: 15,
    percentComplete: 70,
    price: '0.89',
    timeLeft: '1d',
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
    this.FB = window.FB;
    this.state = {
      searchBarText: "",
      searchResults: [],
      selectedFood: "",
      food_bank_id: "CC7NFrAnTwr7yCDkOzHZ",
      user_id: "VcLrNxRJ0XQuEujzVycs",
      farmFoodList: [],
      isSidebarOpen: false,
      orderList: [],
    }
  }

  help = () => {
    let image = document.createElement("img");
    image.src = "/img/instructions.png";
    image.classList.add("helpImg");
    swal({
      content: image,
      button: {
        text: "Close",
      },
    })
  }

  getBankFood = (food_id) => {
    axios({
      method: 'get',
      url: API_ROOT_ADDRESS + 'get_bank_food/' + this.state.food_bank_id + '/' + food_id,
    })
    .then(response => {
      this.setState({ farmFoodList: response.data })
      // console.log(API_ROOT_ADDRESS + 'get_bank_food/' + this.state.food_bank_id + '/' + food_id)
      // console.log(response.data)
    })
    .catch(message => console.warn(message))
  }

  getOrders = () => {
    axios({
      method: 'get',
      url: API_ROOT_ADDRESS + 'get_orders/' + this.state.user_id + '/',
    })
    .then(response => {
      this.setState({ orderList: response.data })
      console.log(API_ROOT_ADDRESS + 'get_orders/' + this.state.user_id + '/')
      console.log("-------------------------")
      console.log(response.data)
    })
    .catch(message => console.warn(message))
  }

  getSearchFoodResult = (item) => {
    axios.get(SEARCH_FOOD_API + "?search=" + item)
    .then(response => {
      this.setState({ searchResults: response.data })
    })
    .catch(message => console.warn(message))
  }

  componentDidMount() {
    this.getBankFood('')
    this.getOrders()
  }

  onSetSidebarOpen = (open) => {
    this.setState({ isSidebarOpen: open });
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
                  this.getSearchFoodResult(item);
                }}
                onChange={selectedItem => {
                  this.setState({ selectedFood: selectedItem.name })
                  const image = document.createElement("img");
                  image.src = "/img/" + selectedItem.name.toLowerCase() + ".png";
                  swal({
                    title: selectedItem.name,
                    content: image,
                    buttons: ["Purchase", "Close"]
                  })
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
                      <input {...getInputProps({ placeholder: "Search Foods", 
                        onFocus: () =>  {
                          this.state.searchResults.length === 0 && this.getSearchFoodResult("") 
                        }})} 
                        id="searchBarInput"
                        />
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
                  <IconButton color="default" onClick={() => {
                    this.FB && this.FB.login(response => {
                      console.log(response)
                      if (response.status === 'connected') {
                        this.setState({ isSidebarOpen: true })
                      }
                    });
                  }}>
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
                  {this.state.farmFoodList.map((val) => {
                    return (<Grid item xs={12} md={6} lg={4}>
                      <ListingCard 
                        farmFoodId={val['farm_food_id']}
                        farmName={val['farm_name']}
                        itemName={val['food_name']}
                        price={Number.parseFloat(val['drop_price']).toFixed(2)}
                        foodBankId={this.state.food_bank_id}
                        // dropQty={val['drop_qty']}
                        // dropQuota={val['drop_quota']}
                        percentComplete={val['drop_qty'] / val['drop_quota']}
                        percentAdditional={100 - (val['drop_qty'] / val['drop_quota'])}
                        dropDeadline={val['drop_deadline']}
                        // timeLeft={val['drop_deadline']}
                        distanceKm={val['distance_km']}
                        // itemName={val['itemName']}
                        // percentAdditional={val['percentAdditional']}
                        // percentComplete={val['percentComplete']}
                        // price={val['price']}
                        // timeLeft={val['timeLeft']}
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
                  {this.state.orderList.map((val) => {
                    return (<UpcomingDelivery 
                      bankName={val['bank_name']}
                      deliveryDate={val['drop_date']} 
                      farmName={val['farm_name']}
                      items={val['foods']} 
                      percentAdditional={70}
                      percentComplete={30}
                    />);
                  })}
{/*                  {deliveries.map((val) => {
                    return (<UpcomingDelivery 
                      bankName={val['bankName']}
                      deliveryDate={val['deliveryDate']} 
                      farmName={val['farmName']}
                      items={val['items']} 
                      percentAdditional={val['percentAdditional']}
                      percentComplete={val['percentComplete']}
                    />);
                  })}
*/}                  
                </Grid>
              </div>
            </Grid>
            {/* <Sidebar
              sidebar={   
                <div>
                  <Typography style={{ marginTop: '100px', padding: '20px', fontSize: '18px', lineHeight: '2' }} variant="p" color="default" noWrap className="friendsHeader">
                    Welcome to FoodSecure, Max! <br></br> 
                  </Typography>
                  <img src="img/user_selfie.png" id="userImage" alt="User" height="156" width="156"></img>
                  <Typography style={{ 
                      marginTop: '50px', 
                      padding: '20px', 
                      fontSize: '18px', 
                      lineHeight: '2',
                      fontFamily: "Helvetica"
                    }} variant="p" color="default" noWrap className="friendsHeader">
                    Your friends are also on FoodSecure: <br></br>
                  </Typography>
                  <p style={{ margin: '20px', marginLeft: '40px', fontFamily: 'Moronco' }} className="friendsBody">Kyle</p>
                  <p style={{ margin: '20px', marginLeft: '40px', fontFamily: 'Moronco' }} className="friendsBody">Michael</p>
                  <p style={{ margin: '20px', marginLeft: '40px', fontFamily: 'Moronco' }} className="friendsBody">Jacobzen</p>
                  
                </div>           
              }
              open={this.state.isSidebarOpen}
              onSetOpen={this.onSetSidebarOpen}
              styles={{ sidebar: { background: "white" } }}
            >
            </Sidebar> */}
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
