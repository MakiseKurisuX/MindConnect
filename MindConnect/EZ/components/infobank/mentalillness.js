import * as React from 'react';
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

export default MentalIllness;