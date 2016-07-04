import React, { Component, PropTypes } from 'react';
import { Text, View, StyleSheet } from 'react-native';


const STYLE = StyleSheet.create({
	wrapper: {
		backgroundColor: '#3a3f51', padding: 12, paddingTop: 28
	},
	title: {
		color: '#eaebed', fontSize: 22
	}
});

class Header extends React.Component {
	render() {
		const {connected} = this.props;
		return (<View style={[this.props.style, STYLE['wrapper']]}>
			<Text style={STYLE['title']}>{`#${this.props.roomName}`}
				<Text style={{fontSize: 15, color: connected ? 'green' : 'gray'}}>({connected ? 'online' : 'offline'})</Text>
			</Text>
		</View>)
	}
}

Header.defaultProps = {};
Header.propTypes = {
	roomName: PropTypes.string
};

export default Header;