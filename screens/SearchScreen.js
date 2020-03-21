import React, { Component } from 'react'
import { TouchableOpacity, Image, FlatList, Text, View, KeyboardAvoidingView, StyleSheet, TextInput, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { FaTv, FaSearch } from "react-icons/fa";

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
          this.props.navigation.navigate('Results', { movieName: this.state.movieName, searchWord: searchword })
          this.setState({ found: true })
        } else {
          this.setState({ found: false })
        }
      }
      )
      .catch(error => console.log('Error', error))
  }


  render() {

    return (
      <View>
        <View>
        
        <Text style={styles.header} ><FaTv /> Movie Search</Text>
        </View>

        <TextInput
          style={styles.input}
          onChangeText={(name) => this.setState({ movieName: name })}
          placeholder="To Do"
        />
        <View style={styles.button}>
        <FaSearch style={{margin: 10}}/>
        <Button title={"Search"} onPress={this.search} />
        </View>
        <Text>{this.state.found ? "" : "There was no movie found!"}</Text>
      </View>
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
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 15,
  },
  header: {
    marginTop: 10,
    textAlign: 'center',
    alignSelf: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    minWidth: 100,
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
    borderRadius: 5,
  }
});

export default SearchScreen;