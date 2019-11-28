import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { getCountdownParts, formatDate } from '../resources/api';

export const EventCard = ({ event }) => {
	const { days, hours, minutes, seconds } = getCountdownParts(event.date);

	return (
		<View style={styles.card}>
			<View style={styles.cardHeader}>
				<Text style={styles.date}>{formatDate(event.date)}</Text>
				<Text style={styles.title}>{event.title}</Text>
			</View>

			<View style={styles.counterContainer}>
				<View style={styles.counter}>
					<Text style={styles.counterText}>{days}</Text>
					<Text style={styles.counterLabel}>days</Text>
				</View>

				<View style={styles.counter}>
					<Text style={styles.counterText}>{hours}</Text>
					<Text style={styles.counterLabel}>hours</Text>
				</View>

				<View style={styles.counter}>
					<Text style={styles.counterText}>{minutes}</Text>
					<Text style={styles.counterLabel}>minutes</Text>
				</View>

				<View style={styles.counter}>
					<Text style={styles.counterText}>{seconds}</Text>
					<Text style={styles.counterLabel}>seconds</Text>
				</View>
			</View>
		</View>
	);
};

EventCard.propTypes = {
	event : PropTypes.shape({
		title : PropTypes.string.isRequired,
		date  : PropTypes.instanceOf(Date)
	})
};

const styles = StyleSheet.create({
	card             : {
		backgroundColor : '#fff',
		flex            : 1,
		padding         : 10,
		paddingTop      : 10,
		paddingBottom   : 20,
		margin          : 10,
		marginBottom    : 5,
		marginTop       : 5
	},
	cardHeader       : {
		flex          : 1,
		flexDirection : 'row'
	},
	date             : {
		fontWeight : '200',
		fontSize   : 15,
		color      : '#147efb',
		width      : '30%',
		textAlign  : 'right'
	},
	title            : {
		fontSize   : 15,
		fontWeight : '300',
		marginLeft : 7,
		textAlign  : 'left'
	},
	counterContainer : {
		flex           : 1,
		flexDirection  : 'row',
		justifyContent : 'space-between',
		paddingLeft    : '5%',
		paddingRight   : '5%'
	},
	counter          : {
		width : '25%',
		flex  : 1
	},
	counterText      : {
		textAlign : 'center',
		fontSize  : 27
	},
	counterLabel     : {
		fontSize   : 13,
		fontWeight : '100',
		color      : '#000',
		textAlign  : 'center',
		paddingTop : 0
	}
});

export default EventCard;
