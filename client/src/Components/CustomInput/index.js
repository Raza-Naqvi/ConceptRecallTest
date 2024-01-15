import { View, Text, TextInput } from 'react-native'
import React from 'react'

const CustomInput = ({
    value,
    setValue,
    marginVertical,
    width,
    padding,
    borderWidth,
    borderColor,
    borderRadius,
    placeholder,
    secure
}) => {
    return (
        <View>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                placeholderTextColor={'#000'}
                secureTextEntry={secure}
                style={{
                    marginVertical: marginVertical ? marginVertical : 0,
                    width: width ? width : '100%',
                    padding: padding ? padding : 0,
                    borderWidth: borderWidth ? borderWidth : 1,
                    borderColor: borderColor ? borderColor : '#000',
                    borderRadius: borderRadius ? borderRadius : 0,
                    color: '#000'
                }}
            />
        </View>
    )
}

export default CustomInput