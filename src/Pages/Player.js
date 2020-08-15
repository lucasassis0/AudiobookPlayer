import React, { useState, useEffect } from 'react';
import { View, Image, Text, ScrollView } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import styles from '../styles/styles'
import { TouchableOpacity } from 'react-native-gesture-handler';
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
    const [duration, setDuration] = useState('')
    const [current, setCurrent] = useState(0)

    const changeData = (id) => {
        dt.map(element => {
            if (element.id === id) {
                setPlayerData(element)
            }
        })
    }

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
                uri: playlist[index - 1]
            }

            const status = {
                shouldPlay: isPlaying,
                volume: volume
            }

            playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
            await playbackInstance.loadAsync(source, status, false)
            setPlaybackInstance(playbackInstance)
            setTimeout(async() => {
                const status = await playbackInstance.getStatusAsync()
                const trackDuration = time_convert(status.durationMillis/1000)
                setDuration(trackDuration)
            }, 300)
        } catch (err) {
            console.log('err: ', err);
        }
    }
    
    function time_convert(num) {
        var minutes = Math.floor(num / 60);
        var seconds = num % 60;
        if (seconds<10) {
            seconds = 0+`${seconds.toFixed(0)}`
            return minutes + ":" + seconds;
        }
        return minutes + ":" + seconds.toFixed(0);
    }
    
    const onPlaybackStatusUpdate = status => {
        setIsBuffering(status.isBuffering)
        const trackCurrentTime = time_convert(status.positionMillis/1000)
        setCurrent(trackCurrentTime)
    }

    const handlePlayPause = async () => {
        isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()
        setIsPlaying(!isPlaying)
    }

    const handlePreviousTrack = async () => {
        if (playbackInstance) {
            await playbackInstance.unloadAsync()
                .then(res => {
                    let i = index
                    if (index - 1 === 0) {
                        i = playlist.length
                        setIndex(i)
                        console.log('index: ', index);
                        changeData(index)
                        setCurrent(0)
                        loadAudio()
                    } else {
                        i--
                        setIndex(i)
                        console.log('index: ', index);
                        changeData(index)
                        loadAudio()
                    }
                })
                .catch(err => {
                    console.log('err: ', err);
                })
        }
    }

    const handleNextTrack = async () => {
        if (playbackInstance) {
            await playbackInstance.unloadAsync()
            let i = index
            if (index - 1 === playlist.length - 1) {
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
        if(isPlaying){
            setIsPlaying(!isPlaying)
        }
    }
    const RenderFileInfoTitle = () => {
        return playbackInstance ? (
            <View style={styles.trackInfo}>
                <Text style={[styles.trackInfoText, styles.largeText]}>
                    {playerData.title}
                </Text>
                <Text style={[styles.trackInfoText, styles.author]}>
                    {playerData.author}
                </Text>
            </View>
        ) : null
    }

    const RenderFileInfoDescription = () => {
        return playbackInstance ? (
            <ScrollView style={styles.containerDescription}>
                <Text style={[styles.trackInfoText, styles.smallText]}>
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
                <View>
                    <Text style={styles.timeBar}>
                        {`${current} - ${duration}`}
                    </Text>
                </View>
                <View style={styles.controls}>
                    <TouchableOpacity style={styles.controll} onPress={() => handlePreviousTrack()}>
                        <Entypo name="controller-jump-to-start" size={30} color="#444" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controll} onPress={() => handlePlayPause()}>
                        {isPlaying ? (
                            <Entypo name="controller-paus" size={30} color="#444" />
                        ) : (
                                <Entypo name="controller-play" size={30} color="#444" />
                            )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controll} onPress={() => handleNextTrack()}>
                        <Entypo name="controller-next" size={30} color="#444" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controllStop}>
                        <Entypo name="controller-stop" size={30} color="#444" onPress={() => stopOption()} />
                    </TouchableOpacity>
                </View>
            </View>
            <RenderFileInfoDescription />
        </View>
    )
}
