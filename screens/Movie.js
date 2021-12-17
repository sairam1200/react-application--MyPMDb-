/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Button} from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { authentication } from '../firebase';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { fetchMovieData } from './function';
import { recommendation } from './database';
// import YouTube from 'react-native-youtube';



export default function Movie ({navigation, route}) {
  const [user, setUser] = useState('Hello World!');
  const APIURL = 'http://www.omdbapi.com/?i=tt3896198&apikey=601a74e1';
  // const APIURL2 = 'https://api.themoviedb.org/3/movie/550?api_key=6c987418485ac7e897b299b7568c7be8';

  const {  poster, imdbID} = route.params;
  const {disc, setDisc} = useState('hello');
  const [isShowingText, setIsShowingText] = useState(true);
  const [test, setTest] = useState();
  const [title, setTitle] = useState();
  const [movieInfo, setMovieInfo] = useState(
    // title: 'Title',
    // year: 'year',
    // description: 'description',
    // directors: [],
    // rating: 0,
    // stars: [],
    // genre: [],
    // rated: '',
    // runtime: '',
    // votes: '',
    // youtubeKey: '',

    // // selected : {},
  );
  
const [year,setYear]=useState();
const [rating,setRating]=useState();
const [description,setdescription]=useState();
const [imdb_rating,setimdb_rating]=useState();
const [directors,setdirectors]=useState();
const [language,setlanguage]=useState();
const [rated,setrated]=useState(); 
const [stars,setstars]=useState();   
const [vote_count,setvote_count]=useState(); 
const [banner,setbanner]=useState(); 
const [gen,setgen]=useState(); 
const [image_url,setimage_url]=useState();
const [imdb_id,setimdb_id]=useState();
const [keywords,setkeywords]=useState();
const [plot,setplot]=useState();
const [popularity,setpopularity]=useState(); 
const [release,setrelease]=useState();
const [trailer,settrailer]=useState(); 
const [type,settype]=useState(); 
//const [poster,setposter]=useState();
  const doStuff = ()=>{
    const test = 'tt2935510';

    console.log(' Did some Stuff ...');
    // navigation.navigate('SignOut');
  };
  const init =  async ()=>{
    const recomend = await fetchMovieData(imdbID);
    console.log(recomend.gen[0].genre);
    setTitle(recomend.title)
    setYear(recomend.year)
    setRating(recomend.rating)
      
    setdescription(recomend.description)
    //setimdb_rating(recomend.imdb_rating)
    setdirectors(recomend.directors)
    //  setlanguage(recomend.language)
    //  setrated(recomend.rated) 
    setstars(recomend.stars)   
    setvote_count(recomend.vote_count) 
    // setbanner(recomend.banner)
    setgen(recomend.gen[0].genre) 
    // setimage_url(recomend.image_url)
    // setimdb_id(recomend.imdb_id)
    // setkeywords(recomend.keywords)
    // setplot(recomend.plot) 
    // setpopularity(recomend.popularity) 
    // setrelease(recomend.release) 
    // settrailer(recomend.trailer) 
    // settype(recomend.type) 
   // setposter(recomend.poster) 



  
};

  useEffect(() => {
    const auth = getAuth();
    setUser(auth.currentUser.email);
    if (!test) {
      init();
      setTest(true);
    }
    
  }, [test, imdbID, user]);

  // const test = () => {
  //   axios(APIURL + '&s=' + state.s).then(({data})=> {
  //     let results = data.Search;
  //     console.log(results);
  //     });
  // };




  return (
    <View style={styles.body}>
      <Image style={styles.poster} source={{uri: poster}}/>
      <View style={styles.homeTextContainer}>
     
                

         <ScrollView> 
        <Text style={styles.homeText}>{title}</Text>
        <Text style={styles.description}>IMDB Rating:  ({year}){rating}</Text>
        <Text style={styles.description}>Stars: {stars}</Text>
        <Text style={styles.description}>Genres: {gen}</Text>
        {/* <Text style={styles.description}>Rated: {rated}</Text> */}
        
        <Text style={styles.description}>Votes:  ({vote_count})</Text>

        <Text style={styles.description}>Directors: {directors} </Text>
        <Text style={styles.description}>Plot:{description} </Text>
        </ScrollView>
        
      </View>
      <View style={styles.footer}> 
        <TouchableOpacity style={styles.button}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Home</Text>
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
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    height: '60%',
    width: '80%',
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
  description: {

  },
  footer: {
    flex: 1,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
  }

});


