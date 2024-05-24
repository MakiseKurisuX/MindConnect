import * as React from 'react';
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

export default MentalHealth;
