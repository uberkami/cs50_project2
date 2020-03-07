import React, { Component } from 'react'
import { TouchableOpacity, Image, FlatList, Text, View, KeyboardAvoidingView, StyleSheet, TextInput, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'


class SearchScreen extends React.Component {
  state = {
    movieName: '',
    apiData: [],
  }

  search = async () => {
   let searchword = this.state.movieName
    let url = `http://www.omdbapi.com/?s=${searchword}&apikey=4d748d8d`
    console.log('url', url)
    fetch(url)
      .then(Response => {
        console.log('response', Response)
        return Response.json()
      })
      .then(data => {
        console.log('data', data)
        let filmList = []
        if (data.Response) {

          if (data.totalResults <= 10) {
            filmList = data.Search
          } else {
            for (let i = 0; i < Math.ceil(data.totalResults / 10); i++) {
              let urlLoop = `http://www.omdbapi.com/?s=${searchword}&page=${i + 1}&apikey=4d748d8d`
              // console.log('urlLoop', urlLoop)
              fetch(urlLoop)
                .then(Response => {
                  // console.log('response', Response)
                  return Response.json()
                })
                .then(data => {
                  filmList.push(...data.Search)
                  // console.log('data', data)
                  // filmList.push(this.state.apiData.Search)
                  // console.log('filmList', filmList)
                })
                .catch(error => console.log('error'))
            }
          }
          console.log('filmList', filmList)
          this.setState({ apiData: filmList })
        }
      }
      )
      .catch(error => console.log('error'))
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
    <FlatList
    data={this.state.apiData}
    renderItem={({item}) => (
      <TouchableOpacity
      onPress={console.log('Opacity in Flatlist', item)}
      key={item.key}
      >
                    <Text>film</Text>
                    <Text>{item.Title}</Text>
                    <Image source={{uri: item.Poster}} style={{width: 50, height:50}}/>
            </TouchableOpacity>
    )}>
</FlatList> 
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