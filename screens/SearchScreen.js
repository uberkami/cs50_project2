import React, { Component } from 'react'
import { TouchableOpacity, Image, FlatList, Text, View, KeyboardAvoidingView, StyleSheet, TextInput, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'


class SearchScreen extends React.Component {
  state = {
    movieName: '',
    found: true,
  }

  search = async () => {
    let searchword = this.state.movieName.trim().replace(/\s/g, '+')
    let url = `http://www.omdbapi.com/?s=${searchword}&apikey=3e5cf6f0`
    console.log('url', url)
    let filmList = []
    let filmListLength = 0
    fetch(url)
      .then(Response => {
        console.log('response', Response)
        return Response.json()
      })
      .then(data => {
        console.log('data', data)
        if (data.Response === 'True') {
          console.log('data.response', data.Response)          
          this.props.navigation.navigate('Results', {movieName: this.state.movieName, searchWord: searchword})
          this.setState( {found: true})
          } else {
            this.setState( {found: false})
          }
        }    
      )
      .catch(error => console.log('Error', error))
    // this.props.navigation.navigate('Results', this.state)
  }

  // componentDidUpdate() {
  //         this.props.navigation.navigate('Results', this.state)
  // }

  render() {

    return (

      // < KeyboardAvoidingView behavior="padding" style={styles.container} >
      <View>
        <Text>ballyballs</Text>

        {/* <Icon name="rocket" size={30} color="#900" /> */}
        {/* <img src={"./assets/film-solid.svg"} /> */}
        {/* <Ionicons name="tv" size={25} color="black" /> */}
        <Text>Movie Search</Text>

        <TextInput
          style={styles.input}
          // value={this.state.movieName}
          onChangeText={(name) => this.setState({ movieName: name })}
          placeholder="To Do"
        />
        {/* <Button title="Submit" onPress={this.handleSubmit} disabled={!this.state.isFormValid} /> */}
        <Button title="Search" onPress={this.search} />
        {/* <Button title="debug" onPress={this.debug} /> */}
<Text>{this.state.found ? "" : "There was no movie found!"}</Text>
      </View>

      /* </KeyboardAvoidingView > */

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
  input: {
    borderWidth: 1,
    borderColor: 'black',
    minWidth: 100,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
  }
});

export default SearchScreen;