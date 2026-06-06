import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import ExpenseItem from './ExpenseItem';
import { Expense } from '../types';

interface Props {
  expense: Expense;
  index: number;
  onPress: (expense: Expense) => void;
  onLongPress: (expense: Expense) => void;
}

export default function AnimatedExpenseItem({ expense, index, onPress, onLongPress }: Props) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(16);

  useEffect(() => {
    const delay = index * 60;
    opacity.value = withDelay(delay, withTiming(1, { duration: 300 }));
    translateY.value = withDelay(delay, withTiming(0, { duration: 300 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <ExpenseItem expense={expense} onPress={onPress} onLongPress={onLongPress} />
    </Animated.View>
  );
}
