import * as React from 'react';
import { View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import MentalHealth from './mentalhealth';
import MentalIllness from './mentalillness';

const InfoBank = () => (
  <View>
    <MentalHealth />
    <Divider />
    <MentalIllness />
    <Divider />
  </View>
);

export default InfoBank;