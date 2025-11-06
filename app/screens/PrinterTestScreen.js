import { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import NyxPrinter, { PrintAlign, PrinterStatus } from "nyx-printer-react-native";

export default function PrinterTestScreen() {
  const [text, setText] = useState("");

  const handlePrint = async () => {
    try {
      // Check printer status first
      const status = await NyxPrinter.getPrinterStatus();
      if (status !== PrinterStatus.SDK_OK) {
        Alert.alert("Printer Error", `Printer not ready: ${PrinterStatus.msg(status)}`);
        return;
      }

      // Print the entered text
      await NyxPrinter.printText(text || "Hello from Expo!", {
        textSize: 36,
        align: PrintAlign.CENTER,
      });

      // End print job
      await NyxPrinter.printEndAutoOut();

      Alert.alert("Success", "Printing completed successfully!");
    } catch (err) {
      console.log("Printing error:", err);
      Alert.alert("Error", "Failed to print. Check the connection.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧾 Printer Test</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter text to print"
        value={text}
        onChangeText={setText}
      />
      <Button title="Print" onPress={handlePrint} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
});
