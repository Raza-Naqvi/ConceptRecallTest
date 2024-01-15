import { ActivityIndicator, Alert, Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../CustomInput';
import CustomButton from '../CustomButton';
import { useNavigation } from '@react-navigation/native';
import { CreateGroup } from '../../Store/Actions/AuthFunctions';
import TextLabel from '../TextLabel';

const CreateGroupModal = ({
    modalVisible,
    setModalVisible,
    token,
}) => {
    const nav = useNavigation();
    const [name, setName] = useState('');
    const [load1, setLoad1] = useState(false);

    const create = () => {
        setLoad1(true);
        if (name) {
            const data = {
                groupName: name
            };
            CreateGroup(data, setLoad1, nav, token, setModalVisible);
        } else {
            setLoad1(false);
            Alert.alert("Enter a group name");
        };
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            {load1 ? (
                <TextLabel label={'wait'} />
            ) : (
                <>
                    <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <CustomInput
                                    placeholder={'GroupName'}
                                    value={name}
                                    setValue={setName}
                                    width={'100%'}
                                    padding={10}
                                />
                                <View style={{ marginVertical: 10 }} />
                                <CustomButton
                                    title={'Create'}
                                    onPress={create}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </>
            )}
        </Modal>
    )
}

export default CreateGroupModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%'
    },
})