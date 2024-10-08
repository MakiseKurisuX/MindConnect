import * as React from 'react';
import { View, Image, Button } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import MentalHealth from './mentalhealth';
import MentalIllness from './mentalillness';
import { COLORS } from '../../constants';

const InfoBank = () => (
  <View>
    <MentalHealth />
    <Divider  style={{backgroundColor: COLORS.oliveGreen}}/>
    <MentalIllness />
    <Divider  style={{backgroundColor: COLORS.oliveGreen}}/>
    <View style = {{alignItems: "center", marginTop: 40, marginBottom: 40}}>
      <Image
      source={{ uri: "https://images.squarespace-cdn.com/content/v1/5de82874ac2eb4212e1c3540/e84062e0-706a-4016-a775-ed805abb3835/Mental_Illness_V_Mental_Health_V1.png" }}
      style={{ height: 450, width: 345, borderRadius:10 }}
      />
    </View>
    <Divider  style={{backgroundColor: COLORS.oliveGreen}}/>
  </View>
);

export default InfoBank;