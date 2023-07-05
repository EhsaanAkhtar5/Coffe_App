import React, { Component } from 'react';
import {view,ScrollView,Text,TextInput,TouchableOpacity,StyleSheet, View} from 'react-native';


class Start extends Component 
{
    constructor(props)
    {
        super(props);

    }



    Review = ()=>
    {

    }


    Login = ()=> 
    {
       
    }




    render()
    {

        const navigation = this.props.navigation;


        return(
            <View> 
                <Text style={styles.title}>Coffee App</Text>

                <View style={styles.formItem}>
                        <TouchableOpacity
                        style = {styles.formTouch1}
                        onPress={() => navigation.navigate('Coffee_review')}
                        >
                            <Text style={styles.formLabel}>View reviews</Text>
                        </TouchableOpacity>
                        
                </View>
                    
                <View style={styles.formItem}>
                        <TouchableOpacity
                        style = {styles.formTouch1}
                        onPress={() => navigation.navigate('account')}
                        >
                            <Text style={styles.formLabel}>Login</Text>
                        </TouchableOpacity>
                        
                </View>
                    
                <View style={styles.formItem}>
                        <TouchableOpacity
                        style = {styles.formTouch1}
                        onPress={() => navigation.navigate('account')}
                        >
                            <Text style={styles.formLabel}>Create account</Text>
                        </TouchableOpacity>
                        
                </View>
                
            </View>
        )

    }

}


const styles = StyleSheet.create
({
    title: {
        color:'white',
        backgroundColor:'brown',
        padding:60,
        fontSize:80
    },
    formTouch1:{
        backgroundColor:'lightblue',
        padding:10,
    },
    formItem: {
        padding:10
    }
})
export default Start;