import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import { cadastrar as cadastrarUsuario } from '../services/authService';

export default class CadastrarUser extends Component {

    constructor() {
        super();

        this.state = {
            email: '',
            senha: '',
        }
    }

    cadastrar = async e => {

        if (!this.validar()) {
            return;
        };

        const usuario = this.state;

        const body = {
            ...usuario,
            nome: 'James Cigoli',
            sexo: 'M',
            cpf: '45025752184',
        };


        try {

            const result = await cadastrarUsuario(body);

            if (!result.ok) {
                return Alert.alert("Erro ao cadastrar");
            }

            const { navigation } = this.props;

            navigation.navigate("Home");

        } catch (error) {
            console.log(error)
        }

    }


    validar = () => {
        const { email, senha } = this.state;

        if (!email || !senha) {

            Alert.alert("Erro", "Todos os campos são obrigatórios");
            return false;

        } else {
            return true;
        }
    }

    render() {
        return (
            <View style={style.container}>
                <View style={style.form}>
                    <Text style={style.title}>
                        Salvar novo usuário
                    </Text>
                    <TextInput
                        style={style.input}
                        placeholder='Seu e-mail'
                        onChangeText={texto => this.setState({ email: texto })}
                    />

                    <TextInput
                        style={style.input}
                        placeholder='Sua senha'
                        onChangeText={texto => this.setState({ senha: texto })}
                    />

                    <TouchableOpacity
                        onPress={this.cadastrar}
                        style={style.button}>

                        <Text
                            style={style.buttonTitle}>
                            Salvar
                        </Text>

                    </TouchableOpacity>

                </View>
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