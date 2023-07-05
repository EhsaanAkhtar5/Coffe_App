import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


import Create_Account from './componants/Create_Account';
import Start from './componants/Start';
import Login from './componants/Login';
import Reviews from './componants/Reviews';
import Add_review from './componants/Add_review';
import View_Account from './componants/Account';
import Review_page from './componants/Review_page'
import Edit_profile from './componants/Edit_profile'


import { color } from 'react-native-reanimated';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



function Account() {
	return(
	<Tab.Navigator
	/*screenOptions={({route}) => ({
		tabBarIcon: ({focused, color, size}) => {
			let iconName;

			if (route.name ==='Login') {
				iconName = focused
				? 'ios-information-circle'
				: 'ios-information-circle-outline';
			}
			else if (route.name === 'Create account') {
				iconName = focused ? 'ios-list-box' : 'ios-list';
			}

			return <Ionicons name={iconName} size={size} color ={color} />;

		},
	})}

	tabBarOptions={{
		activeTintColor: 'tomato',
		inactiveTintColor: 'gray',
	}} */
	>
        
	<Tab.Screen name="Login" component ={Login} />
	<Tab.Screen name="Create account" component = {Create_Account} />
	
	</Tab.Navigator>
	);
	
}


function Coffee_review() {
	return(
		<Tab.Navigator>
			<Tab.Screen name='reviews' component={Reviews} />
			<Tab.Screen name='View account' component={View_Account} />
		</Tab.Navigator>
	)
}







class App extends Component
{
    render()
	{
     return(
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="home" component={Start} options={ {headerShown:false}}/>
				<Stack.Screen name="account" component={Account} options={ {headerShown:false}}/>
				<Stack.Screen name="Coffee_review" component={Coffee_review} options={ {headerShown:false}}/>
				<Stack.Screen name="review_page" component={Review_page} options={ {headerShown:false}}/>
				<Stack.Screen name="Add_Review" component={Add_review} options={ {headerShown:false}}/>
				<Stack.Screen name="EditProfile" component={Edit_profile} options={ {headerShown:false}}/>
			</Stack.Navigator>


		</NavigationContainer>


		
		
		);
    }


}

export default App;
