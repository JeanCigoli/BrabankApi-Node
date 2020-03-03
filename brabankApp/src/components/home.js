import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { isSignerIn } from '../services/authService';

const Lancamento = ({lancamento}) => {

    return (
        <View style={style.viewLancamento}>
            <Text style={style.subtitle}> {lancamento.tipo === "E" ? 'Receita' : 'Dispesa'} </Text>
            <Text > {lancamento.descricao} </Text>
        </View>
    );

}

export default class Home extends Component {

    constructor() {
        super();

        this.state = {
            session: {},
            lancamentos: []
        }
    }

    componentDidMount = async () => {

        const session = await isSignerIn();
        this.setState({ session: session });

        const params = {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + session.token
            }
        }

        const response = await fetch('http://10.107.144.32:3000/lancamentos', params);

        if (!response.ok) {
            return console.log('Deu merda!');
        }

        const lancamentos = await response.json();

        this.setState({ lancamentos });

    }

    render() {

        const { session, lancamentos } = this.state;

        const usuario = session.usuario ? session.usuario : '';

        return (
            <View style={style.container}>
                <Text style={style.title}> Bem-vindo, {usuario.nome}! </Text>

                <Text style={style.titleLancamento}> Meus lançamento</Text>
                {
                    lancamentos.map(lanc => {
                        return (
                            <Lancamento key={lanc.id}  lancamento={lanc} />
                        );
                    })
                }
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 15,
        textAlign: "center"
    },
    viewLancamento: {
        height: 60,
        backgroundColor: '#fff',
        padding: 6,
        margin: 10
    },
    titleLancamento: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 15,
        textAlign: "center"
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        textAlign: "left"
    }
})