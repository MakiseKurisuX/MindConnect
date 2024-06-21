import React, { useState, useEffect } from 'react';
import { View, useWindowDimensions, StyleSheet, ActivityIndicator } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { auth, db } from '../../firebaseConfig'; 
import { doc, getDoc } from 'firebase/firestore';
import Form from './form'; 
import ConsultRequests from './consultRequests'; 
import ConsultHistory from './consultHistory'; 

const FirstRoute = ({ role }) => {
  if (role === 'user' || role === 'peer') {
    return <Form />;
  } else {
    return <ConsultRequests />;
  }
};

const SecondRoute = () => (
  <ConsultHistory /> 

const renderScene = (role) =>
  SceneMap({
    first: () => <FirstRoute role={role} />,
    second: SecondRoute,
  });

export default function TabViewExample() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    { key: 'first', title: 'Find Peer' },
    { key: 'second', title: 'Consult History' },
  ]);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, 'Users', user.uid));
          if (userDoc.exists()) {
            const role = userDoc.data().role;
            setRole(role);

            setRoutes([
              { key: 'first', title: (role === 'user' || role === 'peer') ? 'Consult Form' : 'Consult Requests' },
              { key: 'second', title: 'Consult History' },
            ]);
          }
        }
      } catch (error) {
        console.error("Error fetching user role: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#32CD32" />
      </View>
    );
  }

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene(role)}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={styles.indicator}
          style={styles.tabBar}
          labelStyle={styles.label}
        />
      )}
      swipeEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#32CD32', 
  },
  indicator: {
    backgroundColor: 'white', 
  },
  label: {
    color: 'white', 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});