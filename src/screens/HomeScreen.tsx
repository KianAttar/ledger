import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExpenseItem from '../components/ExpenseItem';
import { Expense } from '../types';

const SEED_DATA: Expense[] = [
  { id: '1', amount: 24.50, category: 'Food', note: 'Lunch at work', date: '2026-06-04' },
  { id: '2', amount: 8.75, category: 'Transport', note: 'Bus pass top-up', date: '2026-06-03' },
  { id: '3', amount: 112.00, category: 'Shopping', note: 'Running shoes', date: '2026-06-02' },
  { id: '4', amount: 15.00, category: 'Health', note: 'Vitamins', date: '2026-06-01' },
  { id: '5', amount: 42.00, category: 'Entertainment', note: 'Concert tickets', date: '2026-05-31' },
  { id: '6', amount: 6.50, category: 'Food', note: 'Coffee', date: '2026-05-30' },
  { id: '7', amount: 200.00, category: 'Other', note: 'Birthday gift', date: '2026-05-29' },
];

const total = SEED_DATA.reduce((sum, e) => sum + e.amount, 0);

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>Ledger</Text>
        <Text style={styles.total}>${total.toFixed(2)}</Text>
        <Text style={styles.totalLabel}>spent this month</Text>
      </View>

      <FlatList
        data={SEED_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseItem expense={item} onPress={(e) => console.log('tapped', e.id)} />
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    paddingVertical: 28,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e5e5',
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#aaa',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  total: {
    fontSize: 40,
    fontWeight: '800',
    color: '#1a1a1a',
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  list: {
    paddingTop: 8,
  },
});
