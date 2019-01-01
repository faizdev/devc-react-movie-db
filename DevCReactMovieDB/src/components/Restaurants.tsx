import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SearchBox from './SearchBox';

interface RestaurantData {
  id: number
  name: string
  address: string
  photoUrl: string
  userRating: string
  userRatingText: string
  userRatingColor: string
}

interface Props {
  list: RestaurantData[],
  isLoading: boolean,
  searchHandler: (event: string) => void
  // style: {}
}

export default class Restaurants extends React.Component<Props> {

  constructor(props: Props) {
    super(props)
  }

  render() {

    // GENERATING LIST ITEM
    let restaurantListItemView = this.props.list.map((restaurant) => {
      return <RestaurantItem restaurantData={restaurant} key={restaurant.id} />
    })

    return (
      <View style={styles.viewContainer}>
        <View style={styles.searchBoxContainer}>
          <SearchBox searchHandler={this.props.searchHandler} />
        </View>
        <ScrollView style={styles.restoContainer}>
          {this.props.isLoading && <ActivityIndicator size="large" color="#0000ff" />}
          {restaurantListItemView}
        </ScrollView>
      </View>
    )
  }
}


interface State {
  isFavorite: Boolean
}

interface RestaurantItemProps {
  restaurantData: RestaurantData
}

// LIST ITEM COMPONENT
class RestaurantItem extends React.Component<RestaurantItemProps, State> {
  constructor(props: RestaurantItemProps) {
    super(props)

    this.state = {
      isFavorite: false
    }

  }

  toggleFavorite = () => {
    this.setState({
      isFavorite: !this.state.isFavorite
    })
  }

  render() {

    const sourceURI = this.props.restaurantData.photoUrl ? this.props.restaurantData.photoUrl : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8UA8AAkUBYdOfF4cAAAAASUVORK5CYII=+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='

    return (
      <TouchableOpacity onPress={this.toggleFavorite}>
        <View style={styles.restoItem}>
          <Image
            style={styles.restoItemImage}
            source={{ uri: sourceURI }}
            defaultSource={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8UA8AAkUBYdOfF4cAAAAASUVORK5CYII=+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==' }}
          />
          <View style={styles.restoItemContent}>
            <Text style={styles.restoItemTitle}>{this.props.restaurantData.name}</Text>
            <Text style={{ fontSize: 12 }}>Addr:{this.props.restaurantData.address.substr(0, 30)}...</Text>
            <Text style={styles.restoItemRating}>Rating: {this.props.restaurantData.userRating}/5</Text>
            <Text style={{ fontSize: 12, color: `#${this.props.restaurantData.userRatingColor}` }}>{this.props.restaurantData.userRatingText}</Text>
          </View>
          <FontAwesomeIcon icon={faHeart} style={this.state.isFavorite ? { color: "#ffdb00" } : { color: "black" }} width={50} transform="shrink-8" />
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: "column"
  },
  searchBoxContainer: {
    height: 50,
    margin: 16,
    marginBottom: 0
  },
  restoContainer: {
    padding: 10,
    marginBottom: 30,
    marginTop: 20
  },
  restoItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 14,
    margin: 10,
    marginTop: 0,
    marginBottom: 20,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    backgroundColor: "white",
    shadowRadius: 3,
    borderRadius: 4,
  },
  restoItemContent: {
    color: "black",
    alignSelf: "flex-start",
    padding: 5,
    paddingLeft: 10,
    flex: 1,
    flexDirection: "column"
  },
  restoItemTitle: {
    fontSize: 16,
    flexGrow: 1
  },
  restoItemRating: {
    fontSize: 12,
  },
  restoItemImage: {
    width: 80,
    height: 80,
    borderRadius: 4
  },
  favoriteIcon: {

  }
});