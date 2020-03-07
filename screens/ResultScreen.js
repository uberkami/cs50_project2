import React from 'react'
import { FlatList, Text, TouchableOpacity, StyleSheet, } from 'react-native'

export default class results extends React.Component {
    // componentDidMount() {
    //     console.log('componentDidMount called.');
    // //   }
    // // componentDidUpdate(prevProp, prevState) {
    //         this.props.navigation.navigate('Results', this.state)
    //         const movies = this.props.route.params
    // }
    // componentDidUpdate(prevProp, prevState) {
    //         this.props.navigation.navigate('Results', this.state)
    //         const movies = this.props.route.params
    // }

render () {
console.log('this.state in results ', this.props.route.params)
return (
   <Text>results </Text> 
 
//     <FlatList
//     data={this.props.route.params}
//     renderItem={({item}) => (
//             <TouchableOpacity
//             onPress={console.log('Opacity in Flatlist')}>
//                     <Text>{item.Title}</Text>
//             </TouchableOpacity>
//     )}>
// </FlatList> 
    // <FlatList></FlatList>
)
}
}