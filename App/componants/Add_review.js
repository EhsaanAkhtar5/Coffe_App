import 'react-native-gesture-handler';

import React, { Component } from 'react';
import {view,ScrollView,Text,TextInput,TouchableOpacity,StyleSheet, View, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';






class Add_review extends Component {


    constructor(props)
    {
        super(props);

        this.state = {
            review_body: '',
            overall_rating: 1,
            price_rating: 1,
            quality_rating: 1,
            clenliness_rating: 1,
        };
    }


    addReview = async () => {

        let id = this.props.route.params.location_id;
        console.log(id);
        let token = await AsyncStorage.getItem('@token');
        return fetch("http://loacalhost:3333/api/1.0.0/location/" + id + "/review", {
            method: 'POST',
            headers: {
                'content-Type' : 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify({
                overall_rating: parseInt(this.state.overall_rating),
                price_rating: parseInt(this.state.price_rating),
                quality_rating: parseInt(this.state.quality_rating),
                clenliness_rating: parseInt(this.state.clenliness_rating),
                review_body: this.state.review_body,
              }),
        })
        .then((response) => {
            if (response.status === 201)
            {
                Alert.alert("Item added");
                console.log('review added')
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

        .then(async (responseJson) => {})

        .catch((error) => {
            console.log(error);
        })
    }


    render()
    {

        return(


            <View>






                <View>
                <Text> Overall rating </Text>
                <TextInput 
                placeholder="1-5"
                onChangeText={(overall_rating) => this.setState({overall_rating})}
                value={this.setState.overall_rating}
                style={StyleSheet.input} />
                </View>

                <View>
                <Text> Price rating </Text>
                <TextInput 
                placeholder="1-5"
                onChangeText={(price_rating) => this.setState({price_rating})}
                value={this.setState.price_rating}
                style={StyleSheet.input} />
                </View>


                <View>
                <Text> Quality rating </Text>
                <TextInput 
                placeholder="1-5"
                onChangeText={(quality_rating) => this.setState({quality_rating})}
                value={this.setState.quality_rating}
                style={StyleSheet.input} />
                </View>



                <View>
                <Text> Clenliness rating </Text>
                <TextInput 
                placeholder="1-5"
                onChangeText={(clenliness_rating) => this.setState({clenliness_rating})}
                value={this.setState.clenliness_rating}
                style={StyleSheet.input} />
                </View>



                <View>
                <Text> Review </Text>
                <TextInput 
                placeholder="Decription"
                onChangeText={(review_body) => this.setState({review_body})}
                value={this.setState.review_body}
                style={StyleSheet.input} />
                </View>



                <View style={styles.formItem}>
                    <TouchableOpacity
                    style = {styles.formTouch}
                    onPress={() => this.addReview()}
                    >
                    <Text style={styles.formLabel}>Add review</Text>
                    </TouchableOpacity>
                        
                    </View>
            

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
    input:{
        margin: 20,
        borderColor: 'black',
        borderWidth: 5
    },
    formTouchText:{
        fontSize:20,
        fontWeight:'bold',
        color:'red'
    }
})


export default Add_review;