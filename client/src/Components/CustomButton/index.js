import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({
    title,
    width,
    onPress,
    borderRadius
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: width ? width : '100%',
                borderWidth: 1,
                borderRadius: borderRadius ? borderRadius : 10,
                backgroundColor: '#000',
                padding: 15,
                marginVertical: 15,
                alignSelf: 'center'
            }}
        >
            <Text style={{ color: '#fff', alignSelf: 'center' }}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton