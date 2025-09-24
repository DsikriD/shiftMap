import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {observer} from 'mobx-react-lite';
import {shiftsStore} from '../stores/ShiftsStore';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  List: undefined;
  Details: { id: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export const ShiftDetailsScreen = observer(({route}: Props) => {
  const {id} = route.params;
  const item = shiftsStore.getById(id);

  if (!item) {
    return (
      <View style={styles.center}>
        <Text>Смена не найдена</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{uri: item.logo}} style={styles.logo} />
      <Text style={styles.title}>{item.companyName}</Text>
      <Text style={styles.subtitle}>{item.address}</Text>
      <Text style={styles.row}>{item.dateStartByCity} {item.timeStartByCity} - {item.timeEndByCity}</Text>
      <Text style={styles.row}>Тип услуги: {item.workTypes}</Text>
      <Text style={styles.row}>Выплата: {item.priceWorker} ₽</Text>
      <Text style={styles.row}>Набрано: {item.currentWorkers}/{item.planWorkers}</Text>
      <Text style={styles.row}>Отзывы: {item.customerFeedbacksCount}</Text>
      <Text style={styles.row}>Рейтинг: {item.customerRating} / 5</Text>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: { padding: 16 },
  logo: { width: 96, height: 96, borderRadius: 12, alignSelf: 'center', backgroundColor: '#eee' },
  title: { fontSize: 20, fontWeight: '700', textAlign: 'center', marginTop: 12 },
  subtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginTop: 4 },
  row: { fontSize: 15, marginTop: 12 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default ShiftDetailsScreen;


