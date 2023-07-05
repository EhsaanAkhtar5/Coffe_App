
import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import {view,ScrollView,Text,TextInput,TouchableOpacity,StyleSheet, View, Alert} from 'react-native';

class Create_Account extends Component {
    constructor(props)
    {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password:'',
        }
    }




    signUp = ()=> 
    {
        let to_send = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
        };

        const navigation = this.props.navigation;

        return fetch("http://localhost:3333/api/1.0.0/user", {
            method: 'POST',
            headers: {
                'content-Type' : 'application/json'
            },
            body: JSON.stringify(to_send)
        })
        .then((response) => 
        {
            if(response.status === 201)
            {
                alert("Account Created returning to login page");
                navigation.navigate('home')
            }
            else if(response.status === 400)
            {
                console.log('400 error Sign up')
                throw 'Unable to create account';
            }
            else
            {
                throw 'An unexpected error has occured';
            }
            
        })
        .catch((error) =>
        {
            console.log(error)
        })
    }

    render()
    {
        return(



            

            <View> 
                <ScrollView>
                    <Text style={styles.title}>Create an account</Text>

                    <View style={styles.formItem}>
                        <Text style={styles.formLabel}>First Name:</Text>
                        <TextInput
                            placeholder="enter first name..."
                            style={styles.formInput}
                            onChangeText={(first_name) => this.setState({first_name})}
                            value={this.state.first_name}
                        />
                    </View>

                    <View style={styles.formItem}>
                        <Text style={styles.formLabel}>Last Name:</Text>
                        <TextInput
                            placeholder="enter last name..."
                            style={styles.formInput}
                            onChangeText={(last_name) => this.setState({last_name})}
                            value={this.state.last_name}
                        />
                    </View>

                    
                    <View style={styles.formItem}>
                        <Text style={styles.formLabel}>Email:</Text>
                        <TextInput
                            placeholder="enter email..."
                            style={styles.formInput}
                            onChangeText={(email) => this.setState({email})}
                            value={this.state.email}
                        />
                    </View>

                    <View style={styles.formItem}>
                        <Text style={styles.formLabel}>Password:</Text>
                        <TextInput
                            placeholder="enter password..."
                            style={styles.formInput}
                            secureTextEntry
                            onChangeText={(password) => this.setState({password})}
                            value={this.state.password}
                        />
                    </View>

                    <View style={styles.formItem}>
                        <Text style={styles.formLabel}>Confirm Password:</Text>
                        <TextInput
                            placeholder="enter password..."
                            style={styles.formInput}
                            secureTextEntry
                            onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                            value={this.state.confirmPassword}
                        />
                    </View>

                    <View style={styles.formItem}>
                        <TouchableOpacity
                        style = {styles.formTouch}
                        onPress={() => { if (this.password === this.confirmPassword)
                            {
                                this.signUp()

                            }
                            else {
                                alert("Passwords need to match")
                            }}}
                            
                        >
                            <Text style={styles.formLabel}>Sign Up</Text>
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

export default Create_Account;