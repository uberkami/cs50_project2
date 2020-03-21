import React from 'react'
import { View, FlatList, Text, TouchableOpacity, Image, StyleSheet, } from 'react-native'
//import movieComponent from '../components/MovieComponent'
import MovieComponent from '../components/MovieComponent'

export default class results extends React.Component {

    constructor(props) {
        console.log('props', props)
        super(props)
        this.state = {
            filmList: [],
            movieCount: 0,
            loading: true,
        }
    }

    componentWillMount() {
        this.getMovies()
        const changeHeader = () => {
            this.props.navigation.setOptions({ title: "${this.state.movieCount} movies found" })
        }
        const { setParams } = this.props.navigation;
        setParams({ title: `eine milliarde movies found` })
        this.timeout()
    }
    timeout = () => {
        console.log('timeout1', Date.now())
        setTimeout(() => {
            //changeHeader
            console.log('timeout2', Date.now())
            this.setState({
                filmList: [...this.state.filmList],

                loading: false,
            })
        }, 2000)
    }

    getMovies = async () => {
        let searchword = this.props.route.params.movieName.trim().replace(/\s/g, '+')
        let url = `http://www.omdbapi.com/?s=${searchword}&apikey=3e5cf6f0`
        let fetchList = []
        let movieCount = 0
        fetch(url)
            .then(Response => {
                console.log('response', Response)
                return Response.json()
            })
            .then(data => {
                console.log('data', data)
                movieCount = data.totalResults
                if (movieCount <= 10) {
                    fetchList = data.Search
                } else {
                    for (let i = 0; i < Math.ceil(movieCount / 10); i++) {
                        let urlLoop = `http://www.omdbapi.com/?s=${searchword}&page=${i + 1}&apikey=4d748d8d`
                        // console.log('urlLoop', urlLoop)
                        fetch(urlLoop)
                            .then(Response => {
                                //console.log('fetch response', Response)
                                return Response.json()
                            })
                            .then(data => {
                                //console.log('data', data)
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
                //console.log('then fetchList', fetchList)
                if (fetchList) {
                    //console.log('fetchList', fetchList)
                    //console.log('fetchList length', fetchList.length)
                    this.setState({ filmList: fetchList, movieCount: movieCount })
                    //() => this.props.navigation.setOptions({ title: 'Updated!' })
                    const changeTitle = () => { this.props.navigation.setOptions({ title: `${movieCount} Movies found for ${this.props.route.params.movieName}!` }) }
                    changeTitle()
                    console.log('title change')
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
        //console.log('this.state in results ', this.state)
        console.log('this.props in results ', this.props)
        //const titleUpdate = () => this.props.route.navigation.setOptions({ title: "many many results" })
        //navigation.setOptions({ title: `${movieCount} Movies found for ${this.props.route.params.movieName}!`})
        //console.log('type of filmlist', typeof (this.state.filmList))


        if (this.props.route.params) {
            return (
                // <View>

                //     <Text>
                //         Found {this.state.filmList.length} Movies for '{this.props.route.params.movieName}'
                //     </Text>
                //     {/* {this.state.filmList.forEach(<Text>movie.Title</Text>)} */}
                <FlatList
                    // keyExtractor={this.keyExtractor}
                    data={this.state.filmList}
                    keyExtractor={(item, index) => item.imdbID}
                    renderItem={({ item }) => {
                        if (item.Poster != null) {
                            //console.log('item.poster === true')
                            return (
                                //<MovieComponent item={item} key={item.key}/>
                                <TouchableOpacity
                                    style={styles.listItems}
                                    // onPress={() => console.log('Opacity in Flatlist', item)}
                                    onPress={() => this.props.navigation.navigate('Details', { movieID: item.imdbID, movieName: item.Title })}
                                    //onPress={() => this.props.navigation.setOptions({ title: 'Updated!' })}
                                    key={item}
                                >
                                    
                                    <Image source={{ uri: item.Poster }} style={{ width: 150, height: 200, margin: 25 }} />
                                    <Text>{item.Title} - {item.Year}</Text>
                                </TouchableOpacity >
                            )
                        }
                    }
                    }>
                </FlatList >
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listItems: {
        flex: 1,
        backgroundColor: '#DCDDDD',
        alignItems: 'center',
        justifyContent: 'center',
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
