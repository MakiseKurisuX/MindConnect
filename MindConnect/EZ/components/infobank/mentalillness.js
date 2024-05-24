import * as React from 'react';
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';

const MentalIllness = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <PaperProvider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Mental illness or disorders are diagnosed conditions in which a person’s behaviour, thoughts, feelings and mood are affected. Some common examples are Depression, Anxiety and Bipolar Disorder and Eating Disorders.</Text>
        </Modal>
      </Portal>
      <Button style={{marginTop: 30}} onPress={showModal}>
        Mental Illness
      </Button>
    </PaperProvider>
  );
};

export default MentalIllness;