import React, { Component, PropTypes } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const STYLES = StyleSheet.create({
	'wrapper': {

	},
	'img': {

	}
});

const makeUriWithDomain = (uri) => {
	if (uri.indexOf('http') === 0) {
		return uri
	}
	return ['http://breakerapp.com', uri].join(
			uri.indexOf('/') === 0 ? '' : '/'
	)
};


function Icon(props) {
	const {uri, style, iconStyle, width, height} = props;

	const sizeStyles = {
		width: width || 20,
		height: height || 20,
	};
	const imgStyle = [STYLES['img'], iconStyle, sizeStyles];
	console.log(987, uri);

	return <View style={[STYLES['wrapper'], style, sizeStyles]}>
		{uri ? <Image style={imgStyle} source={{uri: makeUriWithDomain(uri)}} /> : null}
	</View>
}

export default Icon;