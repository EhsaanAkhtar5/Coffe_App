
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import {view,ScrollView,Text,TextInput,TouchableOpacity,StyleSheet, View, Alert, FlatList} from 'react-native';







class Login extends Component {

    
    constructor(props)
    {
        super(props);

        this.state = {
            email: '',
            password:'',
            LoginData: ''
        }
    }




    Login = ()=> 
    {
        const foo = async (test,name) => name;
        const navigation = this.props.navigation;
        let to_send = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(to_send)
        return fetch("http://localhost:3333/api/1.0.0/user/login", {
            method: 'post',
            headers: {
                'content-Type' : 'application/json'
            },
            body: JSON.stringify(to_send)
        })
        .then((response) => 
        {
            if (response.status === 200)
            {
                return response.json()
            }
            else if (response.status === 400)
            {
                throw 'Invalid email / password';
            }
            else 
            {
                throw 'An unexpexted error has occurd'
            };
        })
        .then(async (responseJson) => 
            {
                await AsyncStorage.setItem('@token', responseJson.token);
                console.log(responseJson.token);
                await AsyncStorage.setItem('@id', responseJson.id);
                console.log(responseJson.id);
                navigation.navigate('Coffee_review');
            })
        .catch((error) => {
            console.log(error);
        })
    }

    render()
    {
        return(


            <View> 
                <ScrollView>
                    <Text style={styles.title}>Sign in</Text>
                
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
                        <TouchableOpacity
                        style = {styles.formTouch}
                        onPress={() => this.Login()}
                        >
                            <Text style={styles.formLabel}>Sign in</Text>
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

export default Login;