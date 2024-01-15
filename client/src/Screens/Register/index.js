import { View, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import TextLabel from '../../Components/TextLabel'
import CustomInput from '../../Components/CustomInput'
import CustomButton from '../../Components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import { registerUser } from '../../Store/Actions/AuthFunctions'

const { width, height } = Dimensions.get('window');

const Register = () => {
    const nav = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pswd, setPswd] = useState('');
    const [con, setCon] = useState('');
    const [load, setLoad] = useState(false);

    const submit = () => {
        setLoad(true);
        if (email && pswd) {
            if (pswd == con) {
                let emailTrim = email.trim();
                let emaillower = emailTrim.toLowerCase();
                let emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (emailRegex.test(emaillower)) {
                    let form = {
                        name: name,
                        email: email,
                        password: pswd
                    };
                    registerUser(form, setLoad, nav);
                } else {
                    alert("Please enter correct email");
                    setLoad(false);
                };
            } else {
                alert("Password and Confirm Password are not same");
                setLoad(false);
            };
        } else {
            setLoad(false);
            alert("Enter Fields");
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
                        <TextLabel label={'Register'} fontSize={20} />
                        <CustomInput
                            value={name}
                            setValue={setName}
                            width={'100%'}
                            marginVertical={10}
                            placeholder={'Name'}
                            padding={10}
                            borderRadius={10}
                        />
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
                        <CustomInput
                            secure={true}
                            value={con}
                            setValue={setCon}
                            width={'100%'}
                            marginVertical={10}
                            placeholder={'Confirm Password'}
                            padding={10}
                            borderRadius={10}
                        />
                        <CustomButton
                            onPress={submit}
                            title={'SignUp'}
                            width={'70%'}
                        />
                        <TouchableOpacity
                            style={{ alignSelf: 'center', marginVertical: 15 }}
                            onPress={() => nav.navigate('Register')}
                        >
                            <TextLabel label={'Login'} fontSize={20} textDecorationLine={'underline'} />
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </ScrollView>
    )
}

export default Register