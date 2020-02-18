import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class Login extends Component {
    render(){
        return (
            <View style={style.container}>
                <View style={style.form}>
                    <Text style={style.title}>
                        Tela de login
                    </Text>
                    <TextInput style={style.input} placeholder='Seu e-mail' />
                    <TextInput style={style.input} placeholder='Sua senha' />
                    <TouchableOpacity style={style.button}>
                        <Text>Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.button}>
                        <Text>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#11381b',
        justifyContent: "center"
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
        color: 'white',
        alignSelf: "stretch",
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 8,
        marginTop: 15,
        borderColor: 'white'
    }
})