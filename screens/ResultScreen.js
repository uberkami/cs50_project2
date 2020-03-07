import React from 'react'
import { View, FlatList, Text, TouchableOpacity, Image, StyleSheet, } from 'react-native'

export default class results extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            filmList: [],
            loading: true,
        }
    }

    componentWillMount() {
        this.getMovies()
        this.timeout()
    }
    timeout = () => {
        console.log('timeout1')
        setTimeout(() => {
            console.log('timeout2')
            this.setState({ filmList: [...this.state.filmList],
                loading: false, })
                // this.navigationOptions({ title: `${this.state.filmList.length} movies found`})
                const {setParams} = this.props.navigation;
                setParams({ title: `${this.state.filmList.length} movies found` })
                // static navigationOptions = ({ navigation }) => ({
                    // title: `${navigation.state.params.title}`,
                
                // this.navigation.setOptions({ title: `${this.state.filmList.length} movies found`})
        }, 5000)
    }
    // componentDidMount() {
    //     let filmList = this.props.route.params.apiData
    //     console.log('filmList.length in componentDidMount ', filmList.length)
    //     console.log('componentDidMount called.');
    //     console.log('this.state in componentDidMount ', this.props.route.params)
    //     console.log('this.props.route.params.apiData.length in componentDidMount ', this.props.route.params.apiData.length)
    //     console.log('this.props in componentDidMount ', this.props)
    // }
    // componentDidUpdate(prevProp, prevState) {
    //     let filmList = this.props.route.params.apiData
    //     console.log('filmList.length in componentDidUpdate ', filmList.length)
    //     console.log('componentDidUpdate called.');
    //     console.log('this.state in componentDidUpdate ', this.props.route.params)
    //     console.log('this.props.route.params.apiData.length in componentDidUpdate ', this.props.route.params.apiData.length)
    //     console.log('this.props in componentDidUpdate ', this.props)
    // }

    getMovies = async () => {
        let searchword = this.props.route.params.movieName.trim().replace(/\s/g, '+')
        let url = `http://www.omdbapi.com/?s=${searchword}&apikey=3e5cf6f0`
        let fetchList = []
        fetch(url)
            .then(Response => {
                console.log('response', Response)
                return Response.json()
            })
            .then(data => {
                console.log('data', data)
                if (data.totalResults <= 10) {
                    fetchList = data.Search
                } else {
                    for (let i = 0; i < Math.ceil(data.totalResults / 10); i++) {
                        let urlLoop = `http://www.omdbapi.com/?s=${searchword}&page=${i + 1}&apikey=4d748d8d`
                        // console.log('urlLoop', urlLoop)
                        fetch(urlLoop)
                            .then(Response => {
                                console.log('fetch response', Response)
                                return Response.json()
                            })
                            .then(data => {
                                console.log('data', data)
                                fetchList.push(...data.Search)
                                // filmList.push(this.state.apiData.Search)
                                // console.log('filmList', filmList)
                            })
                            .catch(error => console.log('error in fetching:', error))
                    }
                }
            }


            )
            .then(() => {
                console.log('then fetchList', fetchList)
                if (fetchList) {
                    console.log('fetchList', fetchList)
                    console.log('fetchList length', fetchList.length)
                    this.setState({ filmList: fetchList })

                } else {
                    this.setState({
                        filmList: [],
                    })
                }
            }

            )
            .catch(error => console.log('Error', error))
        // this.props.navigation.navigate('Results', this.state)
    }

    keyExtractor = (item, index) => index.toString()

    render() {
        console.log('this.state in results ', this.state)
        console.log('this.props in results ', this.props)

        console.log('type of filmlist', typeof (this.state.filmList))


        if (this.props.route.params) {
            return (
                // <View>

                //     <Text>
                //         Found {this.state.filmList.length} Movies for '{this.props.route.params.movieName}'
                //     </Text>
                //     {/* {this.state.filmList.forEach(<Text>movie.Title</Text>)} */}
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.filmList}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={console.log('Opacity in Flatlist', item)}
                                key={item.key}
                            >
                                <Text>{item.Title} - {item.Year}</Text>
                                <Image source={{ uri: item.Poster }} style={{ width: 100, height: 100 }} />
                            </TouchableOpacity>
                        )}>
                    </FlatList>
                // </View>
            )
        } else {

            return (
                <Text>There are no results </Text>

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
}