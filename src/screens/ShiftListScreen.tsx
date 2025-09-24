import React, {useEffect, useCallback} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet} from 'react-native';
import {observer} from 'mobx-react-lite';
import {shiftsStore} from '../stores/ShiftsStore';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  List: undefined;
  Details: { id: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

const Item = React.memo(({item, onPress}: any) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{uri: item.logo}} style={styles.logo} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.companyName}</Text>
        <Text numberOfLines={1} style={styles.subtitle}>{item.address}</Text>
        <Text style={styles.row}>{item.dateStartByCity} {item.timeStartByCity} - {item.timeEndByCity}</Text>
        <Text style={styles.row}>Тип: {item.workTypes}</Text>
        <Text style={styles.row}>Выплата: {item.priceWorker} ₽</Text>
        <Text style={styles.row}>Набрано: {item.currentWorkers}/{item.planWorkers}</Text>
        <Text style={styles.row}>Рейтинг клиента: {item.customerRating} ({item.customerFeedbacksCount})</Text>
      </View>
    </TouchableOpacity>
  );
});

export const ShiftListScreen = observer(({navigation}: Props) => {
  useEffect(() => {
    shiftsStore.loadInitial();
  }, []);

  const keyExtractor = useCallback((item: any) => String(item.id), []);

  const renderItem = useCallback(({item}: any) => (
    <Item item={item} onPress={() => navigation.navigate('Details', {id: String(item.id)})} />
  ), [navigation]);

  if (shiftsStore.isLoading) {
    return (
      <View style={styles.center}> 
        <ActivityIndicator />
        <Text style={styles.loadingText}>Загрузка смен...</Text>
      </View>
    );
  }

  if (shiftsStore.error) {
    return (
      <View style={styles.center}>
        <Text>Ошибка: {shiftsStore.error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={shiftsStore.shifts}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
      initialNumToRender={10}
      windowSize={11}
      removeClippedSubviews
    />
  );
});

const styles = StyleSheet.create({
  listContent: { padding: 12 },
  card: { flexDirection: 'row', padding: 12, backgroundColor: '#fff', borderRadius: 10, marginBottom: 12, elevation: 2 },
  logo: { width: 56, height: 56, borderRadius: 8, marginRight: 12, backgroundColor: '#eee' },
  content: { flex: 1 },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  subtitle: { fontSize: 13, color: '#666', marginBottom: 6 },
  row: { fontSize: 13, marginTop: 2 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 8 },
});

export default ShiftListScreen;


