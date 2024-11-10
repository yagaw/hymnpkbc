import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import settingsData from "../assets/settings.json"

const STORAGE_KEY = "@hymn_font_size"

export default function Setting() {
  const [fontSize, setFontSize] = useState(settingsData.fontSizes.medium)

  useEffect(() => {
    loadSavedFontSize()
  }, [])

  const loadSavedFontSize = async () => {
    try {
      const savedSize = await AsyncStorage.getItem(STORAGE_KEY)
      if (savedSize) {
        setFontSize(JSON.parse(savedSize))
      }
    } catch (error) {
      console.error("Error loading font size:", error)
    }
  }

  const handleSetFontSize = async (size: number) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(size))
      setFontSize(size)
      // Simulate updating settings.json by logging the new settings
      console.log("Updated settings.json:", { ...settingsData, fontSize: size })
    } catch (error) {
      console.error("Error saving font size:", error)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Font Size Settings</Text>

        <View style={styles.previewContainer}>
          <Text style={styles.previewLabel}>Preview</Text>
          <Text style={[styles.previewText, { fontSize }]}>
            Amazing grace! How sweet the sound
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          {Object.entries(settingsData.fontSizes).map(([label, size]) => (
            <TouchableOpacity
              key={label}
              style={[
                styles.sizeButton,
                fontSize === size && styles.selectedButton,
              ]}
              onPress={() => handleSetFontSize(size as number)}
            >
              <Text
                style={[
                  styles.buttonText,
                  fontSize === size && styles.selectedButtonText,
                ]}
              >
                {label.charAt(0).toUpperCase() + label.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  previewContainer: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    marginBottom: 24,
  },
  previewLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  previewText: {
    textAlign: "center",
  },
  optionsContainer: {
    gap: 12,
  },
  sizeButton: {
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#87CEEB",
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
  },
  selectedButtonText: {
    color: "#fff",
  },
})
