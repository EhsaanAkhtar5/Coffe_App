import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import {view,ScrollView,Text,TextInput,TouchableOpacity,StyleSheet, View, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class EditProfile extends Component {
    constructor(props)
    {
        super(props);

        this.state = {
            first_nameN: '',
            last_nameN: '',
            emailN: '',
            passwordN:'',
        }
    }

    Edit_profile = async () => {
        const {first_name, last_name, email, password} = this.props.route.params;
        let to_send = {};
    
        if (this.state.first_nameN != first_name) 
        {
          to_send['first_name'] = this.state.first_nameN;
        }
    
        if (this.state.last_nameN != last_name) 
        {
          to_send['last_name'] = this.state.last_nameN;
        }
    
        if (this.state.emailN != email) 
        {
          to_send['email'] = this.state.emailN;
        }
    
        if (this.state.passwordN != password) 
        {
          to_send['password'] = this.state.passwordN;
        }
    
        let token = await AsyncStorage.getItem('@token');
        let user_id = await AsyncStorage.getItem('@userID');
        console.log(to_send);
        return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + user_id, {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json', 'X-Authorization': token},
          body: JSON.stringify(to_send),
        }).then((response) => {
          if (response.status === 200) {
            Alert.alert('Information updated');
            console.log('Info Updated')
          } else if (response.status === 400) {
            console.error('Bad request');
          } else if (response.status === 401) {
            console.error('Unauthorised');
          } else if (response.status === 403) {
            console.error('Forbidden');
          } else if (response.status === 404) {
            console.error('Not found');
          } else if (response.status === 500) {
            console.error('Server error');
          } else {
            console.error('Error');
          }
        });
      };







render()
{
    return(



        

        <View> 
            <ScrollView>
                <Text style={styles.title}>Edit account</Text>

                <View style={styles.formItem}>
                    <Text style={styles.formLabel}>First Name:</Text>
                    <TextInput
                        placeholder="enter first name..."
                        style={styles.formInput}
                        onChangeText={(first_nameN) => this.setState({first_nameN})}
                        value={this.state.first_nameN}
                    />
                </View>

                <View style={styles.formItem}>
                    <Text style={styles.formLabel}>Last Name:</Text>
                    <TextInput
                        placeholder="enter last name..."
                        style={styles.formInput}
                        onChangeText={(last_nameN) => this.setState({last_nameN})}
                        value={this.state.last_nameN}
                    />
                </View>

                
                <View style={styles.formItem}>
                    <Text style={styles.formLabel}>Email:</Text>
                    <TextInput
                        placeholder="enter email..."
                        style={styles.formInput}
                        onChangeText={(emailN) => this.setState({emailN})}
                        value={this.state.emailN}
                    />
                </View>

                <View style={styles.formItem}>
                    <Text style={styles.formLabel}>Password:</Text>
                    <TextInput
                        placeholder="enter password..."
                        style={styles.formInput}
                        secureTextEntry
                        onChangeText={(passwordN) => this.setState({passwordN})}
                        value={this.state.passwordN}
                    />
                </View>

                <View style={styles.formItem}>
                    <Text style={styles.formLabel}>Confirm Password:</Text>
                    <TextInput
                        placeholder="enter password..."
                        style={styles.formInput}
                        secureTextEntry
                        onChangeText={(confirmPasswordN) => this.setState({confirmPasswordN})}
                        value={this.state.confirmPasswordN}
                    />
                </View>

                <View style={styles.formItem}>
                    <TouchableOpacity
                    style = {styles.formTouch}
                    onPress={() => { if (this.passwordN === this.confirmPasswordN)
                        {
                            this.Edit_profile()

                        }
                        else {
                            alert("Passwords need to match")
                        }}}
                        
                    >
                        <Text style={styles.formLabel}>Edit</Text>
                    </TouchableOpacity>
                    
                </View>

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

export default EditProfile;