import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native'
import React, { useState } from 'react'
import TopBar from '../components/topBar'
import commonStyles from '../common/commonCss'
import IngredientRow from '../components/IngredientRow'

const AddPapad = () => {
    const [papadName, setPapadName] = useState('')
    const [papadDesc, setPapadDesc] = useState('')

    return (
        <SafeAreaView style={commonStyles.mainContainerTop}>
            <TopBar title="Add Papad" to="PapadList" />
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Papad Name"
                    onChangeText={(text) => {
                        setPapadName(text);
                    }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Papad Description"
                    onChangeText={(text) => {
                        setPapadDesc(text);
                    }}
                />
                <Text style={styles.heading}>Ingredients</Text>
                <IngredientRow />
            </View>
        </SafeAreaView>
    )
}

export default AddPapad

const styles = StyleSheet.create({
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textDecorationLine: 'underline',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        padding: 20,
    },

    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        width: '100%',
    },
})