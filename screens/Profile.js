import React, { useState, useContext } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Modal, Title } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { contactEmpty } from '../assets/images';
import { deleteContact } from '../store/contactReducer/actions';
import { myContext } from '../App';


const Profile = (props, { navigation }) => {
    // const dispatch = useDispatch()
    // const { state, dispatch } = useContext(myContext)
    const { state, dispatch } = useContext(myContext)
    const { data, loading } = state

    const [modalHapusVisible, setModalHapusVisible] = useState(false);

    const { id, firstName, lastName, photo, age } = props.route.params.item;

    const showModal = () => {
        setModalHapusVisible(true);
    }
    const hideModal = () => {
        setModalHapusVisible(false);
    }
    const handleDelete = () => {
        setModalHapusVisible(true);
    }
    const handleProcessDelete = () => {
        setModalHapusVisible(false);
        deleteContact(id, status => callBackDelete(status), dispatch);
    }
    const callBackDelete = ({ status, pesan }) => {
        if (status) {
            Alert.alert("Informasi!!!", pesan)
            navigation.navigate('Home');
        } else {
            Alert.alert("Peringatan!!!", pesan)
        }
    };
    return (
        <View style={styles.root}>
            <LinearGradient
                colors={["#00affa", "#a2e0fa"]}
                style={{ height: "20%" }}
            />
            <View style={{ alignItems: 'center' }}>
                <Image
                    style={{ width: 140, height: 140, borderRadius: 140 / 2, marginTop: -50 }}
                    source={(photo == 'N/A') ? contactEmpty : (photo.includes("://")) ? { uri: photo } : { uri: `data:image/gif;base64,${photo}` }}

                />
            </View>

            <View style={{ alignItems: 'center', margin: 7 }}>
                <Title>{firstName} {lastName}</Title>
                <Text style={{ fontSize: 15 }}>Age {age}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 5 }}>
                <Button
                    style={styles.inputStyle}
                    theme={theme}
                    icon="account-edit"
                    mode="contained"
                    onPress={() => {
                        // const age = Number.toString(age);
                        props.navigation.navigate('Create',
                            { id, firstName, lastName, photo, age, name: "Update Contact" }
                        )
                    }}
                >
                    Edit
                </Button>
                <Button
                    style={styles.inputStyle}
                    theme={theme}
                    icon="delete"
                    mode="contained"
                    onPress={() => showModal()}>
                    Delete Contact
                </Button>
            </View>
            <Modal visible={modalHapusVisible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}>
                <Text style={styles.modalText}>Are you sure want to delete this contact ???</Text>
                <View style={styles.modalBtn}>
                    <Button mode="contained" onPress={() => hideModal()}>
                        Cancel
                    </Button>
                    <Button mode="contained" onPress={() => handleProcessDelete()}>
                        Yes
                    </Button>
                </View>
            </Modal>
        </View >
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
    myCard: {
        margin: 3
    },
    cardContent: {
        flexDirection: 'row',
        padding: 8
    },
    myText: {
        fontSize: 18,
        marginTop: 3,
        marginLeft: 5
    },
    modalBtn: {
        padding: 20,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between'
    },
    modalText: {
        fontSize: 20,
        textAlign: 'center'
    }
})

export default Profile