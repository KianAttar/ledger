import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Expense } from '../types';

const CATEGORY_EMOJI: Record<Expense['category'], string> = {
  Food: '🍔',
  Transport: '🚗',
  Shopping: '🛍️',
  Health: '💊',
  Entertainment: '🎬',
  Other: '📦',
};

interface Props {
  expense: Expense;
  onPress: (expense: Expense) => void;
  onLongPress: (expense: Expense) => void;
}

export default function ExpenseItem({ expense, onPress, onLongPress }: Props) {
  const date = new Date(expense.date).toLocaleDateString('en-CA', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(expense)}
      onLongPress={() => onLongPress(expense)}
      activeOpacity={0.7}
    >
      <View style={styles.left}>
        <Text style={styles.emoji}>{CATEGORY_EMOJI[expense.category]}</Text>
        <View>
          <Text style={styles.category}>{expense.category}</Text>
          {expense.note ? <Text style={styles.note}>{expense.note}</Text> : null}
        </View>
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>${expense.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e5e5',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emoji: {
    fontSize: 28,
  },
  category: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  note: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  date: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 2,
  },
});
