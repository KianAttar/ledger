/*
Your spec:

Build a screen called ExpenseList. It receives this hardcoded data:


const EXPENSES = [
  { id: '1', title: 'Coffee', amount: 4.50, category: 'Food' },
  { id: '2', title: 'Bus pass', amount: 12.00, category: 'Transport' },
  { id: '3', title: 'Lunch', amount: 18.75, category: 'Food' },
  { id: '4', title: 'Gym', amount: 45.00, category: 'Health' },
  { id: '5', title: 'Groceries', amount: 67.20, category: 'Food' },
  { id: '6', title: 'Taxi', amount: 22.00, category: 'Transport' },
];
Requirements:

Render the list — each item shows the title, category, and amount
Three filter buttons at the top: All, Food, Transport — tapping one filters the list
The active filter button looks visually different from the inactive ones
Rules:

Single file, one component
No external libraries — just react-native imports
TypeScript
30 minutes
*/
import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Category, Expense } from "../types";
import ExpenseItem from "./ExpenseItem";

const CATEGORIES: Category[] = [
  "Food",
  "Transport",
  "Shopping",
  "Health",
  "Entertainment",
  "Other",
];

export default function ExpenseList({ expenses }: { expenses: Expense[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredExpenses =
    selectedCategory && selectedCategory !== "All"
      ? expenses.filter((exp) => exp.category === selectedCategory)
      : expenses;

  return (
    <View style={styles.container}>
      <View style={styles.filterBtnsContainer}>
        {["All", ...CATEGORIES].map((category) => (
          <TouchableOpacity
            style={[
              styles.filterBtn,
              category === selectedCategory ? styles.filterBtnActive : null,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredExpenses}
        keyExtractor={(item) => item.id}
        renderItem={({ index, item }) => (
          <ExpenseItem
            expense={item}
            key={item.id}
            onPress={() => {}}
            onLongPress={() => {}}
          ></ExpenseItem>
          //   <View id={item.id}>
          //     <View>
          //       <Text>{item.title}</Text>
          //       <Text>{item.category}</Text>
          //     </View>
          //     <Text>${item.amount.toFixed(2)}</Text>
          //   </View>
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d7d7d7",
  },
  filterBtnsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  expenseList: {
    flex: 1,
  },
  filterBtn: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#c2c2c2",
  },
  filterBtnActive: {
    backgroundColor: "#efefef",
  },
});
