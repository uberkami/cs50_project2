import React from 'react'
import Components, {TouchableOpacity, Image, Text} from 'react-native'

const MovieComponent = (props) => {
    console.log('movieComponent props', props)
    const item = props
    return (
        <TouchableOpacity
        onPress={console.log('Opacity in Flatlist', item)}
        key={item.key}
    >
        <Image source={{ uri: item.Poster }} style={{ width: 100, height: 100 }} />
        <Text>{item.Title} - {item.Year}</Text>
    </TouchableOpacity>
    )
}
export default MovieComponent