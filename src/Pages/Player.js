import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Image, StyleSheet, Text, ScrollView } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';
// import styles from '../styles/styles'
import { TouchableOpacity, State } from 'react-native-gesture-handler';
import { Audio } from 'expo-av'
import { Entypo } from '@expo/vector-icons';

export default function Player({ route, navigation }) {
    const { data, playlist, dt } = route.params

    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(1)
    const [isBuffering, setIsBuffering] = useState(false)
    const [playbackInstance, setPlaybackInstance] = useState(null)
    const [playerData, setPlayerData] = useState(data)
    const [index, setIndex] = useState(playerData.id)

    const changeData = (id) => {
        dt.map(element => {
            if (element.id === id) {
                setPlayerData(element)
            }
        })
    }

    // useEffect(() => {
    //     changeData(index)
    //     console.log('index: ', index);
    // }, [index])

    async function audioFunc() {
        try {
            await Audio.setAudioModeAsync({
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
                shouldDuckAndroid: true,
                staysActiveInBackground: true,
                playThroughEarpieceAndroid: true
            })
            loadAudio()
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        audioFunc()
    }, []);

    const loadAudio = async () => {
        try {
            const playbackInstance = new Audio.Sound()
            const source = {
                uri: playlist[index-1]
            }

            const status = {
                shouldPlay: isPlaying,
                volume: volume
            }

            playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
            await playbackInstance.loadAsync(source, status, false)
            setPlaybackInstance(playbackInstance)
        } catch (err) {
            console.log('err: ', err);
        }
    }

    const onPlaybackStatusUpdate = status => {
        setIsBuffering(status.isBuffering)
    }

    const handlePlayPause = async () => {
        isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()
        setIsPlaying(!isPlaying)
    }

    const handlePreviousTrack = async () => {
        if (playbackInstance) {
            await playbackInstance.unloadAsync()
            let i = index
            if (index-1 === 0) {
                i = playlist.length
                setIndex(i)
                console.log('index: ', index);
                changeData(index)
                loadAudio()
            } else {
                i--
                setIndex(i)
                console.log('index: ', index);
                changeData(index)
                loadAudio()
            }
        }
    }

    const handleNextTrack = async () => {
        if (playbackInstance) {
            await playbackInstance.unloadAsync()
            let i = index
            if (index-1 === playlist.length - 1) {
                i = 1
                setIndex(i)
                console.log('index: ', index);
                changeData(index)
                loadAudio()
            } else {
                i++
                setIndex(i)
                console.log('index: ', index);
                changeData(index)
                loadAudio()
            }
        }
    }

    const backOption = async () => {
        await playbackInstance.unloadAsync()
        navigation.navigate('list')
    }

    const stopOption = async () => {
        await playbackInstance.stopAsync()
        setIsPlaying(!isPlaying)
    }
    const RenderFileInfoTitle = () => {
        return playbackInstance ? (
            <View style={styles.trackInfo}>
                <Text style={[styles.trackInfoText, styles.largeText]}>
                    {playerData.title}
                </Text>
                <Text style={[styles.trackInfoText, styles.smallText]}>
                    {playerData.author}
                </Text>
            </View>
        ) : null
    }

    const RenderFileInfoDescription = () => {
        return playbackInstance ? (
            <ScrollView style={styles.containerDescription}>
                <Text style={[styles.trackInfoText, styles.smallestText]}>
                    {playerData.description}
                </Text>
            </ScrollView>
        ) : null
    }

    return (
        <View style={styles.containerPlayer}>
            <View style={styles.headerTitle}>
                <TouchableOpacity style={{ flex: 1 }}>
                    <AntDesign style={{ flex: 1, margin: 10 }} name="arrowleft" size={30} color="#444" onPress={() => backOption()} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 0.3, marginBottom: 10 }}>
                <RenderFileInfoTitle />
            </View>
            <View style={styles.imgControll}>
                <Image
                    style={styles.trackImg}
                    source={{ uri: playerData.medium_image_url }}
                />
                <View style={styles.controls}>
                    <TouchableOpacity style={styles.controll} onPress={() => handlePreviousTrack()}>
                        <Ionicons name='ios-skip-backward' size={48} color='#444' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controll} onPress={() => handlePlayPause()}>
                        {isPlaying ? (
                            <Ionicons name='ios-pause' size={48} color='#444' />
                        ) : (
                                <Ionicons name='ios-play-circle' size={48} color='#444' />
                            )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controll} onPress={() => handleNextTrack()}>
                        <Ionicons name='ios-skip-forward' size={48} color='#444' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controllStop}>
                        <Entypo name="controller-stop" size={52} color="#444" onPress={() => stopOption()} />
                    </TouchableOpacity>
                </View>
            </View>
            <RenderFileInfoDescription />
        </View>
    )
}

const styles = StyleSheet.create({
    containerPlayer: {
        flex: 1,
        backgroundColor: '#7bb062',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        flex: 0.3,
        alignSelf: 'flex-start'
    },
    imgControll: {
        flex: 2,
        justifyContent: "center",
        alignItems: 'center'
    },
    trackImg: {
        flex: 1,
        width: 250,
        maxHeight: 250,
        borderWidth: 1,
        borderColor: 'white'
    },
    controls: {
        flexDirection: 'row',
        marginTop: 10
    },
    controll: {
        margin: 20
    },
    controllStop: {
        marginHorizontal: 10,
        marginTop: 17
    },
    trackInfo: {
        padding: 10
    },
    trackInfoText: {
        textAlign: 'center',
        flexWrap: 'wrap',
        color: '#fff'
    },
    largeText: {
        fontSize: 22
    },
    smallText: {
        fontSize: 16
    },
    smallText: {
        fontSize: 14
    },
    control: {
        margin: 20
    },
    controls: {
        flexDirection: 'row'
    },
    containerDescription: {
        flex: 1,
        backgroundColor: 'gray',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        marginHorizontal: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})