import React, { useState, useEffect, useContext } from 'react';
import { Alert, Animated, KeyboardAvoidingView, Modal, PermissionsAndroid, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from "react-native-image-picker";
import { Avatar, Button, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { contactEmpty } from '../assets/images';
import { createDataContact, updateDataContact } from '../store/contactReducer/actions';
import { myContext } from '../App';

const CreateContact = ({ navigation, route }) => {

    // const dispatch = useDispatch()
    const { state, dispatch } = useContext(myContext)
    const { data, loading } = state

    const [modal, setModal] = useState(false);
    const [enableShift, setEnableShift] = useState(false);
    const [keteranganValidFile, setKeteranganValidFile] = useState('');
    const [isValidFile, setIsValidFile] = useState(true);
    const [isValidFirstName, setIsValidFirstName] = useState(true);
    const [keteranganValidFirstName, setKeteranganValidFirstName] = useState('');
    const [keteranganValidLastName, setKeteranganValidLastName] = useState('');
    const [keteranganValidAge, setKeteranganValidAge] = useState('');
    const [isValidLastName, setIsValidLastName] = useState(true);
    const [isValidAge, setIsValidAge] = useState(true);

    // PERMISSION CAMERA
    useEffect(() => {
        if (Platform.OS === 'android') {
            requestCameraPermission();
        }
    }, []);
    const requestCameraPermission = async () => {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ])
            .then(result => {
                if (
                    result['android.permission.READ_EXTERNAL_STORAGE'] === 'granted' &&
                    result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted' &&
                    result['android.permission.CAMERA'] === 'granted'
                ) {
                } else {
                    alert(
                        'Fungsi aplikasi mungkin tidak berjalan semestinya, ada permision yang tidak diberikan',
                    );
                }
            })
            .catch(err => {
                alert(
                    'Fungsi aplikasi mungkin tidak berjalan semestinya, ada permision yang tidak diberikan',
                );
            });
    };
    //   TUTUP PERMISSION CAMERA

    // IF  UPDATE 
    const getDetails = (type) => {
        if (route.params.id) {
            switch (type) {
                case "id":
                    return route.params.id
                case "firstName":
                    return route.params.firstName
                case "lastName":
                    return route.params.lastName
                case "photo":
                    return route.params.photo
                case "age":
                    return route.params.age
            }
        }
        return ""
    }
    const paramsId = getDetails("id");

    //CLOSE UPDATE 

    let dataDefault = {
        firstName: (getDetails("firstName") === 'undefined') ? '' : getDetails("firstName"),
        lastName: (getDetails("lastName") === 'undefined') ? '' : getDetails("lastName"),
        photo: (getDetails("photo") === 'undefined') ? '' : getDetails("photo"),
        age: (getDetails("age") === 'undefined') ? 0 : getDetails("age"),
    }
    const [initialValue, setInitialValue] = useState(dataDefault)

    const openCameraWithPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'App Camera Permission',
                    message: 'App needs access to your camera ',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                ImagePicker.launchCamera(
                    {
                        mediaType: 'photo',
                        includeBase64: false,
                        maxHeight: 200,
                        maxWidth: 200,
                    },
                    (response) => {
                        if (!response.didCancel) {
                            let data = response.assets[0];
                            if (data) {
                                // let file = {
                                //     uri: data.uri,
                                //     type: data.type,
                                //     name: data.fileName
                                // }
                                setInitialValue(p => ({ ...p, photo: data.base64 }))
                                setModal(false)
                            }
                        }
                    },
                );
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };
    const openGalleryWithPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'App Camera Permission',
                    message: 'App needs access to your camera ',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                ImagePicker.launchImageLibrary(
                    {
                        mediaType: 'photo',
                        includeBase64: true,
                        maxHeight: 200,
                        maxWidth: 200,
                    },
                    (response) => {
                        // console.log(response)
                        if (!response.didCancel) {
                            let data = response.assets[0];
                            if (data) {
                                // let file = {
                                //     uri: data.uri,
                                //     type: data.type,
                                //     name: data.fileName
                                // }
                                // console.log(data.base64)
                                // handleUpload(file);
                                setInitialValue(p => ({ ...p, photo: data.base64 }))
                                setModal(false)
                            }
                        }
                    },
                );
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const submitData = () => {
        createDataContact(initialValue, (param) => callBack(param), dispatch)
    }
    const updateData = () => {
        updateDataContact(paramsId, initialValue, (param) => callBack(param), dispatch)
    }
    const callBack = ({ status, pesan }) => {
        if (status) {
            Alert.alert("Informasi!!!", pesan)
            navigation.navigate('Home');
        } else {
            Alert.alert("Peringatan!!!", pesan)
        }
    };

    const handleValidFirstName = (val) => {
        if (val.length < 1) {
            setIsValidFirstName(false)
            setKeteranganValidFirstName("firstName is not allowed to be empty")
        } else if (val.match(/^.+\s.+$/)) {
            setIsValidFirstName(false)
            setKeteranganValidFirstName("firstName must only contain alpha-numeric character")
        } else if (val.trim().length >= 3) {
            setIsValidFirstName(true)
        } else {
            setIsValidFirstName(false)
            setKeteranganValidFirstName("length firstName must be at least 3 characters long")
        }
    }
    const handleValidLastName = (val) => {
        if (val.length < 1) {
            setIsValidLastName(false)
            setKeteranganValidLastName("lastName is not allowed to be empty")
        } else if (val.match(/^.+\s.+$/)) {
            setIsValidLastName(false)
            setKeteranganValidLastName("lastName must only contain alpha-numeric character")
        } else if (val.trim().length >= 3) {
            setIsValidLastName(true)
        } else {
            setIsValidLastName(false)
            setKeteranganValidLastName("length lastName must be at least 3 characters long")
        }
    }
    const handleValidAge = (val) => {
        if (val.length < 1) {
            setIsValidAge(false)
            setKeteranganValidAge("age is not allowed to be empty")
        } else if (isNaN(val)) {
            setIsValidAge(false)
            setKeteranganValidAge("age must only contain alpha-numeric character")
        } else if (val < 200) {
            setIsValidAge(true)
        } else {
            setIsValidAge(false)
            setKeteranganValidAge("age must be less than or equal to 200")
        }
    }
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.root} enabled={enableShift}>
            <View >
                <View style={styles.uploadImage}>
                    <Avatar.Image
                        size={150}
                        source={(initialValue.photo == 'N/A' || initialValue.photo === "") ? contactEmpty : (initialValue.photo.includes("://")) ? { uri: initialValue.photo } : { uri: `data:image/gif;base64,${initialValue.photo}` }}

                    />
                    {isValidFile ? null :
                        <Animated.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>{keteranganValidFile}</Text>
                        </Animated.View>}
                    <Button
                        style={styles.inputStyle}
                        theme={theme}
                        icon={initialValue.photo == "" ? "upload" : "check"}
                        mode="contained"
                        onPress={() => setModal(true)}>
                        Upload Image
                    </Button>
                </View>
                {isValidFirstName ? null :
                    <Animated.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>{keteranganValidFirstName}</Text>
                    </Animated.View>}
                <TextInput
                    label="First Name"
                    value={initialValue.firstName}
                    style={styles.inputStyle}
                    onFocus={() => setEnableShift(true)}
                    mode="outlined"
                    theme={theme}
                    onEndEditing={(e) => handleValidFirstName(e.nativeEvent.text)}
                    onChangeText={(text) => setInitialValue(p => ({ ...p, firstName: text }))}
                />

                {isValidLastName ? null :
                    <Animated.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>{keteranganValidLastName}</Text>
                    </Animated.View>}

                <TextInput
                    label="Last Name"
                    value={initialValue.lastName}
                    style={styles.inputStyle}
                    mode="outlined"
                    onFocus={() => setEnableShift(true)}
                    theme={theme}
                    onEndEditing={(e) => handleValidLastName(e.nativeEvent.text)}
                    onChangeText={(text) => setInitialValue(p => ({ ...p, lastName: text }))}
                />

                {isValidAge ? null :
                    <Animated.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>{keteranganValidAge}</Text>
                    </Animated.View>}

                <TextInput
                    label="Age"
                    maxLength={200}
                    value={initialValue.age.toString()}
                    style={styles.inputStyle}
                    keyboardType="phone-pad"
                    mode="outlined"
                    onFocus={() => setEnableShift(true)}
                    theme={theme}
                    onEndEditing={(e) => handleValidAge(e.nativeEvent.text)}
                    onChangeText={(numeric) => setInitialValue(p => ({ ...p, age: numeric }))}
                />

                {route.params.id ?
                    <Button
                        style={styles.inputStyle}
                        theme={theme}
                        icon="content-save"
                        mode="contained"
                        onPress={() => updateData()}>
                        Update Contact
                    </Button>
                    :
                    <Button
                        style={styles.inputStyle}
                        theme={theme}
                        icon="content-save"
                        mode="contained"
                        onPress={() => submitData()}>
                        Save
                    </Button>
                }

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    onRequestClose={() => {
                        setModal(false)
                    }}
                >
                    <View style={styles.modalView}>
                        <View style={styles.modalButtonView}>
                            <Button
                                icon="camera"
                                theme={theme}
                                mode="contained"
                                // onPress={() => setModal(false)}>
                                onPress={() => openCameraWithPermission()}>
                                camera
                            </Button>

                            <Button
                                theme={theme}
                                icon="image-area"
                                mode="contained"
                                onPress={() => openGalleryWithPermission()}>
                                gallery
                            </Button>
                        </View>
                        <Button
                            theme={theme}
                            onPress={() => setModal(false)}>
                            Cancel
                        </Button>
                    </View>
                </Modal>


            </View>
        </KeyboardAvoidingView>
    );
}

const theme = {
    colors: {
        primary: "#006aff"
    }
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    errorMsg: {
        color: 'red',
        margin: 5

    },
    uploadImage: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    inputStyle: {
        margin: 5
    },
    modalButtonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    modalView: {
        position: "absolute",
        bottom: 2,
        width: "100%",
        backgroundColor: "white"
    }
})
export default CreateContact;