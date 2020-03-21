import React, { Component } from 'react'
import { Dimensions, TouchableOpacity, Image, FlatList, Text, View, KeyboardAvoidingView, StyleSheet, TextInput, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { ScrollView } from 'react-native-gesture-handler'


export default class details extends React.Component {
  constructor(props) {
    console.log('props', props)
    super(props)
    this.state = {
      movieName: '',
      movieYear: '',
      plot: '',
      imdbRating: '',
      actors: '',
      poster: '',
    }
  }
  componentWillMount() {
    console.log('Detail', this.props.route.params)
    this.fetchDetails()
  }

  fetchDetails = async () => {
    const changeTitle = () => { this.props.navigation.setOptions({ title: `Details for ${this.props.route.params.movieName}` }) }
    changeTitle()
    console.log('title change')
    let movieID = this.props.route.params.movieID
    console.log('Detail movieID', movieID)
    let url = `http://www.omdbapi.com/?i=${movieID}&plot=full&apikey=3e5cf6f0`
    console.log('Detail fetchDetail url', url)
    let filmList = []
    let filmListLength = 0
    fetch(url)
      .then(Response => {
        console.log('Detail response', Response)
        return Response.json()
      })
      .then(data => {
        console.log('Detail data', data)
        if (data.Response === 'True') {
          console.log('Detail data.response', data.Response)
          this.setState({
            movieName: data.Title,
            movieYear: data.Year,
            plot: data.Plot,
            imdbRating: data.imdbRating,
            poster: data.Poster,
            actors: data.Actors,
          })
        }
      }
      )
      .catch(error => console.log('Error', error))
  }

  render() {
    const maxWidth = Dimensions.get('window').width - 60
    const maxHeight = Dimensions.get('window').height - 60
    return (
      <ScrollView style={styles.detail}>
        <Text style={styles.text}>Title: {this.state.movieName} ({this.state.movieYear})</Text>
        <Text style={styles.text}>imdb Rating: {this.state.imdbRating}</Text>
        <Image source={{ uri: this.state.poster }} style={{ width: maxWidth, height: maxHeight, resizeMode: "contain", marginTop: 15, marginBottom: 15 }} />
        <Text style={styles.text}>Actors: {this.state.actors}</Text>
        <Text style={styles.text}>Plot: {this.state.plot}</Text>


      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 5, 
    marginBottom: 5
  },
  detail: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#0D0D0D',
    backgroundColor: '#BFBFBF',
    margin: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 3,
  }
});

