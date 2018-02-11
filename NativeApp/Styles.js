import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    buttonContainer: {
        backgroundColor: 'darkgreen',
		flex: 1,
		flexDirection: 'row',
    },
	buttonStyle: {
		width: 150,
	},
	buttonContainerSelected: {
		
	},
    playerName: {
        flex: 1,
        color: 'green',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
    },
    playerBio: {
        flex: 10,
        color: 'darkgreen',
        fontSize: 16,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
    },
    playerHandicap: {
        color: 'darkgreen',
        fontSize: 16,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
    },
    playerImageContainer: {
        flex: 2,
        borderStyle: 'solid',
        borderWidth: 2,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
        borderColor: 'seagreen',
        backgroundColor: 'lightgreen'
    },
    playerInfoContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        borderStyle: 'solid',
        borderWidth: 2,
        marginTop: 0,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
        borderColor: 'seagreen',
        backgroundColor: 'lightgreen'
    },
    storyList: {
        flex: 1,
        flexDirection: 'row',
        borderStyle: 'solid',
        borderWidth: 2,
        marginTop: 1,
        marginBottom: 1,
        marginLeft: 6,
        marginRight: 6,
        borderColor: 'seagreen',
        backgroundColor: '#ccffcc'
    },
    storyListImage: {
        borderStyle: 'solid',
        borderWidth: 2,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
        width: 120,
        height: 60,
        borderColor: 'black',
        backgroundColor: 'white'
    },
    storyDetailBox: {
        flexWrap: 'wrap',
        borderStyle: 'solid',
        borderWidth: 1,
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 6,
        marginRight: 6,
        borderColor: 'black',
        backgroundColor: 'white'
    },
    storyListTitleDate: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    storyListTitle: {
        flex: 1,
        flexWrap: 'wrap',
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
    },
    storyListDate: {
        flexWrap: 'wrap',
        color: 'black',
        fontSize: 14,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
    },
    storyDate: {
        flexWrap: 'wrap',
        color: 'black',
        fontSize: 14,
        marginTop: 14,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
    },
    storyBody: {
        flex: 1,
        flexWrap: 'wrap',
        fontSize: 16,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
    },
    storyTitle: {
        flex: 1,
        flexWrap: 'wrap',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
    },
});
