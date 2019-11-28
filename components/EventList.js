import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Button, TouchableOpacity, Text, View } from 'react-native';
import EventCard from './EventCard';
import db from '../resources/db.json';

import { getEvents } from '../resources/api';
// import ActionButton from 'react-native-action-button';

export default (EventList = (props) => {
	const [ events, setEvents ] = useState();
	const [ isIntervalFuncActive, setIsIntervalFuncActive ] = useState();

	const { navigate, addListener } = props.navigation;

	useEffect(() => {
		// addListener('didFocus', () => {
		getEvents().then((events) => setEvents(events));
		// });

		setIsIntervalFuncActive(1);
	}, []);

	// Makes the events timer interactive
	if (events && isIntervalFuncActive) {
		setInterval(() => {
			setEvents(
				events.map((evt) => ({
					...evt,
					timer : Date.now()
				}))
			);
		}, 1000);

		setIsIntervalFuncActive(0);
	}

	return [
		<FlatList
			key={'List'}
			style={styles.list}
			data={events}
			renderItem={({ item }) => <EventCard event={item} />}
			keyExtractor={(item) => item.id}
		/>,

		<View key={'Padding_Top'} style={{ backgroundColor: '#FFF', height: 8 }} />,

		<Button key={'Button'} title='Create A New Event' type='outline' onPress={() => navigate('NewEvent')} />,

		// <Button title='Remove An Event' color='#e42' />,

		<View key={'Padding_Bottom'} style={{ backgroundColor: '#FFF', height: 10 }} />
	];
});

EventList.navigationOptions = {
	title : 'Incoming Events'
};

const styles = StyleSheet.create({
	list : {
		flex            : 1,
		paddingTop      : 10,
		backgroundColor : '#f3f3f3'
	}
});
