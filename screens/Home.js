/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Animated, Text, Dimensions, View, TextInput, TouchableOpacity, ScrollView, Image, FlatList, ImageBackground,Linking ,StatusBar} from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { authentication } from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {sairam} from './database';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import {Video} from 'react-native-video-player';
// import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons';


// import {fetchMovie} from '../components/data'
const {width, height } = Dimensions.get('screen');
// const randomRGB = () => Math.floor(Math.random() * 256);

// const getRandomColor = () => 'rgb(' + randomRGB() + ',' + randomRGB() + ',' + randomRGB() + ')';
// const [currentColor, setCurrentColor] = useState(getRandomColor());

const Item = ({ title, image, year, plot, rating ,banner,trailer}) => (
  
  
  <View style={{flex: 1, alignItems: 'center'}}>
  <ImageBackground source={{uri: image}}
    blurRadius={10} style={{
      width: width,
      height: height / 2,
      resizeMode: 'contain',
      borderRadius: 20,
      
    }}
    > 
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
       
      }}

    >
      {/* <Video video={{uri: trailer}}
      autoplay={false}
      defaultMuted={true}
      videoWidth={1600}
    videoHeight={900}
    thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
      /> */}
      <Image
        source={{uri: image}}
        style={{
          width: width,
          height: height / 2,
          resizeMode: 'contain',
          borderRadius: 20,
          
        }}
      />
     
    </View>
   </ImageBackground>
    <View
      style={{
        flex: 1,
        width: width,
        height: height,
        padding: 10,
        alignItems: 'baseline',
      }}

    >
      
      <View style={styles.resultContainer}>
      <Text style={styles.titleText}>{title} ({year})</Text>
      <TouchableOpacity style={{alignItems:'flex-end'}} onPress={()=>Linking.openURL(trailer)} >
        <Text>play</Text>
      </TouchableOpacity>
      <Text style={{fontSize: 14.5,
    fontWeight: "bold",
    color: 'black',

      }}>Rating: {rating}</Text>
      
      <Text style={{fontSize: 12,
    fontWeight: '600',
    color: 'black',
    
      }}>OVERVIEW : {plot}</Text>
      </View>
    
    </View>
  </View>
  
);
export default function Home ({navigation}) {
  const [user, setUser] = useState('Hello World!');
  const [popularMovies, setPopularMovies] = useState({cat: 'Popular Movies',results: []});
  const [searchResult, setSearchResult] = useState({results: '' });
  const [finalResult, setFinalResult] = useState({results: []});
  const [popularMovies2, setPopularMovies2] = useState('');
  const [searched, setSearched] = useState(false);
  const [IMDB_KEY, setIMDB_KEY] = useState('tt6920084');

 

  const renderItem = ({ item }) => (
    <Item
    title={item.title}
    image={item.poster}
    year={item.year}
    plot={item.description}
    rating={item.imdb_rating}
    banner={item.image_url}
    trailer={item.trailer}
    
    />

  );
  // eslint-disable-next-line no-undef
  //
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(
        key,
        value
      );
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  // eslint-disable-next-line no-undef
  const retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        const temp = JSON.parse(value);
        // console.log(value);
        setFinalResult({
          results: finalResult.results.push(temp)
        })        
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // async function fetchData() {
  //   const options = {
  //     method: 'GET',
  //     url: 'https://movies-tvshows-data-imdb.p.rapidapi.com/',
  //     params: { type: 'get-popular-movies', page: '1', year: '2020' },
  //     headers: {
  //       'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com',
  //       'x-rapidapi-key': 'c43828aa2bmshc74cc47934aea9cp1c74b5jsn4e15971a0817',
  //     },
  //   };

  //   axios.request(options)
  //     .then((response) => {
  //       const temp = JSON.stringify(response.data.movie_results);
  //       // console.log(popularMovies);
  //       storeData('test', temp);
  //       setPopularMovies({
  //         cat: 'test',
  //         results: temp,
  //       });
  //     }).catch((error) => {
  //       console.error(error);
  //     });
  // }



  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {

    if (!searched) {
    //   fetchData();
    //   console.log('fetched data: ');
    //   //  retrieveData("test");
    //   console.log('retrieved data: ');
    //   setSearched(true);
    }

    // const auth = getAuth();
    // setUser(auth.currentUser.email);
  }, [searched]);

  

  return (
    <View style={styles.body}>
      <View style={styles.homeTextContainer}>
        <StatusBar backgroundColor='#6B3A2A'/>
        <Text style={styles.homeText}>Recommendations</Text>
      </View>
      
      <View style={styles.flatlistContainer}>
      
        <Animated.FlatList
          data={sairam}
          renderItem={renderItem}
          keyExtractor={(item) => item.imdb_id}
          horizontal={true}
          pagingEnabled
          bounces={false}
          
          // eslint-disable-next-line react-native/no-inline-styles
          // contentContainerStyle={{
          //   alignItems: 'center',
          // }}
          showsHorizontalScrollIndicator={false}
          // extraData={selectedId}
        />
      </View>
     
        
      
      
      <View style={styles.footer}>
        <TouchableOpacity style={{width: 50,height: 50,}} onPress={() => navigation.navigate('Search')}>
        <Icon name='menu' size={40} color='#000' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} > 
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}onPress={() => navigation.navigate('Menu')}>
          <Text>Menu!</Text>
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
    backgroundColor: '#F4ECE8',
    marginTop: 0,
    padding:1,
   
  },
  header: {
    width: '90%',
    alignItems: 'flex-start',
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
    fontWeight: 'bold',
  
  },
  homeTextContainer: {
    flex: 0.05,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '90%',
    height: '10%',
    paddingBottom: 5,
    paddingLeft: 5,
    
  },
  flatlistContainer:{
    flex: 1.2,
  resizeMode: 'contain',
  
    
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    backgroundColor: '#CDCDCD',
    width: 70,
  },
  poster: {
    height: '50%',
    width: '100%',
    borderWidth: 1,
    borderColor: '#C4C4C4',

  },
  resultContainer: {
    flex: 1,
    
    borderWidth: 2,
    borderColor: '#C4C4C4',
    padding: 10,
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
    height: '70%',
    backgroundColor: 'red',
    
  },
  itemBody: {
    flex: 1 ,
    // width: '90%',
    // height: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'white',
  },
  titleText: {
  
    fontSize: 20,
    fontWeight: "bold",
    color: 'black',
    fontStyle:'italic',
  },
  movieTrailer:{
    backgroundColor: '#212121',
    padding:18,
    borderRadius:40,
    justifyContent:'center',
    alignItems:'center',
    elevation: 10,
    borderWidth:4,

  }
});




