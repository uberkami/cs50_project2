import React from 'react'
import { Dimensions, View, FlatList, Text, TouchableOpacity, Image, StyleSheet, } from 'react-native'
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
        this.timeout()
    }
    timeout = () => {
        console.log('timeout1', Date.now())
        setTimeout(() => {
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
                        fetch(urlLoop)
                            .then(Response => {
                                return Response.json()
                            })
                            .then(data => {
                                fetchList.push(...data.Search)
                            })
                            .catch(error => console.log('error in fetching:', error))
                    }
                }
            }
            )
            .then(() => {
                if (fetchList) {
                    this.setState({ filmList: fetchList, movieCount: movieCount })
                    const changeTitle = () => { this.props.navigation.setOptions({ title: `${movieCount} results for ${this.props.route.params.movieName}!` }) }
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
    }

    keyExtractor = (item, index) => index.toString()

    render() {
        console.log('this.props in results ', this.props)
        if (this.props.route.params) {
            return (
                <FlatList
                    data={this.state.filmList}
                    keyExtractor={(item, index) => item.imdbID}
                    renderItem={({ item }) => {
                        if (item.Poster != null) {
                            return (
                                <TouchableOpacity
                                    style={styles.listItems}
                                    onPress={() => this.props.navigation.navigate('Details', { movieID: item.imdbID, movieName: item.Title })}
                                    key={item}
                                >
                                    <Image source={{ uri: item.Poster }} style={{ width: 150, height: 200, resizeMode: "contain", margin: 10 }} />
                                    <Text>{item.Title} - {item.Year}</Text>
                                </TouchableOpacity >
                            )
                        }
                    }
                    }>
                </FlatList >
            )
        } else {
            return (
                <Text>There are no results </Text>
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
        backgroundColor: '#BFBFBF',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#0D0D0D',
        minWidth: 100,
        marginTop: 20,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    }
});
