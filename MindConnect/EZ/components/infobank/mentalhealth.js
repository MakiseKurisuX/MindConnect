/*import * as React from 'react';
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { COLORS } from '../../constants';


const MentalHealth = () => {
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: COLORS.oliveGreen, padding: 20};

    return (

        <PaperProvider>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <ScrollView>
                        <Text>
                            Mental health refers to the state of mental well-being which plays an integral role in our
                            daily lives. It comprises psychological, social and emotional well-being. {"\n"}
                        </Text>
                        <Text>
                            It affects how we think, feel and act. It also helps determine how we handle stress, relate
                            to others and make choices. Mental health is important at every stage of life, from childhood
                            and adolescence through adulthood.
                        </Text>
                    </ScrollView>
                </Modal>
            </Portal>
            <Button style={{ marginTop: 70, height:100}} onPress={showModal}>
                <Text style={{color: COLORS.oliveGreen}}>Mental Health</Text>
            </Button>
        </PaperProvider>
    );
};

export default MentalHealth;*/

import * as React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Surface, Provider as PaperProvider } from 'react-native-paper';
import { COLORS } from '../../constants';

const MentalHealth = () => {
    return (
        <PaperProvider>
            <View style={styles.container}>
                <Surface style={styles.surface}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Mental Health</Text>
                    </View>
                    <ScrollView>
                        <Text style={styles.text}>
                            Mental health refers to the state of mental well-being which plays an integral role in our
                            daily lives. It comprises psychological, social and emotional well-being. {"\n"}
                        </Text>
                        <Text style={styles.text}>
                            It affects how we think, feel and act. It also helps determine how we handle stress, relate
                            to others and make choices. Mental health is important at every stage of life, from childhood
                            and adolescence through adulthood.
                        </Text>
                    </ScrollView>
                </Surface>
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: COLORS.lightGreen,
    },
    surface: {
        padding: 20,
        marginVertical: 20,
        backgroundColor: COLORS.white,
        elevation: 4,
        borderRadius: 10,
    },
    header: {
        backgroundColor: COLORS.oliveGreen,
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.white,
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        color: COLORS.black,
        marginBottom: 10,
    },
});

export default MentalHealth;