function fetchPoster(imdbID, setPoster, setMovie, movie) {
  var axios2 = require('axios').default;
  var options = {
    method: 'GET',
    url: 'https://ott-details.p.rapidapi.com/gettitleDetails',
    params: { imdbid: imdbID },
    headers: {
      'x-rapidapi-host': 'ott-details.p.rapidapi.com',
      'x-rapidapi-key': 'b3e5da262fmsh666d05d13a2d032p103b1ajsn4dedd529749f',
    },
  };

  axios2.request(options)
    .then(function (response) {
      setPoster(response.data.imageurl[0]);      // console.log(response.data);

      movie = {
        title: response.data.title,
        year: response.data.released,
        genre: response.data.genre,
        imdbid: response.data.imdbid,
        poster: response.data.imageurl[0],
        rating: response.data.imdbrating,
        runtime: response.data.runtime,
        desc: response.data.synopsis,
        type: response.data.type,
        sta: response.data.streamingAvailability,
      };
      setMovie(movie);
      // console.log(movie.title);

    }).catch(function (error) {
      console.error(error);
    });
}





function fetchMovie( id) {
  const APIURL1 = 'http://www.omdbapi.com/?i=';
  const APIURL2 = id;
  const APIURL3 = '&apikey=601a74e1';
  axios(APIURL1 + APIURL2 + APIURL3)
  .then(({data})=> {
    // console.log('helllllllllo');
    // console.log(movie);
  })
  .catch((error)=> {
    console.error(error);
  });

}

