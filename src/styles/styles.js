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
        fontWeight: '600',
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        paddingBottom: 20
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
        alignContent: "space-around"
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
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
        textAlign: 'left',
        padding: 5,
        justifyContent: "center",
        alignSelf: "center"
    }
});

export default styles