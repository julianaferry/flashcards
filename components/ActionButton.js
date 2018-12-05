import React from 'react'
import { TouchableOpacity, Text } from 'react-native'


export default function ActionBtn ({ onPress, text, color, styles }) {
	return (
		<TouchableOpacity
      		style={[styles.iosBtn, {backgroundColor: color}]}
			onPress={onPress}>
			<Text style={styles.submitBtnText}>{text}</Text>
		</TouchableOpacity>
	)
}