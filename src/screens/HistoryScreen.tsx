import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VictoryPie } from "victory-native";
import { useExpenseStore } from "../store/useExpenseStore";
import { Category } from "../types";

const CATEGORIES: Category[] = [
  "Food",
  "Transport",
  "Shopping",
  "Health",
  "Entertainment",
  "Other",
];

const SHORT: Record<Category, string> = {
  Food: "Food",
  Transport: "Bus",
  Shopping: "Shop",
  Health: "Health",
  Entertainment: "Fun",
  Other: "Other",
};

export default function HistoryScreen() {
  const expenses = useExpenseStore((state) => state.expenses);

  const now = new Date();
  const thisMonth = expenses.filter((e) => {
    const d = new Date(e.date);
    return (
      d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
    );
  });

  const totals = CATEGORIES.map((cat) => ({
    category: cat,
    total: thisMonth
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0),
  }));

  const grandTotal = totals.reduce((sum, t) => sum + t.total, 0);

  const chartData = totals
    .filter((t) => t.total > 0)
    .map((t) => ({ x: SHORT[t.category], y: t.total }));

  const monthLabel = now.toLocaleDateString("en-CA", {
    month: "long",
    year: "numeric",
  });

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>History</Text>
        <Text style={styles.month}>{monthLabel}</Text>
        <Text style={styles.grandTotal}>${grandTotal.toFixed(2)}</Text>
        <Text style={styles.grandLabel}>total spent</Text>

        {chartData.length > 0 ? (
          <View style={styles.chartContainer}>
            <VictoryPie
              data={chartData}
              height={260}
              padding={{ top: 20, bottom: 20, left: 60, right: 60 }}
              colorScale={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"]}
              labels={({ datum }) => `${datum.x}\n$${datum.y.toFixed(0)}`}
              style={{
                labels: { fontSize: 11, fill: "#333", fontWeight: "600" },
              }}
              animate={{ duration: 400 }}
            />
          </View>
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📊</Text>
            <Text style={styles.emptyText}>No data this month</Text>
            <Text style={styles.emptySub}>Add some expenses to see your breakdown</Text>
          </View>
        )}

        <Text style={styles.breakdownTitle}>Breakdown</Text>
        {totals
          .filter((t) => t.total > 0)
          .sort((a, b) => b.total - a.total)
          .map((t) => (
            <View key={t.category} style={styles.row}>
              <Text style={styles.rowCategory}>{t.category}</Text>
              <View style={styles.rowRight}>
                <Text style={styles.rowAmount}>${t.total.toFixed(2)}</Text>
                <Text style={styles.rowPercent}>
                  {grandTotal > 0
                    ? `${Math.round((t.total / grandTotal) * 100)}%`
                    : "0%"}
                </Text>
              </View>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    color: "#aaa",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  month: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a1a",
    marginTop: 6,
  },
  grandTotal: {
    fontSize: 40,
    fontWeight: "800",
    color: "#1a1a1a",
    marginTop: 4,
  },
  grandLabel: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },
  chartContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginTop: 24,
    overflow: "hidden",
    alignItems: "center",
  },
  empty: {
    alignItems: "center",
    paddingVertical: 48,
  },
  emptyIcon: {
    fontSize: 40,
  },
  emptyText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1a1a1a",
    marginTop: 12,
  },
  emptySub: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 4,
  },
  breakdownTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#aaa",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginTop: 32,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e5e5",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    marginBottom: 1,
  },
  rowCategory: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  rowRight: {
    alignItems: "flex-end",
  },
  rowAmount: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  rowPercent: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 2,
  },
});
