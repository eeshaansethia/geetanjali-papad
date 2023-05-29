import {
    Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    StatusBar,
} from 'react-native'
import React from 'react'
import Back from '../../assets/back.png'
import { useNavigation } from '@react-navigation/native'

const TopBar = (props) => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.wrapper}>
            <TouchableOpacity onPress={() => navigation.navigate(props.to)}>
                <Image source={Back} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.title}>{props.title}</Text>
            <Image source={Back} style={{ ...styles.icon, opacity: 0 }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#fff',
        shadowColor: '#111',
        shadowOffset: { width: 1, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
        width: '100%',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 10,
    },
    icon: {
        margin: 10,
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
})

export default TopBar