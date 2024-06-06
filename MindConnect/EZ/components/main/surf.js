import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import { Surface, Text, Button } from 'react-native-paper';
import { StyleSheet, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig'; // Updated to use 'db'
import { doc, getDoc } from 'firebase/firestore';

const Surf = () => {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    const [firstName, setFirstName] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        if (user) {
            const fetchUserData = async () => {
                try {
                    const userDoc = await getDoc(doc(db, 'Users', user.uid)); // Updated to use 'db'
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        setFirstName(data.firstName);
                        setRole(data.role);
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching user data: ", error);
                }
            };

            fetchUserData();
        }
    }, [user]);

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
                                <Text style={styles.welcomeText}>Hello, {firstName}</Text>
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
                    {role === 'peer' ? (
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUpCounsellor')}>
                                <Surface style={styles.surface} elevation={4}>
                                    <View style={styles.row}>
                                        <Image source={require('../../assets/images/AppIcon.png')} style={styles.image} />
                                        <Text>Sign Up as Counsellor</Text>
                                    </View>
                                </Surface>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleLogout}>
                                <Surface style={styles.surface} elevation={4}>
                                    <View style={styles.row}>
                                        <Image source={require('../../assets/images/AppIcon.png')} style={styles.image} />
                                        <Text>Logout</Text>
                                    </View>
                                </Surface>
                            </TouchableOpacity>
                        </View>
                    ) : role === 'counsellor' ? (
                        <View style={styles.row}>
                            <TouchableOpacity onPress={handleLogout}>
                                <Surface style={styles.surface} elevation={4}>
                                    <View style={styles.row}>
                                        <Image source={require('../../assets/images/AppIcon.png')} style={styles.image} />
                                        <Text>Logout</Text>
                                    </View>
                                </Surface>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <>
                            <View style={styles.row}>
                                <TouchableOpacity onPress={() => navigation.navigate('SignUpPeer')}>
                                    <Surface style={styles.surface} elevation={4}>
                                        <View style={styles.row}>
                                            <Image source={require('../../assets/images/AppIcon.png')} style={styles.image} />
                                            <Text>Sign Up as a Peer</Text>
                                        </View>
                                    </Surface>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('SignUpCounsellor')}>
                                    <Surface style={styles.surface} elevation={4}>
                                        <View style={styles.row}>
                                            <Image source={require('../../assets/images/AppIcon.png')} style={styles.image} />
                                            <Text>Sign Up as Counsellor</Text>
                                        </View>
                                    </Surface>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.logoutRow}>
                                <TouchableOpacity onPress={handleLogout} style={{ width: '100%', alignItems: 'center' }}>
                                    <Surface style={[styles.surface, styles.logoutSurface]} elevation={4}>
                                        <View style={styles.row}>
                                            <Image source={require('../../assets/images/AppIcon.png')} style={styles.image} />
                                            <Text>Logout</Text>
                                        </View>
                                    </Surface>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </Surface>
            </ImageBackground>
        </View>
    );
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
        marginBottom: 0, // Reduce space between buttons
        padding: 12,
    },
    logoutRow: {
        padding: 12,
        width: '100%',
        alignItems: 'center',
        marginTop: 10, // Adjust space between the button rows
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
    logoutSurface: {
        width: '90%',
        alignSelf: 'center',
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 8, 
    },
});