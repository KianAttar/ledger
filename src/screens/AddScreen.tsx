import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabParamList } from "../navigation";
import { useExpenseStore } from "../store/useExpenseStore";
import { Category } from "../types";

type NavProp = BottomTabNavigationProp<TabParamList, "Add">;

const CATEGORIES: Category[] = [
  "Food",
  "Transport",
  "Shopping",
  "Health",
  "Entertainment",
  "Other",
];

export default function AddScreen() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("Food");
  const [note, setNote] = useState("");

  const addExpense = useExpenseStore((state) => state.addExpense);
  const navigation = useNavigation<NavProp>();

  const handleSave = () => {
    const parsed = parseFloat(amount);
    if (!parsed || parsed <= 0) {
      Alert.alert("Invalid amount", "Enter a number greater than zero.");
      return;
    }
    addExpense({
      amount: parsed,
      category,
      note: note.trim(),
      date: new Date().toISOString(),
    });
    setAmount("");
    setNote("");
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.form}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.heading}>New Expense</Text>

          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            placeholderTextColor="#ccc"
            keyboardType="decimal-pad"
            autoFocus
          />

          <Text style={styles.label}>Category</Text>
          <View style={styles.chips}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.chip, category === cat && styles.chipActive]}
                onPress={() => setCategory(cat)}
              >
                <Text
                  style={[
                    styles.chipText,
                    category === cat && styles.chipTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Note</Text>
          <TextInput
            style={styles.noteInput}
            value={note}
            onChangeText={setNote}
            placeholder="What was this for?"
            placeholderTextColor="#ccc"
            returnKeyType="done"
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  flex: {
    flex: 1,
  },
  form: {
    padding: 24,
    gap: 8,
  },
  heading: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#888",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginTop: 12,
    marginBottom: 4,
  },
  amountInput: {
    fontSize: 36,
    fontWeight: "700",
    color: "#1a1a1a",
    borderBottomWidth: 2,
    borderBottomColor: "#1a1a1a",
    paddingVertical: 8,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#ececec",
  },
  chipActive: {
    backgroundColor: "#1a1a1a",
  },
  chipText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
  },
  chipTextActive: {
    color: "#fff",
  },
  noteInput: {
    fontSize: 16,
    color: "#1a1a1a",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 14,
    marginTop: 4,
  },
  saveButton: {
    marginTop: 32,
    backgroundColor: "#1a1a1a",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
