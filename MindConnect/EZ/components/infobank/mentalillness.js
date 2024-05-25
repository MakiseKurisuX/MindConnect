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