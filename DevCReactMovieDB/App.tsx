import Axios from 'axios';
import _ from 'lodash';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderComponent from './src/components/HeaderComponent';
import Restaurants from './src/components/Restaurants';

interface StateApp {
  isLoading: boolean
  restaurantList: any[]
  apikey: string
  keyword: string
}


export default class App extends React.Component<any, StateApp> {

  constructor(props: any) {
    super(props)

    this.searchHandler = this.searchHandler.bind(this)
    this.searchHandler = _.debounce(this.searchHandler, 250)

    this.state = {
      isLoading: true,
      restaurantList: [],
      apikey: "a44e809ab1b6473c0a4e61a7e5462ca8",
      keyword: "",
    }
  }

  componentDidMount() {
    this.getData("")
  }

  getData = (keyword: string) => {
    const searchQuery = keyword != "" && "q=" + keyword
    Axios.get(`https://developers.zomato.com/api/v2.1/search?count=20&${searchQuery}`, {
      headers: {
        "user-key": this.state.apikey
      }
    }).then(response => {
      const restaurantsData = response.data.restaurants.map((item) => {
        const restaurant = item.restaurant

        return {
          id: restaurant.id,
          name: restaurant.name,
          address: restaurant.location.address,
          photoUrl: restaurant.featured_image,
          userRating: restaurant.user_rating.aggregate_rating,
          userRatingText: restaurant.user_rating.rating_text,
          userRatingColor: restaurant.user_rating.rating_color
        }
      })

      this.setState({ restaurantList: restaurantsData, isLoading: false })

    }).catch(error => {
      console.log("!!!!ERROR!!!!")
      console.log(error)
    })
  }

  searchHandler = (keyword: string) => {
    this.setState({ isLoading: true, restaurantList: [] })
    this.getData(keyword)
  }


  render() {

    return (
      <View style={styles.container}>
        <HeaderComponent title=""></HeaderComponent>
        <Restaurants
          isLoading={this.state.isLoading}
          list={this.state.restaurantList}
          searchHandler={this.searchHandler} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'stretch',
  }
});

