import * as React from 'react';
import { View } from 'react-native';
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
  </View>
);

export default InfoBank;