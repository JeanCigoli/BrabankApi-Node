import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Home extends Component {

    constructor() {
        super();

        this.state = {
            email: '',
            senha: '',
        }
    }

    render() {
        return (
            <View style={style.container}>
                <Text style={style.title}>
                    Bem-vindo a Home, {this.props.navigation.nome}!
                </Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#62cc6d',
        justifyContent: "center",
    },
    form: {
        backgroundColor: '#000',
        padding: 16,
        alignItems: "center",
        borderRadius: 10,
        margin: 16
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },
    buttonTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    input: {
        color: 'white',
        alignSelf: "stretch",
        marginTop: 15,
        padding: 8,
        borderStyle: "solid",
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        fontSize: 18,
    },
    button: {
        height: 42,
        alignSelf: "stretch",
        alignItems: 'center',
        justifyContent: "center",
        borderWidth: 2,
        borderRadius: 8,
        marginTop: 15,
        borderColor: 'white',
        backgroundColor: '#11381b',
    }
})