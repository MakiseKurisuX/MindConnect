import * as React from 'react';
import { Alert } from 'react-native';
import { Surface, Text, Button } from 'react-native-paper';
import { StyleSheet, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const Surf = () => {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                Alert.alert("Success", "You have successfully logged out!");
                navigation.navigate('Home');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <View style={styles.container}>
            <ImageBackground
            source={require('../../assets/images/Surf.png')}
            style={styles.bigSurface}
            imageStyle={{ borderRadius: 60 }}
            >
            <Surface style={styles.bigSurface} elevation={4}>
                <View style={styles.row}>
                    {user ? (
                        <View style={styles.row}>
                            <Text style={styles.welcomeText}>Hello, {user.email}</Text>
                            <Button
                                    mode="contained"
                                    onPress={handleLogout}
                                    style={styles.logoutButton}
                                >
                                Logout
                            </Button>
                        </View>
                    ) : (
                        <>
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
                                        <Text>Register as Counsellor</Text>
                                    </View>
                                </Surface>
                            </TouchableOpacity>
                        </>
                    )}
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
    welcomeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 8, // Add margin to separate the image and text
    },
});
