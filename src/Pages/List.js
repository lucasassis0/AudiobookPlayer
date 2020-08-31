import React, { useState, useEffect } from 'react';
import { SafeAreaView, Alert, ScrollView, View, Image, ActivityIndicator, Text } from "react-native"
import apiData from '../api/apiData'
import styles from '../styles/styles'
import Card from '../Components/Card'
import logo from '../img/logo.png'
import { TextInput } from 'react-native-gesture-handler';

export default function List({ navigation }) {
    const [dt, setDt] = useState([])
    const [playlist, setPlaylist] = useState([])
    const [visible, setVisible] = useState(false)
    const [input, setInput] = useState('')
    const [filteredBooks, setFilteredBooks] = useState()

    const getData = () => {
        apiData()
            .then(res => {
                const { data } = res.data
                setDt(data)
                setFilteredBooks(data)
                data.forEach(element => {
                    playlist.push(element.audio_url)
                });
                setTimeout(() => {
                    if (data !== null) {
                        setVisible(!visible)
                    }
                }, 2000)
            })
            .catch(err => {
                Alert.alert("Erro: ", err)
            })
    }

    useEffect(() => {
        getData()
    }, []);

    const filterBooks = (books) => {
        return books.filter(book => {
            return book.title.toLowerCase().match(input)
        })
    }

    const List = () => {
        return (
            filterBooks(dt).map(data => {
                return (
                    <Card
                        key={data.id}
                        title={data.title}
                        thumb={data.thumb_image_url}
                        tagline={data.tagline}
                        onPress={() => { navigation.navigate('player', { book: data, playlist: playlist, dt: dt }) }}
                    />
                )
            })
        )
    }

    const Search = () => {
        return (
            <TextInput
                style={styles.input}
                placeholder="Procurar"
                clearButtonMode="always"
                defaultValue={input}
                onChangeText={input => setInput(input)}
            />
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerLogo}>
                <Image style={styles.logo} source={logo} />
            </View>
            <Text style={styles.header}>Ouça agora!</Text>
            <Search />
            <View style={styles.containerScroll}>
                <ScrollView style={styles.scrollList}>
                    {
                        visible ? <List /> : <View style={{ marginTop: 200 }}><ActivityIndicator size='large' color='white' /></View>
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}