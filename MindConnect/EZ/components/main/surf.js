import * as React from 'react';
import { Surface, Text } from 'react-native-paper';
import { StyleSheet, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Surf = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ImageBackground
            source={require('../../assets/images/Surf.png')}
            style={styles.bigSurface}
            imageStyle={{ borderRadius: 60 }}
            >
            <Surface style={styles.bigSurface} elevation={4}>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Surface style={styles.surface} elevation={4}>
                        <View style={styles.row}>
                            <Image source={require('../../assets/images/AppIcon.png')} style={styles.image} />
                            <Text>Login</Text>
                        </View>
                    </Surface>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Surface style={styles.surface} elevation={4}>
                        <View style={styles.row}>
                            <Image source={require('../../assets/images/AppIcon.png')} style={styles.image} />
                            <Text>Register</Text>
                        </View>
                    </Surface>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <Surface style={styles.surface} elevation={4}>
                        <View style={styles.row}>
                            <Image source={require('../../assets/images/AppIcon.png')} style={styles.image} />
                            <Text>Surface 3</Text>
                        </View>
                    </Surface>
                    <Surface style={styles.surface} elevation={4}>
                        <View style={styles.row}>
                            <Image source={require('../../assets/images/AppIcon.png')} style={styles.image} />
                            <Text>Surface 4</Text>
                        </View>
                    </Surface>
                </View>
            </Surface>
        </ImageBackground>
        </View>
    )
};

export default Surf;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bigSurface: {
        padding: 8,
        borderRadius: 5,
        backgroundColor: "transparent",
    },
    row: {
        flexDirection: 'row',
        marginBottom: 5,
        padding: 12,
    },
    surface: {
        padding: 8,
        height: 60,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
        borderRadius: 20,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 8, // Add margin to separate the image and text
    },
});

