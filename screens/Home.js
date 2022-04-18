import React, { useEffect } from 'react';
import {
    FlatList, Image, StyleSheet,
    Text, View
} from 'react-native';
import { Card, FAB } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { contactEmpty } from '../assets/images';
import { getAllContact } from '../store/contactReducer/actions';

const Home = ({ navigation }) => {

    const dispatch = useDispatch()
    const { data, loading } = useSelector(state => state.contactReducer)

    const refreshData = () => {
        dispatch(getAllContact())
    }
    useEffect(() => {
        // fetchData()
        dispatch(getAllContact())
    }, [dispatch])

    useEffect(() => {
        if (loading) {
            dispatch(getAllContact())
        }
    }, [loading])


    const renderList = ((item) => {
        console.log(item)
        return (
            <Card style={styles.myCard} key={item.id} onPress={() => navigation.navigate("Profile", { item })}>
                <View style={styles.cardView}>
                    <Image
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 30
                        }}
                        source={(item.photo == 'N/A') ? contactEmpty : (item.photo.includes("://")) ? { uri: item.photo } : { uri: `data:image/gif;base64,${item.photo}` }}
                    />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.textTitle}>{item.firstName} {item.lastName}</Text>
                        <Text style={styles.textSubTitle} >Age : {item.age}</Text>
                    </View>
                </View>
            </Card>
        )
    })
    return (
        <View style={{ flex: 1 }}>
            {/* {
                loading ? (
                    <ActivityIndicator size="large" color="#009D54" style={{ padding: 10 }} />
                ) : */}
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return renderList(item)
                }}
                keyExtractor={item => `${item.id}`}
                onRefresh={() => { refreshData() }}
                refreshing={loading}
            />

            <FAB onPress={() => navigation.navigate("Create", { name: "Create New Contact" })}
                style={styles.fab}
                small={false}
                icon="plus"
                theme={{ colors: { accent: "#006aff" } }}
            />
        </View>

    )
}
const styles = StyleSheet.create({
    myCard: {
        margin: 5,
    },
    cardView: {
        flexDirection: 'row',
        padding: 6
    },
    textTitle: {
        fontSize: 18,
    },
    textSubTitle: {
        fontSize: 16,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },

})
export default Home;
