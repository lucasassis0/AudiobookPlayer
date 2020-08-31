import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7bb062',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerLogo: {
        flex: 1
    },
    logo: {
        height: 140,
        width: 140
    },
    header: {
        fontWeight: 'bold',
        fontFamily: 'source sans pro',
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
        paddingBottom: 20
    },
    input: {
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: '#d6d6d6',
        marginBottom: 10
    },
    containerScroll: {
        flex: 3,
        marginBottom: 30,
        marginHorizontal: 30,
    },
    scrollList: {
        borderWidth: 1,
        borderColor: 'gray',
        width: 300,
        height: 450
    },
    cardContainer: {
        backgroundColor: 'gray',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 15,
        margin: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    inside: {
        flexDirection: 'row',
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'source sans pro',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'white'
    },
    thumb: {
        height: 80,
        width: 80,
        margin: 5
    },
    tagline: {
        fontFamily: 'source sans pro',
        fontSize: 14,
        fontWeight: '300',
        textAlign: 'left',
        padding: 5,
        marginRight: 5,
        justifyContent: "center",
        alignSelf: "center"
    },
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
    timeBar: {
        marginTop: 10,
        padding: 10,
        fontSize: 16,
    },
    controls: {
        flexDirection: 'row',
    },
    controll: {
        margin: 20
    },
    controllStop: {
        margin: 20
    },
    trackInfo: {
        padding: 10
    },
    trackInfoText: {
        textAlign: 'center',
        flexWrap: 'wrap',
        color: '#fff',
    },
    largeText: {
        fontSize: 22,
        fontFamily: 'source sans pro'
    },
    smallText: {
        fontSize: 16,
        fontFamily: 'source sans pro',
        fontWeight: '300'
    },
    author: {
        fontSize: 16,
        fontFamily: 'source sans pro',
        fontWeight: '300',
        fontStyle: 'italic',
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
});

export default styles