// const didStuff = async ()=>{
//   // retrieveData('tt7097896');
//   const value = await AsyncStorage.getItem(IMDB_KEY);
//   const jasonValue = JSON.parse(value);

//   console.log(jasonValue);

// };

// const doStuff = async ()=>{
//   var testDabase = {
//     banner: '',
//     gen: [],
//     image_url:'',
//     imdb_id: '',
//     keywords: [],
//     plot: '',
//     popularity: 143,
//     rating: 0,
//     release: null,
//     title: 'Venom: Let There Be Carnage',
//     trailer: 'https://www.youtube.com/embed/-V0ARqmnzSk',
//     type: 'movie',
//     year: 2021,
//   };
//   // description: temp.Plot,
//   // imdb_rating: temp.imdbRating, 
//   // directors: temp.Director,
//   // language: temp.Language,
//   // rated: temp.Rated,
//   // stars: temp.Actors,  // array
//   // vote_count: temp.imdbVotes,
//   // poster: temp.Poster,

//   var testDabase2 = {
//     description: '',
//     imdb_rating: '',
//     directors: [],
//     language: '',
//     rated: '',
//     stars: [],  // array
//     vote_count: '',
//     poster: '',
//   };
//   var testDabase3 = {
//     description: '',
//     imdb_rating: '',
//     directors: [],
//     language: '',
//     rated: '',
//     stars: [],  // array
//     vote_count: '',
//     banner: '',
//     gen: [],
//     image_url:'',
//     imdb_id: '',
//     keywords: [],
//     plot: '',
//     popularity: 143,
//     rating: 0,
//     release: null,
//     title: '',
//     trailer: '',
//     type: '',
//     year: 2021,
//     poster: '',


//   };



//   var getMovieByTitle = {
//     method: 'GET',
//     url: 'https://data-imdb1.p.rapidapi.com/movie/imdb_id/byTitle/Venom:%20Let%20There%20Be%20Carnage/',
//     headers: {
//       'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
//       'x-rapidapi-key': 'c43828aa2bmshc74cc47934aea9cp1c74b5jsn4e15971a0817',
//     },
//   };
//   var APIURL1 = 'https://data-imdb1.p.rapidapi.com/movie/id/';
//   var APIURL2 = '';
//   var APIURL3 = '/';

//   await axios.request(getMovieByTitle)
//   .then(function (response) {
//     // console.log(response.data.results[0].imdb_id);
//     APIURL2 = response.data.results[0].imdb_id;
//   }).catch(function (error) {
//     console.error(error);
//   });

//   console.log(recList[0].imdb_id);
//   const id = IMDB_KEY;




//   var getMovieById = {
//     method: 'GET',
//     url: APIURL1 + id + APIURL3,
//     headers: {
//       'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
//       'x-rapidapi-key': 'c43828aa2bmshc74cc47934aea9cp1c74b5jsn4e15971a0817',
//     },
//   };
//   var temp;
//   await axios.request(getMovieById)
//   .then(function (response) {
//     // console.log(response.data.results);
//     temp  = response.data.results;
//   }).catch(function (error) {
//     console.error(error);
//   });
//   console.log(temp.title);
//   // console.log(APIURL1 + APIURL2 + APIURL3);
//   testDabase = {
//     banner: temp.banner,
//     gen: temp.gen,
//     description: '',
//     image_url: temp.image_url,
//     imdb_id: temp.imdb_id,
//     keywords: temp.keywords,
//     plot: temp.plot,
//     popularity: temp.popularity,
//     rating: temp.rating,
//     release: temp.release,
//     title: temp.title,
//     trailer: temp.trailer,
//     type: 'movie',
//     year: 2021,
//   };
//   // console.log(testDabase)


