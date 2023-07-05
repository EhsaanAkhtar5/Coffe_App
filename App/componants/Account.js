import 'react-native-gesture-handler';

import React, { Component } from 'react';
import {view,ScrollView,Text,TextInput,TouchableOpacity,StyleSheet, View,Alert} from 'react-native';
import {Title} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TouchHistoryMath from 'react-native/Libraries/Interaction/TouchHistoryMath';



class Account extends Component {

    constructor(props)
  {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    }
  }





  getAccountInfo = async () => {
    const token = await AsyncStorage.getItem('@token');
    const user_id = await AsyncStorage.getItem('@id');
    return fetch("http://localhost:3333/api/1.0.0/user/"+user_id, {
      method: 'GET',
      headers: {
        'X-Authorization':  token
      }
    })
    .then( (response) => {
      if(response.status === 200){
        console.log(response);
        return response.json()
      }
      else if(response.status === 401){
        console.log("user not found")
      }
      else{
        throw 'Something went wrong'
      }
    })
    .then( (responseJson) => {
      this.setState({
        firstname: responseJson.first_name,
        lastname: responseJson.last_name,
        email: responseJson.email,
        password: responseJson.password
      })
      console.log(this.state);
      console.log(responseJson);
    })
    .catch((error) => {
      Alert.alert('Error');
      console.log(error);
  })
  }


  componentDidMount()
  {
    this.getAccountInfo();
  }

  Logout = async () => {
    let token = await AsyncStorage.getItem('@token');
    return fetch("http://localhost:3333/api/1.0.0/user/logout", {
      method: 'POST',
      headers: {
        'X-Authorization':  token
      }
    })
    .then((response) => {
      if (response.status === 200)
      {
        Alert.alert("You have Logged out");
        this.props.navigation.navigate('account')
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
      Alert.alert('Could not Log out')
      console.error(error);
    })

  }
  













    render()
    {
        return(

            <View>
                <ScrollView>

                    <Text style={styles.title}>Email</Text>
                

                    <View style={styles.formItem}>
                        <Title style={styles.title}>{this.state.firstname} {this.state.lastname}</Title>
                    </View>


                    <View style={styles.formItem}>
                        <Text style={styles.formLabel}>Email: {this.state.email}</Text>
                    </View>
                    
              <TouchableOpacity
              style={styles.formInput}
              onPress={() =>
                this.props.navigation.navigate('EditProfile', 
                {
                  first_name: this.state.first_name,
                  last_name: this.state.last_name,
                  email: this.state.email,
                  password: this.state.password,
                })
              }>
              <Text style={styles.formLabel}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.Logout()}
              style={styles.formInput}>
              <Text>Logout</Text>
            </TouchableOpacity>
             
                    
                </ScrollView>
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
    }
})

export default Account;