import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const NewChat = () => {
return (
    <Button mode="contained" style={styles.button}>
    Chat With A Peer
    </Button>
)}

export default NewChat;

const styles = StyleSheet.create({
    button: {
    marginTop: 16,
    backgroundColor: '#006b26',
    },
});


