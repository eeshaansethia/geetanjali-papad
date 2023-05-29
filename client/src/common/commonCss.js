import { StyleSheet } from 'react-native'

module.exports = StyleSheet.create({
    mainContainerCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
    },
    mainContainerSpaceBetween: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
    },
    mainContainerTop: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
    },
    btn: {
        width: '100%',
        backgroundColor: '#1587e7',
        padding: 10,
        borderRadius: 20,
        overflow: 'hidden',
        marginVertical: 20,
    },
    btnText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
})
