import 'react-native-gesture-handler';

import React, { Component } from 'react';
import {view,ScrollView,Text,TextInput,TouchableOpacity,StyleSheet, View, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';








 class Review_page extends Component {

    constructor(props)
    {
      super(props);
      this.state = {

        location_id: this.props.route.params.location_id,
        location_name: '',
        location_town: '',
        avg_overall_rating: 1,
        avg_price_rating: 1,
        avg_quality_rating: 1,
        avg_cleanliness_rating: 1,
        latitude: '',
        longitude: '',
        location_reviews: [],
        isFavourite: '',
        liked_reviews: [],
        photo_path: '1',     
      };
    }


    getdata = async () => {
        const token = await AsyncStorage.getItem('@token');   
            return fetch("http://localhost:3333/api/1.0.0/location/" + this.state.location_id, 
            {
              method: 'GET',
              headers: {
                'X-Authorization':  token,
              }
            })
            .then( (response) => 
              {
                console.log(response);
                {
                    if (response.status === 200) {
                        console.log('Working');
                        return response.json();
                    }
                    else if (response.status === 404){
                        console.log('Not Found');
                    }
                    else
                    {
                        console.log('Server Error');
                        throw 'Error 404';
                    }
                }
            })
            .then( async (responseJson) => {
                console.log(responseJson);
                this.setState({location_name: responseJson.location_name});
                this.setState({latitude: responseJson.latitude});
                this.setState({longitude: responseJson.longitude});
                this.setState({location_town: responseJson.location_town});
                this.setState({avg_overall_rating: responseJson.avg_overall_rating});
                this.setState({avg_quality_rating: responseJson.avg_quality_rating});
                this.setState({avg_price_rating: responseJson.avg_price_rating});
                this.setState({avg_cleanliness_rating: responseJson.avg_cleanliness_rating});
                this.setState({location_reviews: responseJson.location_reviews});
            })
            .catch((error) => {
                console.log(error);
                Alert.alert(error);
            })
    }



    Favourite = async () => 
    {
        let token = await AsyncStorage.getItem('@token');
        return fetch("http://localhost:3333/api/1.0.0/find?search_in=favourite", 
            {
              method: 'GET',
              headers: {
                'X-Authorization':  token,
              }
            })


            .then((response) => {
                if (response.status === 200)
                {
                    return response.json();
                }
                else
                {
                    throw 'Error'
                }
            })

            .then(async (responseJson) => {
                let status = false;
                for (let i = 0; i < responseJson.length; i++) {
                    if (responseJson[i].location_id === this.state.location_id) {
                        status = true ;
                    }
                }
                this.setState({isFavourite: status});
            })

            .catch((error) => {
                console.log(error);
                Alert.alert(error);
            })

    }



    addFavourite = async () => {
        let token = await AsyncStorage.getItem('@token');
        return fetch("http://localhost:3333/api/1.0.0/location/" + this.state.location_id + '/favourite',
        {
            method: 'POST',
            headers: {'X-Authorization':  token,},
      })

      .then((response) => {
          if (response.status === 200) {
              console.log('Fav Added');
              Alert.alert('Favourite Added');
              this.setState({isFavourite: true});
          }
          else if (response.status === 400) 
          {
              console.error('Bad request');
          }
          else if (response.status === 401)
          {
              console.error('unauthorised');
          }
          else if (response.status === 404)
          {
              console.error('Error 404 not found')
          }
          else if (response.status === 500)
          {
              console.error('Server error');
          }
          else 
          {
              throw 'Error';
          }
      })

      .catch((error) => {
          console.log(error);
          Alert.alert(error);
      })      
    }

    RemoveFavourite = async () => {
        let token = await AsyncStorage.getItem('@token');
        return fetch("http://localhost:3333/api/1.0.0/location/" + this.state.location_id + '/favourite',
        {
            method: 'DELETE',
            headers: {'X-Authorization':  token,},
      })

      .then((response) => {
          if (response.status === 200) {
              console.log('Deleted Fav');
              Alert.alert('Favourite Removed');
              this.setState({isFavourite: false});
          }
          else if (response.status === 400) 
          {
              console.error('Bad request');
          }
          else if (response.status === 401)
          {
              console.error('unauthorised');
          }
          else if (response.status === 404)
          {
              console.error('Error 404 not found')
          }
          else if (response.status === 500)
          {
              console.error('Server error');
          }
          else 
          {
              throw 'Error';
          }
      })

      .catch((error) => {
          console.log(error);
          Alert.alert(error);
      })      
    }

    ManFavourite = () => {
        if (this.state.isFavourite)
        {
            this.RemoveFavourite();
            this.setState({isFavourite: false});
        }
        else 
        {
            this.addFavourite();
            this.setState({isFavourite: true});
        }
    }




    Like = async (rev_id, loc_id) => {

        let token = await AsyncStorage.getItem('@token');
        console.log(rev_id)
        console.log(loc_id)
        return fetch("http://localhost:3333/api/1.0.0/location/" + this.state.location_id + '/review/' + rev_id + '/like',
        {
            method: 'POST',
            headers: {'X-Authorization':  token,},
      })
      .then((response) => {
        if (response.status === 200) {
            Alert.alert('Review Liked');
            console.log('review liked')
            this.getLikedReviews();
        }
        else if (response.status === 400) 
        {
            console.error('Bad request');
        }
        else if (response.status === 401)
        {
            console.error('unauthorised');
        }
        else if (response.status === 404)
        {
            console.error('Error 404 not found')
        }
        else if (response.status === 500)
        {
            console.error('Server error');
        }
        else 
        {
            throw 'Error';
        }
    })
        .catch((error) => {
            console.log(error);
            Alert.alert(error);
        })   

    }


    RemoveLike = async (rev_id, loc_id) => {
        let token = await AsyncStorage.getItem('@token');
        return fetch("http://localhost:3333/api/1.0.0/location/" + this.state.location_id + '/review/' + rev_id + '/like',
        {
            method: 'DELETE',
            headers: {'X-Authorization':  token,},
      })
      .then((response) => {
        if (response.status === 200) {
            Alert.alert('Like Removed');
            console.log('Like removed')
            this.getLikedReviews();
        }
        else if (response.status === 400) 
        {
            console.error('Bad request');
        }
        else if (response.status === 401)
        {
            console.error('unauthorised');
        }
        else if (response.status === 404)
        {
            console.error('Error 404 not found')
        }
        else if (response.status === 500)
        {
            console.error('Server error');
        }
        else 
        {
            throw 'Error';
        }
    })
        .catch((error) => {
            console.log(error);
            Alert.alert(error);
        })   
    }

    getLikedReviews = async () => {
        let id = await AsyncStorage.getItem('@userID');
        console.log(id);
        let token = await AsyncStorage.getItem('@token');
        return fetch("http://localhost:3333/api/1.0.0/user/" + id, 
        {
          method: 'GET',
          headers: {
            'X-Authorization':  token,
          }
        })
        .then((response) => {
            if (response.status === 200)
            {
                return response.json();
            }
            else
            {
                throw 'error';
            }
        })
        .then(async (responseJson) => {
            this.setState({liked_reviews: responseJson.liked_reviews});
        })
        .catch((error) => {
            console.log(error);
            Alert.alert(error);
        })

    }

    IsLiked(rev_id)
    {
        let status = false;
        for (let i = 0; i < this.state.liked_reviews.length; i++) 
        {
            if (this.state.liked_reviews[i].review.review_id === rev_id)
            {
                status =  true
            }
        }
        return status;
    }

    managelikes(rev_id, loc_id)
    {
        if (this.IsLiked(rev_id)) 
        {
            this.RemoveLike(rev_id,loc_id);
        }
        else
        {
            this.Like(rev_id,loc_id);
        }
    }


    componentDidMount()
    {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getdata();
            this.Favourite();
            this.getLikedReviews();
        })
    }

    componentWillUnmount()
    {
        this.unsubscribe();
    }


    test()
    {
        console.log(this.state.location_id);
    }



    render()
    {

        return(

            <View> 

                <Text style = {styles.title}> {this.state.location_name} </Text>


       

                <Text style = {styles.formLabel2}>{this.state.location_town}</Text>

                <TouchableOpacity style = {styles.formTouchText} 
                onPress= {() => this.ManFavourite()}>

                    <Text style = {styles.formLabel}
                    color = {this.state.isFavourite === true ? 'red' : 'grey'}> Favourite </Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Add_Review', {location_id: this.state.location_id,})} >
                    <Text style = {styles.formLabel}> Add Review </Text>

                </TouchableOpacity>

                <Text style = {styles.title}> Reviews: </Text>

                <FlatList
                    style = {{height: '25%'}}
                    data = {this.state.location_reviews}
                    renderItem = {({item}) => (
                        <View> 
                            <Text style = {styles.formLabel2}> {''} 
                            {'\n'} Avergae quality rating: {item.quality_rating}</Text>
                            <Text style = {styles.formLabel2}>Avergae clenliness rating: {item.clenliness_rating}</Text>
                            <Text style = {styles.formLabel2}>Avergae price rating: {item.price_rating}</Text>
                            <Text style = {styles.formLabel2}>Avergae rating: {item.overall_rating}</Text>
                            <Text> {item.review_body} </Text>

                            <TouchableOpacity onPress={() => this.managelikes(item.review_id,this.state.location_id)} >
                                <Text style = {styles.formLabel} 
                                color = {this.IsLiked(item.review_id) === true ? 'red' : 'grey'} > Like </Text>
                            </TouchableOpacity>
                            <Text> Likes: {item.likes}</Text>


                        </View>
                    )}
                keyExtractor={(item) => item.review_id.toString()}
                />

            </View>




        )





    }





}


const styles = StyleSheet.create
({
    title: {
        color:'red',
        backgroundColor:'lightblue',
        padding:10,
        fontSize:25
    }, 
    formItem: {
        padding:10
    },
    formLabel: {
        fontSize:15,
    },
    formLabel2: {
        fontSize:15,
        color : 'red'
    },
    formInput: {
        borderWidth:1,
        borderColor:'red',
        borderRadius:5
    },
    formTouch:{
        backgroundColor:'lightblue',
        padding:10,
        alignItems:'center'
    },
    formTouchText:{
        fontSize:20,
        fontWeight:'bold',
        color:'red'
    }
})
export default Review_page;