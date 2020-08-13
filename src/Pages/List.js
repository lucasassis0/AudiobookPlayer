import React, { useState, useEffect } from 'react';
import { SafeAreaView, Alert, ScrollView, View, Image, ActivityIndicator, Text, FlatList } from "react-native"
import apiData from '../api/apiData'
import styles from '../styles/styles'
import Card from '../Components/Card'
import logo from '../img/logo.png'

export default function List({ navigation }) {
    const [dt, setDt] = useState([])
    const [playlist, setPlaylist] = useState([])
    const [visible, setVisible] = useState(false)
    const [filteredData, setFilteredData] = useState([])

    const getData = () => {
        apiData()
            .then(res => {
                const { data } = res.data
                data.forEach(element => {
                    dt.push(element)
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

    const List = () => {
        return (
            dt.map(data => {
                return (
                    <Card
                        key={data.id}
                        title={data.title}
                        thumb={data.thumb_image_url}
                        tagline={data.tagline}
                        onPress={() => { navigation.navigate('player', { data: data, playlist: playlist, dt: dt}) }}
                    />
                )
            })
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerLogo}>
                <Image style={styles.logo} source={logo} />
            </View>
            <View style={styles.containerScroll}>
                <Text style={styles.header}>Ouça agora!</Text>
                <ScrollView style={styles.scrollList}>
                    {
                        visible ? <List /> : <View style={{ marginTop: 200 }}><ActivityIndicator size='large' color='white' /></View>
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}