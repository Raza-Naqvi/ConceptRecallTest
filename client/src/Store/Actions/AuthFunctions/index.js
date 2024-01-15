import { Alert } from "react-native";
import API from "../../../Constants/API";
import { LoginUser, TokenId, UserDetail } from "../../Reducers/AuthReducer/AuthReducer";

const registerUser = async (form, setLoad, navigation) => {
    await API.post(`auth/signUp`, form, {
        headers: {
            Accept: 'application/json',
        }
    }).then(e => {
        if (!e?.data?.success) {
            setLoad(false);
            alert(e?.data?.data?.errorResult);
        } else {
            alert("Account created successfully");
            setLoad(false);
            navigation.navigate("Login");
        };
    }).catch(err => {
        // console.log("registerUser Error", err?.response?.data);
        console.log("registerUser Error", err);
        setLoad(false);
    });
};

const LoginUserApi = async (data, dispatch, setLoad) => {
    await API.post(`auth/signIn`, data)
        .then(e => {
            if (e?.data?.success == true) {
                dispatch(LoginUser(true));
                dispatch(TokenId(e?.data?.data?.successResult?.token));
                dispatch(UserDetail(e?.data?.data?.successResult?.user));
                setLoad(false);
            };
            if (e?.data?.data?.errorResult == "incorrect password") {
                alert("Please enter correct password");
                setLoad(false);
            };
            if (e?.data?.data?.errorResult == "no user found with this email!") {
                alert("No user found with this email!");
                setLoad(false);
            };
        })
        .catch(err => {
            console.log("LoginUSer error", err);
            setLoad(false);
        });
};

const CreateGroup = async (data, setLoad, nav, token, setModalVisible) => {
    await API.post(`myChat/newChat`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(e => {
            setLoad(false);
            if (e.data.success) {
                setModalVisible(false);
                nav.navigate('ChatScreen', { name: e.data.data.successResult.groupName });
            } else {
                Alert.alert('Try a unique group name')
            };
        })
        .catch(err => {
            console.log("CreateGroup error", err);
            setLoad(false);
        });
};

const getMyChats = async (setChats, setLoad, token) => {
    await API.get('myChat/myChats', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(e => {
        setLoad(false);
        if (e.data.success) {
            setChats(e.data.data.successResult);
        };
    }).catch(err => {
        console.log('getMyChats err', err);
    });
};

export {
    getMyChats,
    CreateGroup,
    registerUser,
    LoginUserApi,
};