import React, { Component, PropTypes } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';

const STYLE = StyleSheet.create({
	wrapper: {
		backgroundColor: '#edf1f2',
		padding: 12
	},
	field: {
		borderColor: '#cfdadd',
		borderWidth: 1,
		height: 40,
		fontSize: 18,
		backgroundColor: 'white',
		padding: 5
	},
});

class MessageField extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ''
		}
	}
	render() {
		const {onSubmit} = this.props;
		const {text} = this.state;


		return (<View style={[this.props.style, STYLE['wrapper']]}>
			<TextInput style={STYLE['field']}
					onSubmitEditing={() => onSubmit(text)}
					value={text}
					onChangeText={(text) => this.setState({text})}
			/>
		</View>)
	}
}

MessageField.defaultProps = {};
MessageField.propTypes = {};

export default MessageField;