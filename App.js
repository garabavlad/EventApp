import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import EventList from './components/EventList';
import EventForm from './components/EventForm';

const MainNavigator = createStackNavigator({
	Home     : { screen: EventList },
	NewEvent : { screen: EventForm }
});

const App = createAppContainer(MainNavigator);

export default App;
