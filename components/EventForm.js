import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TextInput, StyleSheet, DatePickerIOS } from 'react-native';
import { formatDateTime } from '../resources/api';
import { sendEvent } from '../resources/api';

export class EventForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title      : '',
			chosenDate : new Date()
		};

		this.setDate = this.setDate.bind(this);
	}

	onAddPress = () => {
		sendEvent(this.state.title, this.state.chosenDate);

		this.props.navigation.navigate('Home');
	};

	static navigationOptions = {
		title : 'New Event'
	};

	setDate(newDate) {
		this.setState({ chosenDate: newDate });
	}

	onChangeTitle = (text) => {
		this.setState({ title: text });
	};

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
				<View style={styles.fieldContainer}>
					<TextInput
						style={styles.textInput}
						placeholder='Event Title'
						onChangeText={this.onChangeTitle}
						value={this.state.title}
					/>
					<TextInput
						style={[ styles.textInput, styles.datePicker ]}
						placeholder='Pick A Date'
						spellCheck={false}
						onChangeText={this.onChangeTitle}
						value={formatDateTime(this.state.chosenDate.toString())}
						editable={!this.state.showDatePicker}
						onFocus={this.onDatePress}
					/>
					<DatePickerIOS
						date={this.state.chosenDate}
						onDateChange={this.setDate}
						minuteInterval={10}
						mode='datetime'
					/>
				</View>
				<TouchableHighlight onPress={this.onAddPress} style={styles.addButton}>
					<Text style={styles.addButtonText}>Add Event</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	fieldContainer : {
		marginBottom    : 20,
		marginTop       : 20,
		backgroundColor : '#FFF'
	},
	textInput      : {
		height      : 40,
		margin      : 0,
		marginRight : 7,
		paddingLeft : 10
	},
	addButton      : {
		height          : 50,
		backgroundColor : '#FFF',
		// borderColor:'',
		alignSelf       : 'stretch',
		margin          : 10,
		justifyContent  : 'center',
		alignItems      : 'center',
		borderRadius    : 5
	},
	addButtonText  : {
		fontSize : 18,
		color    : '#147efb'
	},
	datePicker     : {
		borderColor    : '#edeeef',
		borderTopWidth : 0.5
	}
});

export default EventForm;
