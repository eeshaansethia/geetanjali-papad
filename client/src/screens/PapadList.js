import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import TopBar from '../components/topBar'
import commonStyles from '../common/commonCss'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native'

const PapadList = ({ navigation }) => {
    const [papadNameList, setPapadNameList] = useState([])

    const isFocused = useIsFocused()

    useEffect(() => {
        const getDetails = async () => {
            await axios.get('http://192.168.29.14:3001/papadDetails')
                .then(({ data }) => {
                    if (data.status === 200) {
                        setPapadNameList(data.data)
                    }
                    else {
                        Alert.alert(
                            'Error',
                            'Something went wrong. Contact your son.',
                            [
                                { text: 'OK', style: 'cancel' },
                            ]
                        );
                    }
                })
                .catch((err) => {
                    console.log(err)
                    Alert.alert(
                        'Error',
                        'Something went wrong. Contact your son.',
                        [
                            { text: 'OK', style: 'cancel' },
                        ]
                    );
                })
        }
        if (isFocused) {
            getDetails()
        }
    }, [isFocused])

    return (
        <SafeAreaView style={commonStyles.mainContainerTop}>
            <TopBar title="Papad Pricing" to="Home" />
            <View style={styles.addBtnContainer}>
                <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddPapad')}>
                    <Text style={styles.addBtnText}>Add</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            {
                papadNameList.length === 0 ? <Text style={{ ...styles.listItemTitle, textAlign: 'center', marginTop: 20, width: '100%' }}>No Papad Added</Text> : null
            }
            <ScrollView style={styles.listContainer}>
                {
                    papadNameList.map((item, index) => (
                        <TouchableOpacity style={styles.listItem} key={item._id} onPress={() => navigation.navigate('EditPapad', { name: item.name, id: item._id })}>
                            <Text style={styles.listItemTitle}>{index + 1 + '. ' + item.name}</Text>
                            {
                                item.desc ? <Text style={styles.listItemSubtitle}>{item.desc}</Text> : null
                            }
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default PapadList

const styles = StyleSheet.create({
    addBtnContainer: {
        width: '100%',
        alignItems: 'flex-end',
    },
    addBtn: {
        borderRadius: 10,
        backgroundColor: '#e54022',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    addBtnText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    listContainer: {
        width: '100%',
        padding: 10,
        backgroundColor: '#fff',
        paddingBottom: 20,
    },
    listItem: {
        width: '100%',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 5,
        marginTop: 0,
        borderColor: '#ccc',
        borderWidth: 1.5,
    },
    listItemTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    listItemSubtitle: {
        fontSize: 15,
        color: '#e54022',
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#ccc',
    },
})