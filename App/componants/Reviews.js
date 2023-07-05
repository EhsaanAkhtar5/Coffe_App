import 'react-native-gesture-handler';

import React, { Component } from 'react';
import {view,ScrollView,Text,TextInput,TouchableOpacity,StyleSheet, View, SectionList,Image, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';







class Reviews extends Component {



    constructor(props)
    {
      super(props);
      this.state = {
        CoffeShops: [],
        Review: []
      }
    }

componentDidMount()
{
    this.getPosts();
}

 getPosts = async () => {
    const auth = await AsyncStorage.getItem('@token');
    const id = await AsyncStorage.getItem('@id');
  
    return fetch("http://localhost:3333/api/1.0.0/find", 
    {
      method: 'GET',
      headers: {
        'X-Authorization':  auth,
      }
    })
    .then( (response) => 
      {
        console.log(response);
        if(response.status === 200){
          return response.json();
        }
        else if(response.status === 400){
          alert('Bad request');
        }
        else
        {
          alert('something went wrong');
        }
    })
    .then( (responseJson) => {
        console.log(responseJson);
        this.setState({
          CoffeShops: responseJson,
          Review : responseJson.location_name
        })
        console.log(this.state.Review);
    })
    .catch((error) => {
        console.log(error)
    })
     
  }


  Logout()
  {

  }













    render()
    {
        const navigation = this.props.navigation;

        return(







            <View style={styles.container}>
                <ScrollView  style={styles.padding}> 

                    <FlatList
                    data={this.state.CoffeShops}
                    scrollEnabled
                    renderItem={({item}) => (
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('review_page', {
                    location_id: item.location_id}
                    )}>
                      <Text> {''} 
                      {'\n'}
                      {item.location_name}
                      </Text>
                    </TouchableOpacity>

                  <Text style = {styles.formLabel}> {item.location_town} </Text> 
                  <Text style = {styles.formLabel}> Rating: {item.avg_overall_rating} </Text>
                  <Image style = {styles.logo} source = {{url: item.photo_path}} />              
                </View>


                )}
                keyExtractor={(item,index) => item.location_id.toString()}
                />

                




                
               


                </ScrollView >                         
            </View>
            



            
        )


    }   
}


const styles = StyleSheet.create
({


    Shops:{
        width:400,
        height:200
    },


    container: {
        flex: 10,
        paddingTop: 22
       },
    sectionHeader: {
         paddingTop: 2,
         paddingLeft: 10,
         paddingRight: 10,
         paddingBottom: 2,
         fontSize: 14,
         fontWeight: 'bold',
         backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
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
        color:'red'
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
    },
    logo: {
        width:50,
        height:50
    }
    
})

export default Reviews;