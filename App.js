import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import {
  createStackNavigator,
} from '@react-navigation/stack';
//import {createAppContainer} from 'react-navigation'
import { createAppContainer, NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/native'
import { Ionicons, Icon } from "react-native-vector-icons/Ionicons";
import SearchScreen from './screens/SearchScreen'
import ResultScreen from './screens/ResultScreen'
import DetailScreen from './screens/DetailScreen'

// const MainStack = createStackNavigator(
//   {
//     ContactList: ContactListScreen,
//     ContactDetails: ContactDetailsScreen,
//     AddContact: AddContactScreen
//   },
//   {
//     initialRouteName: "ContactList",
//     navigationOptions: {
//       headerTintColor: "#a41034",
//       headerStyle: {
//         backgroundColor: "#fff"
//       }
//     }
//   }
// );

// MainStack.navigationOptions = {
//   tabBarIcon:  ({ focused, tintColor }) => (
//     <Ionicons
//       name={`ios-contacts${focused ? "" : "-outline"}`}
//       size={25}
//       color={tintColor}
//     />
//   )
// };

// const MainTabs = createBottomTabNavigator(
//   {
//     Contacts: MainStack,
//     Settings: SettingsScreen
//   },
//   {
//     tabBarOptions: {
//       activeTintColor: "#a41034"
//     }
//   }
// );



// class SearchScreen extends React.Component {

// render() {
//   console.log('try to render searchScreen!')
// return (

//   < KeyboardAvoidingView behavior="padding" style={styles.container} >
//   <View>

//     {/* <Icon name="rocket" size={30} color="#900" /> */}
//     {/* <img src={"./assets/film-solid.svg"} /> */}
//     {/* <Ionicons name="tv" size={25} color="black" /> */}
//     <Text>Movie Search</Text>
//   </View>

//   <TextInput
//     style={styles.input}
//     // value={this.state.movieName}
//     // onChangeText={(name) => this.setState({ movieName: name })}
//     placeholder="To Do"
//   />
//   {/* <Button title="Submit" onPress={this.handleSubmit} disabled={!this.state.isFormValid} /> */}
//   <Button title="Search" onPress={this.search} />
//   {/* <Button title="debug" onPress={this.debug} /> */}
// </KeyboardAvoidingView >
// )
// }
// }
// const RootStack = createCompatNavigatorFactory(createStackNavigator)(
//   //const RootStack = createStackNavigator(
//   {
//     Search: {
//       screen: SearchScreen,
//       //navigationOptions: { title: 'Search a Movie' },
//     },
//     Results: {
//       screen: ResultScreen,
//       //params: { user: 'me' },
//     },
//   },
//   {
//     initialRouteName: 'Search',
//     //defaultNavigationOptions: {
//     //  gestureEnabled: false,
//     //},
//   }
// );
// const AppNavigator = createStackNavigator({
//   SearchRoute: SearchScreen,
//   ResultRoute: ResultScreen,
// }
//   , 
//   {
//   initialRouteName: 'SearchRoute',
//   }
// )







// class ResultScreen2 extends React.Component {
//   render() {
//     return (
//       <View><Text>object is not a function!</Text></View>
//     )

//     //     // console.log('resultscreen erreicht')
//     //     // return (
//     //     //   <View>
//     //     //     <Text>
//     //     //       ResultScreen
//     //     //   </Text>
//     //     //   </View>
//     //       // {this.props.state.movieName.map = () => console.log('movieName', movieName)}
//     //       // {for (movieName in this.state.apiData) {
//     //       //   console.log('movieName', movieName)
//     //       // }} 
//     //     // )
//   }
// }



function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default class App extends React.Component {

  // state = {
  //   movieName: '',
  //   apiData: [],
  // }


  // search = () => {
  //   let searchword = this.state.movieName
  //   let url = `http://www.omdbapi.com/?s=${searchword}&apikey=4d748d8d`
  //   console.log('url', url)
  //   fetch(url)
  //     .then(Response => {
  //       console.log('response', Response)
  //       return Response.json()
  //     })
  //     .then(data => {
  //       console.log('data', data)
  //       let filmList = []
  //       if (data.Response) {

  //         if (data.totalResults <= 10) {
  //           filmList = data.Search
  //         } else {
  //           for (let i = 0; i < Math.ceil(data.totalResults / 10); i++) {
  //             let urlLoop = `http://www.omdbapi.com/?s=${searchword}&page=${i + 1}&apikey=4d748d8d`
  //             console.log('urlLoop', urlLoop)
  //             fetch(urlLoop)
  //               .then(Response => {
  //                 // console.log('response', Response)
  //                 return Response.json()
  //               })
  //               .then(data => {
  //                 filmList.push(...data.Search)
  //                 console.log('data', data)
  //                 // filmList.push(this.state.apiData.Search)
  //                 console.log('filmList', filmList)
  //               })
  //               .catch(error => console.log('error'))
  //           }
  //         }
  //         console.log('filmList', filmList)
  //         this.setState({ apiData: filmList })
  //       }
  //     })
  //     .catch(error => console.log('error'))
  //   this.props.navigation.navigate('ResulthRoute')
  // }

  // debug = () => {

  //   console.log('this.state', this.state)
  //   console.log('api test: ', this.state.apiData)
  //   console.log('api test results: ', this.state.apiData.totalResults)

  //   console.log('api test Title 0: ', this.state.apiData.Search[0].Title)
  //   if (this.state.apiData.totalResults > 1) {
  //     console.log('api test Title 1: ', this.state.apiData.Search[1].Title)
  //   }
  // }
  
  render() {
    const Stack = createStackNavigator()
    return (
      <NavigationContainer>
        <Stack.Navigator>
        {/* <Stack.Navigator initialRouteName='Search'> */}
          <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Movie Search' }} />
          <Stack.Screen name="Results" component={ResultScreen} options={({ route }) => ({ title: route.params.name })}/>
          <Stack.Screen name="Details" component={DetailScreen} options={ ({ route }) => ({ title: route.params.name })} />
        </Stack.Navigator>
      </NavigationContainer>
      //<AppNavigator screenProps={{ apiData: this.state.apiData }} />
      //<View><Text>object is not a function!</Text></View>
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