//   // var imdbDetails = {
//   //   method: 'GET',
//   //   url: 'https://movies-tvshows-data-imdb.p.rapidapi.com/',
//   //   params: {type: 'get-movie-details', imdb: id},
//   //   headers: {
//   //     'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com',
//   //     'x-rapidapi-key': 'c43828aa2bmshc74cc47934aea9cp1c74b5jsn4e15971a0817',
//   //   },
//   // };
//   // await axios.request(imdbDetails)
//   // .then(function (response) {
//   //   // console.log(response.data);
//   //   temp  = response.data;
//   // }).catch(function (error) {
//   //   console.error(error);
//   // });
// //   var theMoviedb= 'https://api.themoviedb.org/3/movie/popular?api_key=6c987418485ac7e897b299b7568c7be8&language=en-US&page=1';


// // axios.request(theMoviedb)
// //   .then(function(response)  {
// //     // const moviedata= await response.data();
// //     // setSearchResult({
// //     //   results: response.data.results,
      
// //     // });
// //     // let te = searchResult.results;
// //     // setImdbId({
// //     //   imdb_id: response.data.movie_results.imdb_id,
// //     // });
// //     // console.log(searchResult.results);
// //     console.log(response.data);
// //   })
// //   .catch((error) => {
// //     console.error(error);
// //   });
// // };
// var url1 = 'http://www.omdbapi.com/?i=';
// var url2 = id;
// var url3 = '&apikey=601a74e1';
//   console.log(url1 + url2 + url3)
// await axios.request(url1 + url2 + url3)
// .then(function (response) {
//   temp  = response.data;
// }).catch(function (error) {
//   console.error(error);
// });
// // console.log(temp);


//   testDabase2 = {
//     description: temp.Plot,
//     imdb_rating: temp.imdbRating, // array
//     directors: temp.Director,
//     language: temp.Language,
//     rated: temp.Rated,
//     stars: temp.Actors,  // array
//     vote_count: temp.imdbVotes,
//     poster: temp.Poster,
//   };
//   // console.log(testDabase)
//   testDabase3 = {
//     description: testDabase2.description,
//     imdb_rating: testDabase2.imdb_rating,
//     directors: testDabase2.directors,
//     language: testDabase2.language,
//     rated: testDabase2.rated,
//     stars: testDabase2.stars,  // array
//     vote_count: testDabase2.vote_count,
//     banner: testDabase.banner,
//     gen: testDabase.gen,
//     image_url: testDabase.image_url,
//     imdb_id: testDabase.imdb_id,
//     keywords: testDabase.keywords,
//     plot: testDabase.plot,
//     popularity: testDabase.popularity,
//     rating: testDabase.rating,
//     release: testDabase.release,
//     title: testDabase.title,
//     trailer: testDabase.trailer,
//     type: testDabase.type,
//     year: testDabase.year,
//     poster: testDabase2.poster,
//   };

//   // http://www.omdbapi.com/?i=tt3896198&apikey=601a74e1






//   console.log(testDabase3.poster)
//   const magicStr = JSON.stringify(testDabase3);

//   console.log(typeof id);
//   storeData(id, magicStr);
//   // console.log(testDabase3.year);




//   var upcomingMovies = {
//     method: 'GET',
//     url: 'https://data-imdb1.p.rapidapi.com/movie/order/upcoming/',
//     params: {page_size: '50'},
//     headers: {
//       'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
//       'x-rapidapi-key': 'c43828aa2bmshc74cc47934aea9cp1c74b5jsn4e15971a0817',
//     },
//   };


//   // console.log("fetched data: ");
//   // console.log(BestMovie[0].title);
//   let str = 'https://image.tmdb.org/t/p/w500';
//   const testValue = {
//     title: 'matrix',
//     id: 10,
//     };
//   const key = 'key';
//   const value = JSON.stringify(BestMovie);
//   const reee = JSON.parse(value);

//   // storeData(key, value);
//   // retrieveData("key");

//   // console.log( popularMovies.cat);

// console.log('***************** AND ********************');
//   console.log('***************** AND ********************');
//   // console.log(reee[0].id);

//   // retrieveData('test');
// };
