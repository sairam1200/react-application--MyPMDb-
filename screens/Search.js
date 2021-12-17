/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image} from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { authentication } from '../firebase';
import axios from 'axios';


export default function Search ({navigation}) {
  const [user, setUser] = useState('Hello World!');
  const APIURL = 'http://www.omdbapi.com/?i=tt3896198&apikey=601a74e1';
  const [searchResult, setSearchResult] = useState({
    results: [],
  });
  const [movieId, setMovieId] = useState('');


  const [state, setState] = useState({
    s: '',
    result: [],
    selected : {},
  });
  const {param, setParam} = useState({
    title: '',
    year: 0,
    description: '',
    });
  const [searched, setSearched] = useState('');

  const doStuff = ()=>{
    axios(APIURL + '&s=' + searched).
    then(({data})=> {
      let results = data.Search;
      setState(prevState=>{
        return {...prevState,results: results };
      });
      console.log(results);
    });



    const options = {
      method: 'GET',
      url: 'https://movies-tvshows-data-imdb.p.rapidapi.com/',
      params: {type: 'get-movies-by-title', title: 'matrix'},
      headers: {
        'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com',
        'x-rapidapi-key': 'c43828aa2bmshc74cc47934aea9cp1c74b5jsn4e15971a0817',
      },
    };

    axios.request(options)
    .then((response) =>{
      // const moviedata= await response.data();
      setSearchResult({
        results: response.data.movie_results,
      })
      // console.log(searchResult.results);
      // setMovieId(searchResult.results[0])
      // console.log(response.data.description);
      // console.log(response.data.imdb_rating);
      // console.log(response.data.directors);
      // const title = response.data.title;
      // setTest(test);
      // setTitle(response.data.title);
      // setDesciption(response.data.description);
      // setMovieInfo({
      //   title: response.data.title,
      //   year: response.data.year,
      //   description: response.data.description,
      //   directors: response.data.directors,
      //   rating: response.data.imdb_rating,
      //   stars: response.data.stars,
      //   genre: response.data.genres,
      //   rated: response.data.rated,
      //   runtime: response.data.runtime,
      //   votes: response.data.vote_count,
      //   youtubeKey: response.data.youtube_trailer_key,
      // })
    }).catch((error)=> {
      console.error(error);
    });
  };
  useEffect(() => {
    const auth = getAuth();
    setUser(auth.currentUser.email);
  }, []);

  const test = () => {
    axios(APIURL + '&s=' + state.s).then(({data})=> {
      let results = data.Search;
      console.log(results);
      });
  };



  const search = () => {
    axios(APIURL + '&s=' + state.s).then(({data})=> {
      let results = data.Search;
      setState(prevState=>{
        return {...prevState,results: results };
      });
      console.log(results);

    });
  };

  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          onChangeText={text => setSearched(text)}
          onSubmitEditing={doStuff}
          value={searched}
        />
      </View>
      <View style={styles.homeTextContainer}>
        {/* <Text style={styles.homeText}>{user} </Text> */}
          <ScrollView >
            {state.results?.map(result => (
            <TouchableOpacity 
              onPress={ () =>
                navigation.navigate('Movie', {
                  title: result.Title,
                  year: result.Year,
                  poster: result.Poster,
                  imdbID: result.imdbID,
              })}
              style={[styles.resultContainer]}
            >

                <Image style={styles.poster} source={{uri: result.Poster}}/>
                  <View style={styles.searchTextContainer}>
                    <Text style={styles.searchText}>{result.Title}  ({result.Year})</Text>
                  </View>

            </TouchableOpacity>

          ))}
        </ScrollView>
      </View>
      <View>
        <Text>{searched}</Text>
      </View>

      <View style={styles.footer}> 
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('SignOut')}>
          <Text>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Home')}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={doStuff} style={styles.footerButton}>
          <Text>Menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  body:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '90%',
  },
  searchInput: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 10,
    fontSize: 17,
  },
  homeText: {
    color: 'black',
    fontSize: 24,
  },
  homeTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    backgroundColor: '#CDCDCD',
    width: 70,
  },
  poster: {
    height: 100,
    width: 70,
    borderWidth: 1,
    borderColor: '#C4C4C4',

  },
  resultContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#C4C4C4',
    padding: 5,
    backgroundColor: 'rgba(107, 58, 42, 0.1)',
    margin: 3,
    borderRadius: 8,

  },
  searchText: {
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 15,
  },
  searchTextContainer: {
    flex: 1,
    justifyContent: 'flex-end',

  },
  footer: {
    flex: 0.1,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
  },
  footerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    backgroundColor: '#CDCDCD',
    width: 70,
    color: 'red',
  },



});


