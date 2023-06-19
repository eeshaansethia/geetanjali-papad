import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import TopBar from '../components/topBar'
import commonStyles from '../common/commonCss'
import { ScrollView } from 'react-native'
import axios from 'axios'

const AddPapad = ({ navigation }) => {
    const [papadName, setPapadName] = useState('')
    const [papadDesc, setPapadDesc] = useState('')
    const [showAddIngredient, setShowAddIngredient] = useState(false)
    const [showEditIngredient, setShowEditIngredient] = useState(false)
    const [value, setValue] = useState(0.0)
    const [index, setIndex] = useState(-1)
    const [ingredient, setIngredient] = useState({
        name: '',
        weight: 0.0,
        pricePerKg: 0.0,
        totalCost: 0.0,
    })
    const [ingredients, setIngredients] = useState([])
    const [totalWeight, setTotalWeight] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    const calculateTotals = () => {
        let weightSum = 0;
        let costSum = 0;

        for (let i = 0; i < ingredients.length; i++) {
            const ingredient = ingredients[i];
            weightSum += ingredient.weight;
            costSum += ingredient.totalCost;
        }

        setTotalWeight(weightSum.toFixed(4));
        setTotalCost(costSum.toFixed(2));
    };

    const onAddIngredient = (newIngredient) => {
        if (newIngredient.name === '' || newIngredient.weight === 0.0 || newIngredient.pricePerKg === 0.0) {
            Alert.alert(
                'Error',
                'Please fill all the fields',
                [
                    { text: 'OK', style: 'cancel' },
                ]
            );
            return
        }
        if (isNaN(newIngredient.weight) || isNaN(newIngredient.pricePerKg)) {
            Alert.alert(
                'Error',
                'Please enter valid values',
                [
                    { text: 'OK', style: 'cancel' },
                ]
            );
            return
        }
        setIngredients([...ingredients, newIngredient])
        setIngredient({
            name: '',
            weight: 0.0,
            pricePerKg: 0.0,
            totalCost: 0.0,
        })
        setShowAddIngredient(false)
    }

    const handlePop = () => {
        if (papadName === '') {
            Alert.alert(
                'Error',
                'Please add a name for the papad.',
                [
                    { text: 'OK', style: 'cancel' },
                ]
            );
            return
        }
        if (ingredients.length === 0) {
            Alert.alert(
                'Error',
                'Please add atleast one ingredient.',
                [
                    { text: 'OK', style: 'cancel' },
                ]
            );
            return
        }

        Alert.alert(
            'Confirmation',
            'Are you sure you want to perform this action?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Confirm', onPress: handleSave },
            ]
        );
    };

    const handleSave = async () => {
        setShowAddIngredient(false)
        setShowEditIngredient(false)
        console.log(papadName, papadDesc, ingredients, value)
        await axios.post('http://192.168.29.14:3001/papadDetails', {
            name: papadName,
            desc: papadDesc,
            ingredients: ingredients,
            value: value,
        })
            .then(({ data }) => {
                console.log(data)
                if (data.status === 200) {
                    navigation.navigate('PapadList')
                } else {
                    Alert.alert(
                        'Error',
                        'Something went wrong. Contact your son.',
                        [
                            { text: 'OK', style: 'cancel' },
                        ]
                    );
                }
            })
            .catch((error) => {
                console.log(error)
                Alert.alert(
                    'Error',
                    'Something went wrong. Contact your son.',
                    [
                        { text: 'OK', style: 'cancel' },
                    ]
                );
            })
    }

    useEffect(() => {
        calculateTotals();
    }, [ingredients])

    const deleteButton = () => {
        setIngredient({
            name: '',
            weight: 0.0,
            pricePerKg: 0.0,
            totalCost: 0.0,
        })
    }

    useEffect(() => {
        setIngredient({
            ...ingredient,
            totalCost: Number(((ingredient.weight) * (ingredient.pricePerKg)).toFixed(2)),
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
            weight: Number(value),
        })
    }

    const handlePriceChange = (value) => {
        setIngredient({
            ...ingredient,
            pricePerKg: Number(value),
        })
    }

    const editIngredient = (index) => {
        setShowAddIngredient(false)
        setShowEditIngredient(true)
        setIndex(index)
        setIngredient(ingredients[index])
    }

    const editCancelButton = () => {
        setShowAddIngredient(false)
        setShowEditIngredient(false)
        setIngredient({
            name: '',
            weight: 0.0,
            pricePerKg: 0.0,
            totalCost: 0.0,
        })
        setIndex(-1)
    }

    const onEditIngredient = (newIngredient) => {
        if (newIngredient.name === '' || newIngredient.weight === 0.0 || newIngredient.pricePerKg === 0.0) {
            Alert.alert(
                'Error',
                'Please fill all the fields',
                [
                    { text: 'OK', style: 'cancel' },
                ]
            );
            return
        }
        let temp = [...ingredients]
        temp[index] = newIngredient
        setIngredients(temp)
        setShowAddIngredient(false)
        setShowEditIngredient(false)
        setIngredient({
            name: '',
            weight: 0.0,
            pricePerKg: 0.0,
            totalCost: 0.0,
        })
        setIndex(-1)
    }

    return (
        <SafeAreaView style={commonStyles.mainContainerTop}>
            <TopBar title="Add Papad" to="PapadList" />
            <View style={styles.container}>
                <View style={styles.inputs}>
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
                </View>
                <View style={styles.buttonCont}>
                    <Text style={styles.heading}>Ingredients</Text>
                    <View style={styles.btn}>
                        <TouchableOpacity onPress={() => {
                            setShowAddIngredient(!showAddIngredient)
                            setIngredient({
                                name: '',
                                weight: 0.0,
                                pricePerKg: 0.0,
                                totalCost: 0.0,
                            })
                        }}>
                            <Text style={commonStyles.btnText}>{showAddIngredient ? 'Hide' : 'Add +'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    ingredients.length > 0 ?
                        <View style={styles.outerScroll}>
                            <View style={styles.ingredient}>
                                <Text style={styles.ingredientHead}>S.No.</Text>
                                <Text style={styles.ingredientHead}>Name</Text>
                                <Text style={styles.ingredientHead}>Weight</Text>
                                <Text style={styles.ingredientHead}>Price/kg</Text>
                                <Text style={styles.ingredientHead}>Cost</Text>
                            </View>
                            <ScrollView style={styles.ingredientList} >
                                {ingredients.map((ingredient, index) => (
                                    <TouchableOpacity key={index} style={styles.ingredient} onLongPress={() => {
                                        Alert.alert(
                                            'Confirmation',
                                            'What do you want to do with this ingredient?',
                                            [
                                                { text: 'Cancel', style: 'cancel' },
                                                { text: 'Edit', onPress: () => { editIngredient(index) } },
                                                { text: 'Delete', onPress: () => { setIngredients(ingredients.filter((item, i) => i !== index)) } },
                                            ]
                                        );
                                    }}>
                                        <Text style={styles.ingredientText}>{index + 1}</Text>
                                        <Text style={styles.ingredientText}>{ingredient.name}</Text>
                                        <Text style={styles.ingredientText}>{ingredient.weight}</Text>
                                        <Text style={styles.ingredientText}>{ingredient.pricePerKg}</Text>
                                        <Text style={styles.ingredientText}>{ingredient.totalCost}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                            <View style={styles.ingredientTotals}>
                                <Text style={styles.ingredientBottom}>Totals</Text>
                                <Text style={styles.ingredientBottom}>{totalWeight ? totalWeight + ' kg' : 0}</Text>
                                <Text style={styles.ingredientBottom}>{totalCost ? totalCost + ' Rs' : 0} </Text>
                            </View>
                        </View> : <Text>No Ingredients Added</Text>
                }
            </View>
            <View style={styles.bottom}>
                <View style={styles.finalCost}>
                    <TextInput
                        style={styles.small_input}
                        placeholder="Value"
                        onChangeText={(text) => {
                            setValue(text);
                            setShowAddIngredient(false);
                            setShowEditIngredient(false);
                        }}
                    />
                    <Text style={styles.costing}>Final Costing: {value ? (totalCost / value).toFixed(2) : 0} Rs/kg</Text>
                </View>
                {
                    showAddIngredient ? <View style={stylesAdd.row}>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                style={stylesAdd.input_name}
                                placeholder="Ingredient"
                                value={ingredient.name}
                                onChangeText={(text) => handleNameChange(text)}
                            />
                            <TextInput
                                style={stylesAdd.inputAdd}
                                placeholder="Weight"
                                value={ingredient.weight}
                                onChangeText={(value) => handleWeightChange(Number(value))}
                                inputMode="numeric"
                            />
                            <TextInput
                                style={stylesAdd.inputAdd}
                                placeholder="Price/kg"
                                value={ingredient.pricePerKg}
                                onChangeText={(value) => handlePriceChange(Number(value))}
                                inputMode="numeric"
                            />
                        </View>
                        <View style={stylesAdd.bottom}>
                            <View style={stylesAdd.costRow}>
                                <Text style={stylesAdd.costText}>Cost:</Text>
                                <Text style={stylesAdd.costValue}> {ingredient.totalCost}</Text>
                            </View>
                            <View style={stylesAdd.btnAdds}>
                                <TouchableOpacity style={stylesAdd.btnAdd} onPress={() => { onAddIngredient(ingredient) }}>
                                    <Text style={commonStyles.btnText}>Add</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={stylesAdd.btnAddDel} onPress={deleteButton}>
                                    <Text style={commonStyles.btnText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View> : null
                }

                {
                    showEditIngredient ?
                        <View style={stylesAdd.row}>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    style={stylesAdd.input_name}
                                    placeholder="Ingredient"
                                    value={ingredient.name}
                                    onChangeText={(text) => handleNameChange(text)}
                                />
                                <TextInput
                                    style={stylesAdd.inputAdd}
                                    placeholder="Weight"
                                    value={ingredient.weight ? ingredient.weight : 0}
                                    onChangeText={(value) => handleWeightChange(value)}
                                    keyboardType="numeric"
                                />
                                <TextInput
                                    style={stylesAdd.inputAdd}
                                    placeholder="Price/kg"
                                    value={ingredient.pricePerKg ? ingredient.pricePerKg : 0}
                                    onChangeText={(value) => handlePriceChange(value)}
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={stylesAdd.bottom}>
                                <View style={stylesAdd.costRow}>
                                    <Text style={stylesAdd.costText}>Cost:</Text>
                                    <Text style={stylesAdd.costValue}> {ingredient.totalCost}</Text>
                                </View>
                                <View style={stylesAdd.btnAdds}>
                                    <TouchableOpacity style={stylesAdd.btnAdd} onPress={() => { onEditIngredient(ingredient) }}>
                                        <Text style={commonStyles.btnText}>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={stylesAdd.btnAddDel} onPress={editCancelButton}>
                                        <Text style={commonStyles.btnText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View> : null
                }

                <View style={styles.buttonCont}>
                    <TouchableOpacity style={styles.btnLast} onPress={handlePop}>
                        <Text style={commonStyles.btnText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default AddPapad

const styles = StyleSheet.create({
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        padding: 20,
    },
    inputs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
        gap: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
    },
    buttonCont: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    btn: {
        backgroundColor: '#1587e7',
        justifyContent: 'center',
        borderRadius: 50,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    ingredientList: {
        width: '100%',
    },
    ingredient: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        marginBottom: 8,
    },
    ingredientTotals: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    ingredientHead: {
        flex: 1,
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    ingredientBottom: {
        flex: 1,
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    ingredientText: {
        fontSize: 14,
        width: '25%',
        textAlign: 'center',
    },
    bottom: {
        width: '100%',
        paddingHorizontal: 10,
    },
    small_input: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 5,
        paddingHorizontal: 10,
    },
    finalCost: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    costing: {
        flex: 2,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    btnLast: {
        backgroundColor: '#1587e7',
        justifyContent: 'center',
        borderRadius: 50,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    outerScroll: {
        flex: 1,
        width: '100%',
    },
})

const stylesAdd = StyleSheet.create({
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
        backgroundColor: '#fff',
    },
    inputAdd: {
        flex: 1,
        paddingHorizontal: 10,
        marginLeft: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        fontSize: 12,
        backgroundColor: '#fff',
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
    bottom: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
    btnAdds: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 10,
    },
    btnAddDel: {
        backgroundColor: '#e54022',
        justifyContent: 'center',
        borderRadius: 50,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    btnAdd: {
        backgroundColor: '#218838',
        justifyContent: 'center',
        borderRadius: 50,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
});