import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopBar from '../components/topBar'

const EditPapad = ({ route }) => {
    const { id, name } = route.params
    console.log(id, name)
    return (
        <SafeAreaView>
            <TopBar title={name} to="PapadList" />
            <Text>{id}</Text>
        </SafeAreaView>
    )
}

export default EditPapad

const styles = StyleSheet.create({})