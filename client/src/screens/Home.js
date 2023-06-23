import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import TopBar from '../components/topBar'
import commonStyles from '../common/commonCss'
import Logo from '../../assets/logo.png'
import Axios from 'axios'

const Home = ({ navigation }) => {

    const pricingRoute = async () => {
        await Axios.get('https://geetanjalipapad.azurewebsites.net/papadDetails/check')
            .then(({ data }) => {
                if (data.status === 200) {
                    navigation.navigate('PapadList')
                }
            }).catch((err) => {
                Alert.alert(
                    'Error',
                    'Something went wrong. Check your internet connection or contact your son.',
                    [
                        { text: 'OK', style: 'cancel' },
                    ]
                )
            })
    }
    return (
        <SafeAreaView style={commonStyles.mainContainerTop}>
            <View style={styles.container}>
                <View>
                    <Image source={Logo} style={styles.logo} />
                    <Text style={styles.title}>A Brand by Jai Gurudev Food Products</Text>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btn} onPress={pricingRoute} activeOpacity={0.85}>
                        <Text style={styles.btnText}>Papad Pricing</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} activeOpacity={0.85}>
                        <Text style={styles.btnText}>Bataari Hisaab</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.footer}>Made with ❤ by Eeshaan Sethia</Text>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        height: '100%',
        padding: 20,
    },
    logo: {
        width: 250,
        height: 250,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
    },
    btn: {
        width: '90%',
        backgroundColor: '#e54022',
        paddingVertical: 15,
        borderRadius: 20,
        overflow: 'hidden',
        marginVertical: 20,
    },
    btnText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
    footer: {
        position: 'absolute',
        bottom: 5,
        fontSize: 15,
        color: '#000',
        textAlign: 'center',
        width: '100%',
    },
    btnContainer: {
        width: '100%',
        alignItems: 'center',
    },
});