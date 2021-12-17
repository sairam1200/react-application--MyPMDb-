/* eslint-disable prettier/prettier */
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore/lite';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authentication, db } from '../firebase';

const addToWatchlist = async data => {
  const auth = getAuth();
  const user = auth.currentUser.email;
  try {
    const cityRef = doc(db, user + 'watchList', data.imdb_id);
    setDoc(cityRef, data);
    const value = JSON.stringify(data);
    const key = 'watchList' + data.imdb_id;
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

const addToSeenlist = async data => {
    const auth = getAuth();
    const user = auth.currentUser.email;
    try {
      const cityRef = doc(db, user + 'seenlist', data.imdb_id);
      setDoc(cityRef, data);
      const value = JSON.stringify(data);
      const key = 'seenlist' + data.imdb_id;
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  };
  

async function fetchWatchlist  (){
    const auth = getAuth();
    const user = auth.currentUser.email;
    const citiesCol = collection(db, user + 'watchList');
    const citySnapshot = await getDocs(citiesCol);
    return citySnapshot.docs.map(doc => doc.data());
    // Usage:
    // const watchlist = await fetchWatchlist();
    // console.log(watchlist[0].title)
  
  }
  async function fetchRecomendation  (){
    const citiesCol = collection(db,'recomendation');
    const citySnapshot = await getDocs(citiesCol);
    return citySnapshot.docs.map(doc => doc.data());
    // Usage:
    // const watchlist = await fetchWatchlist();
    // console.log(watchlist[0].title)
  
  }
  async function fetchSeenlist  (){
    const auth = getAuth();
    const user = auth.currentUser.email;
    const citiesCol = collection(db, user + 'seenlist');
    const citySnapshot = await getDocs(citiesCol);
    return citySnapshot.docs.map(doc => doc.data());
    // Usage:
    // const seenlist = await fetchSeenlist();
    // console.log(seenlist[0].title)
  
  }

  async function fetchMovieData (id){
    var tempTest;
    var tempTest2;

  var testDabase3 = {
    description: '',
    imdb_rating: '',
    directors: [],
    language: '',
    rated: '',
    stars: [],  
    vote_count: '',
    banner: '',
    gen: [],
    image_url:'',
    imdb_id: '',
    keywords: [],
    plot: '',
    popularity: 143,
    rating: 0,
    release: null,
    title: '',
    trailer: '',
    type: '',
    year: 2021,
    poster: '',
  };



  var APIURL1 = 'https://data-imdb1.p.rapidapi.com/movie/id/';
  var APIURL3 = '/';
  var getMovieById = {
    method: 'GET',
    url: APIURL1 + id + APIURL3,
    headers: {
      'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
      'x-rapidapi-key': 'c43828aa2bmshc74cc47934aea9cp1c74b5jsn4e15971a0817',
    },
  };
//   var temp;
  await axios.request(getMovieById)
  .then(function (response) {
    tempTest = response.data.results;
  }).catch(function (error) {
    console.error(error);
  });

var url1 = 'http://www.omdbapi.com/?i=';
var url2 = id;
var url3 = '&apikey=601a74e1';
await axios.request(url1 + url2 + url3)
.then(function (response) {
    tempTest2 = response.data;
}).catch(function (error) {
  console.error(error);
});


  testDabase3 = {
    description: tempTest2.Plot,
    imdb_rating: tempTest2.imdbRating,
    directors: tempTest2.Director,
    language: tempTest2.Language,
    rated: tempTest2.Rated,
    stars: tempTest2.Actors,  // array
    vote_count: tempTest2.imdbVotes,
    banner: tempTest.banner,
    gen: tempTest.gen,
    image_url: tempTest.image_url,
    imdb_id: tempTest.imdb_id,
    keywords: tempTest.keywords,
    plot: tempTest.plot,
    popularity: tempTest.popularity,
    rating: tempTest.rating,
    release: tempTest.release,
    title: tempTest.title,
    trailer: tempTest.trailer,
    type: tempTest.type,
    year: tempTest.year,
    poster: tempTest2.Poster,
  };

  // usage
  // const data = await fetchMovieData(imdbID);
  return testDabase3;
};

  

export {addToWatchlist, fetchWatchlist, fetchRecomendation,  addToSeenlist, fetchSeenlist, fetchMovieData};


  // http://www.omdbapi.com/?i=tt3896198&apikey=601a74e1

var upcomingMovies = {
    method: 'GET',
    url: 'https://data-imdb1.p.rapidapi.com/movie/order/upcoming/',
    params: {page_size: '50'},
    headers: {
      'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
      'x-rapidapi-key': 'c43828aa2bmshc74cc47934aea9cp1c74b5jsn4e15971a0817',
    },
  };

  var getMovieByTitle = {
    method: 'GET',
    url: 'https://data-imdb1.p.rapidapi.com/movie/imdb_id/byTitle/Venom:%20Let%20There%20Be%20Carnage/',
    headers: {
      'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
      'x-rapidapi-key': 'c43828aa2bmshc74cc47934aea9cp1c74b5jsn4e15971a0817',
    },
  };

  var options = {
    method: 'GET',
    url: 'https://ott-details.p.rapidapi.com/gettitleDetails',
    params: { imdbid: '' },
    headers: {
      'x-rapidapi-host': 'ott-details.p.rapidapi.com',
      'x-rapidapi-key': 'b3e5da262fmsh666d05d13a2d032p103b1ajsn4dedd529749f',
    },
  };


//   var theMoviedb= 'https://api.themoviedb.org/3/movie/popular?api_key=6c987418485ac7e897b299b7568c7be8&language=en-US&page=1';

  // axios.request(theMoviedb)
//   .then(function(response)  {
//     // const moviedata= await response.data();
//     // setSearchResult({
//     //   results: response.data.results,

//     // });
//     // let te = searchResult.results;
//     // setImdbId({
//     //   imdb_id: response.data.movie_results.imdb_id,
//     // });
//     // console.log(searchResult.results);
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// };





  // var imdbDetails = {
  //   method: 'GET',
  //   url: 'https://movies-tvshows-data-imdb.p.rapidapi.com/',
  //   params: {type: 'get-movie-details', imdb: id},
  //   headers: {
  //     'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com',
  //     'x-rapidapi-key': 'c43828aa2bmshc74cc47934aea9cp1c74b5jsn4e15971a0817',
  //   },
  // };
  // await axios.request(imdbDetails)
  // .then(function (response) {
  //   // console.log(response.data);
  //   temp  = response.data;
  // }).catch(function (error) {
  //   console.error(error);
  // });

