import React from 'react';
import { Card, Text } from 'react-native-paper';

const MentalHealth = () => {
    return (
        <Card>
            <Card.Title title="Mental Health" subtitle="Test" />
            <Card.Content>
                <Text>
                    Mental health refers to the state of mental well-being which plays an integral role in our daily lives. It comprises psychological, social and emotional well-being.
                    Having good mental health helps us better cope with the stresses of life, develop our abilities such as collaboration or learning, and feel better overall.
                </Text>
            </Card.Content>
            <Card.Actions>
                {/* Add your actions here */}
            </Card.Actions>
        </Card>
    );
};

export default MentalHealth;