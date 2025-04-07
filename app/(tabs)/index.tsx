import { StyleSheet, Button, ScrollView, SafeAreaView } from "react-native";
import { useState } from "react";
import { fetch } from "expo/fetch";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const [fetchResult, setFetchResult] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const handlePostRequest = async () => {
    setFetchResult(null);
    setFetchError(null);
    try {
      console.log("Sending POST request without body...");
      const response = await fetch("https://httpbin.org/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body is intentionally omitted
      });
      console.log("Request successful:", response.status, response.statusText);
      const data = await response.json();
      setFetchResult(
        `Success! Status: ${response.status}. Response data: ${JSON.stringify(
          data,
          null,
          2
        )}`
      );
    } catch (error: any) {
      console.error("Fetch error:", error);
      let errorString;
      try {
        errorString = JSON.stringify(error, Object.getOwnPropertyNames(error));
      } catch (stringifyError) {
        errorString = `Failed to stringify error: ${error.message || error}`;
      }
      setFetchError(`Failed: ${errorString}`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText type="subtitle">MRE: Body-less POST</ThemedText>
        <ThemedText>
          Tap the button to send a POST request to https://httpbin.org/post
          without a body using expo/fetch.
        </ThemedText>
        <Button
          title="Send POST Request (No Body)"
          onPress={handlePostRequest}
        />
        {fetchResult && (
          <ThemedText style={styles.resultText}>
            Result: {fetchResult}
          </ThemedText>
        )}
        {fetchError && (
          <ThemedText style={styles.errorText}>Error: {fetchError}</ThemedText>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 16,
  },
  container: {
    flexGrow: 1,
    padding: 32,
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  resultText: {
    color: "green",
  },
  errorText: {
    color: "red",
    marginTop: 8,
  },
});
