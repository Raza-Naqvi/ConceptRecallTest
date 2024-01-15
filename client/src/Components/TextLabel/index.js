import { View, Text } from 'react-native'
import React from 'react'

const TextLabel = ({
    label,
    fontSize,
    textDecorationLine
}) => {
    return (
        <View>
            <Text
                style={{
                    color: '#000',
                    fontSize: fontSize ? fontSize : 15,
                    textDecorationLine: textDecorationLine ? textDecorationLine : 'none'
                }}
            >
                {label}
            </Text>
        </View>
    )
}

export default TextLabel