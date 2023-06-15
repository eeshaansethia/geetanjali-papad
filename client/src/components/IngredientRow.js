import { StyleSheet, TextInput, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

const IngredientRow = () => {

    const [ingredient, setIngredient] = useState({
        name: '',
        weight: 0.0,
        pricePerKg: 0.0,
        totalCost: 0.0,
    })

    useEffect(() => {
        setIngredient({
            ...ingredient,
            totalCost: ingredient.weight * ingredient.pricePerKg,
        })
    }, [ingredient.weight, ingredient.pricePerKg])

    const handleNameChange = (value) => {
        setIngredient({
            ...ingredient,
            name: value,
        })
    }

    const handleWeightChange = (value) => {
        setIngredient({
            ...ingredient,
            weight: value,
        })
    }

    const handlePriceChange = (value) => {
        setIngredient({
            ...ingredient,
            pricePerKg: value,
        })
    }

    return (
        <View style={styles.row}>
            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    style={styles.input_name}
                    placeholder="Ingredient"
                    value={ingredient.name}
                    onChangeText={(value) => handleNameChange(value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Weight"
                    value={ingredient.weight}
                    onChangeText={(value) => handleWeightChange(parseFloat(value))}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Price/kg"
                    value={ingredient.pricePerKg}
                    onChangeText={(value) => handlePriceChange(parseFloat(value))}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.costRow}>
                <Text style={styles.costText}> Total Cost:</Text>
                <Text style={styles.costValue}> {ingredient.totalCost}</Text>
            </View>
        </View>
    )
}

export default IngredientRow

const styles = StyleSheet.create({
    row: {
        flexDirection: 'column',
        marginBottom: 10,
        width: '100%',
        backgroundColor: '#eee',
        padding: 10,
        borderRadius: 5,
        gap: 10,
    },
    input_name: {
        flex: 2,
        marginRight: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        marginLeft: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        fontSize: 12,
    },
    costRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    costText: {
        fontSize: 14,
    },
    costValue: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});