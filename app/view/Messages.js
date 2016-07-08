import React, { Component, PropTypes } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Message from './Message';

const STYLES = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: '#fff'
	},
	scroll: {
		flex: 1,
		padding: 12,
	},
});

class Messages extends React.Component {
	render() {
		const {messages} = this.props;

		return (<View style={[this.props.style, STYLES['wrapper']]}>
			<ScrollView style={STYLES['scroll']}>
				{messages.reverse().map((m) => <Message {...m.toJS()} key={m.get('id')} />)}
			</ScrollView>
		</View>)
	}
}

Messages.defaultProps = {};
Messages.propTypes = {};

export default Messages;