/*import * as React from 'react';
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { COLORS } from '../../constants';

const MentalIllness = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: COLORS.oliveGreen, padding: 20};

  return (
    <PaperProvider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <ScrollView>
          <Text>
          Mental illness or disorders are diagnosed conditions in which a person’s behaviour, thoughts, feelings
          and mood are affected. Some common examples are Depression, Anxiety and Bipolar Disorder and Eating Disorders.
          </Text>
        </ScrollView>
        </Modal>
      </Portal>
      <Button style={{ marginTop: 70, height:100}} onPress={showModal}>
        <Text style={{color: COLORS.oliveGreen}}>Mental Illness</Text>
      </Button>
    </PaperProvider>
  );
};

export default MentalIllness;*/

import * as React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Surface, Provider as PaperProvider } from 'react-native-paper';
import { COLORS } from '../../constants';

const MentalIllness = () => {
    return (
        <PaperProvider>
            <View style={styles.container}>
                <Surface style={styles.surface}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Mental Illness</Text>
                    </View>
                    <ScrollView>
                        <Text style={styles.text}>
                            Mental illness or disorders are diagnosed conditions in which a person’s behaviour, thoughts, feelings
                            and mood are affected. Some common examples are Depression, Anxiety, Bipolar Disorder, and Eating Disorders.
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

export default MentalIllness;