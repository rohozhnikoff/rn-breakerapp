import React, { Component, PropTypes } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const STYLES = StyleSheet.create({
	'wrapper': {

	},
	'img': {

	}
});


function Icon(props) {
	const {uri, style, iconStyle, width, height} = props;

	const sizeStyles = {
		width: width || 20,
		height: height || 20,
	};
	const imgStyle = [STYLES['img'], iconStyle, sizeStyles];

	return <View style={[STYLES['wrapper'], style, sizeStyles]}>
		{uri ? <Image style={imgStyle} source={{uri: uri}} /> : null}
	</View>
}

export default Icon;