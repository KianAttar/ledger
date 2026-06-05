import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExpenseItem from '../components/ExpenseItem';
import { useExpenseStore } from '../store/useExpenseStore';
import { Expense } from '../types';

export default function HomeScreen() {
  const expenses = useExpenseStore((state) => state.expenses);
  const deleteExpense = useExpenseStore((state) => state.deleteExpense);

  const now = new Date();
  const thisMonthExpenses = expenses.filter((e) => {
    const d = new Date(e.date);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  });
  const total = thisMonthExpenses.reduce((sum, e) => sum + e.amount, 0);

  const handleLongPress = (expense: Expense) => {
    Alert.alert(
      'Delete expense?',
      `${expense.category} — $${expense.amount.toFixed(2)}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteExpense(expense.id) },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>Ledger</Text>
        <Text style={styles.total}>${total.toFixed(2)}</Text>
        <Text style={styles.totalLabel}>spent this month</Text>
      </View>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseItem
            expense={item}
            onPress={(e) => console.log('tapped', e.id)}
            onLongPress={handleLongPress}
          />
        )}
        contentContainerStyle={expenses.length === 0 ? styles.empty : styles.list}
        ListEmptyComponent={
          <View style={styles.emptyInner}>
            <Text style={styles.emptyIcon}>💸</Text>
            <Text style={styles.emptyText}>No expenses yet</Text>
            <Text style={styles.emptySub}>Tap Add to log your first one</Text>
          </View>
        }
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
  empty: {
    flex: 1,
  },
  emptyInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: 16,
  },
  emptySub: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 6,
  },
});
