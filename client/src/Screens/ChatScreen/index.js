import { View, Text, Dimensions, FlatList } from 'react-native'
import React, { useState } from 'react'
import TextLabel from '../../Components/TextLabel';

const { width, height } = Dimensions.get('window');

const ChatScreen = ({ route }) => {
    const { name } = route.params;
    const [msg, setMsg] = useState([]);

    return (
        <View style={{ width: width, height: height }}>
            <View style={{
                height: 70,
                width: '95%',
                alignSelf: 'center',
                justifyContent: 'center',
            }}>
                <TextLabel label={name} fontSize={25} />
            </View>
            {/* <FlatList
                data={msg}
            /> */}
        </View>
    )
}

export default ChatScreen