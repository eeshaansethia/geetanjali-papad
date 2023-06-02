import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import TopBar from '../components/topBar'
import commonStyles from '../common/commonCss'

const AddPapad = () => {
    return (
        <SafeAreaView style={commonStyles.mainContainerTop}>
            <TopBar title="Add Papad" to="PapadList" />
        </SafeAreaView>
    )
}

export default AddPapad

const styles = StyleSheet.create({})