import React from 'react';
import { Text, TouchableOpacity, Image, View } from "react-native"
import styles from '../styles/styles'

const Card = ({ title, thumb, tagline, onPress }) => {

    return (
        <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.inside}>
                <Image source={{
                    uri: thumb
                }}
                    style={styles.thumb}
                />
                <Text style={styles.tagline}>
                    {tagline}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default Card