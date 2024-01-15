import { View, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import TextLabel from '../../Components/TextLabel';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { LoginUserApi } from '../../Store/Actions/AuthFunctions';
import { useDispatch } from 'react-redux';

const { width, height } = Dimensions.get('window');

const Login = () => {
    const nav = useNavigation();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [pswd, setPswd] = useState('');
    const [load, setLoad] = useState(false);

    const login = () => {
        setLoad(true);
        if (email && pswd) {
            let emailTrim = email.trim().toLowerCase();
            let emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (emailRegex.test(emailTrim)) {
                let data = {
                    email: emailTrim,
                    password: pswd
                };
                LoginUserApi(data, dispatch, setLoad);
            } else {
                alert("Please enter correct email");
                setLoad(false);
            }
        } else {
            alert("Please enter all fields");
            setLoad(false);
        };
    };

    return (
        <ScrollView
            contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            style={{ backgroundColor: '#fff', width: width, height: height }}
        >
            <View style={{ width: "95%", alignSelf: 'center' }}>
                {load ? (
                    <View>
                        <ActivityIndicator size={'large'} color={'#000'} />
                    </View>
                ) : (
                    <>
                        <TextLabel label={'Login'} fontSize={20} />
                        <CustomInput
                            value={email}
                            setValue={setEmail}
                            width={'100%'}
                            marginVertical={10}
                            placeholder={'Email'}
                            padding={10}
                            borderRadius={10}
                        />
                        <CustomInput
                            value={pswd}
                            setValue={setPswd}
                            width={'100%'}
                            marginVertical={10}
                            placeholder={'Password'}
                            padding={10}
                            borderRadius={10}
                            secure={true}
                        />
                        <CustomButton
                            title={'Login'}
                            width={'70%'}
                            onPress={login}
                        />
                        <TouchableOpacity
                            style={{ alignSelf: 'center', marginVertical: 15 }}
                            onPress={() => nav.navigate('Register')}
                        >
                            <TextLabel label={'SignUp'} fontSize={20} textDecorationLine={'underline'} />
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </ScrollView>
    )
}

export default Login