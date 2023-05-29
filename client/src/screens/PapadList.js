import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import TopBar from '../components/topBar'
import commonStyles from '../common/commonCss'

const PapadList = ({ navigation }) => {
    const papadNameList = [
        {
            id: 1,
            name: 'Masala Papad',
            description: '',
        },
        {
            id: 2,
            name: 'Saada Papad',
        },
        {
            id: 3,
            name: 'Chana Papad',
            description: 'Description',
        },
        {
            id: 4,
            name: 'Masala Papad',
            description: 'Description',
        },
        {
            id: 5,
            name: 'Saada Papad',
            description: 'Description',
        },
        {
            id: 6,
            name: 'Chana Papad',
            description: 'Description',
        },
        {
            id: 7,
            name: 'Masala Papad',
            description: 'Description',
        },
        {
            id: 8,
            name: 'Saada Papad',
            description: 'Description',
        },
        {
            id: 9,
            name: 'Chana Papad',
            description: 'Description',
        },
        {
            id: 10,
            name: 'Masala Papad',
            description: 'Description',
        },
        {
            id: 11,
            name: 'Saada Papad',
            description: 'Description',
        },
        {
            id: 12,
            name: 'Chana Papad',
            description: 'Description',
        },
        {
            id: 13,
            name: 'Special Papad',
            description: 'Description',
        },
    ]
    return (
        <SafeAreaView style={commonStyles.mainContainerTop}>
            <TopBar title="Papad Pricing" to="Home" />
            <View style={styles.addBtnContainer}>
                <TouchableOpacity style={styles.addBtn}>
                    <Text style={styles.addBtnText}>Add</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            <ScrollView style={styles.listContainer}>
                {
                    papadNameList.map((item, index) => (
                        <TouchableOpacity style={styles.listItem} key={item.id} onPress={() => navigation.navigate('EditPapad', { name: item.name, id: item.id })}>
                            <Text style={styles.listItemTitle}>{item.name}</Text>
                            {
                                item.description ? <Text style={styles.listItemSubtitle}>{item.description}</Text> : null
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
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    listItem: {
        width: '100%',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 5,
        shadowColor: "#000000",
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
        elevation: 5,
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
        backgroundColor: '#eee',
    },
})