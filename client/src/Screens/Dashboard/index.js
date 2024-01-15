import { View, Dimensions, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TextLabel from '../../Components/TextLabel';
import CreateGroupModal from '../../Components/CreateGroupModal';
import socket from '../../../socket';
import { getMyChats } from '../../Store/Actions/AuthFunctions';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Dashboard = () => {
    const { user, token } = useSelector(state => ({
        user: state.AuthReducer.UserDetail,
        token: state.AuthReducer.TokenId,
    }));
    const nav = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [chats, setChats] = useState([]);
    const [load, setLoad] = useState(false)

    const getChat = () => {
        getMyChats(setChats, setLoad, token);
    };

    useEffect(() => {
        getChat();
    }, [0]);

    useEffect(() => {
        socket.emit("setup", user?._id);
        socket.on("connection", () => {
            console.log('Connected to socket.io');
        });
    }, [0]);

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ padding: 15, backgroundColor: "red" }}
                onPress={() => nav.navigate('ChatScreen', { name: item?.groupName })}>
                <TextLabel label={item?.groupName} />
            </TouchableOpacity>
        );
    };

    const sep = () => {
        return (
            <View style={{
                marginVertical: 5,
                borderBottomWidth: 1,
                borderColor: '#000'
            }} />
        );
    };

    return (
        <View style={{ width: width, height: height, backgroundColor: '#fff' }}>
            <View style={{
                width: '95%',
                alignSelf: 'center',
                height: 70,
                borderBottomWidth: 1,
                borderColor: '#000',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <TextLabel label={`Welcome ${user.name}`} fontSize={25} />
                <TouchableOpacity style={{ padding: 10 }} onPress={() => setModalVisible(!modalVisible)}>
                    <TextLabel label={`New chat`} fontSize={25} />
                </TouchableOpacity>
            </View>
            {load ? (
                <View>
                    <ActivityIndicator size={'large'} color={'#000'} />
                </View>
            ) : (
                <FlatList
                    data={chats}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    ItemSeparatorComponent={sep}
                    ListFooterComponent={sep}
                    style={{
                        width: '95%',
                        alignSelf: 'center',
                    }}
                />
            )}
            <CreateGroupModal modalVisible={modalVisible} setModalVisible={setModalVisible} token={token} />
        </View>
    )
}

export default Dashboard