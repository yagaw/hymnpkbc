import React, { Component } from "react"
import { Text, View, TextInput, FlatList, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import AsyncStorage from "@react-native-async-storage/async-storage"
import hymns from "../assets/pwohymn.json" // Import the JSON data
import settingsData from "../assets/settings.json" // Import the settings JSON data

interface HymnItem {
  id: number
  title: string
  description: string
}

interface HymnState {
  searchQuery: string
  searchResults: HymnItem[]
  fontSize: number
}

const STORAGE_KEY = "@hymn_font_size"

export default class Hymn extends Component<{}, HymnState> {
  state: HymnState = {
    searchQuery: "",
    searchResults: [],
    fontSize: settingsData.fontSize, // Load the default font size from settings.json
  }

  componentDidMount() {
    this.loadSavedFontSize()
  }

  loadSavedFontSize = async () => {
    try {
      const savedSize = await AsyncStorage.getItem(STORAGE_KEY)
      if (savedSize) {
        this.setState({ fontSize: JSON.parse(savedSize) })
      }
    } catch (error) {
      console.error("Error loading font size:", error)
    }
  }

  handleSearch = () => {
    const { searchQuery } = this.state
    const results = hymns.filter(
      (hymn) =>
        hymn.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hymn.id.toString() === searchQuery
    )
    this.setState({ searchResults: results })
  }

  render() {
    const { searchQuery, searchResults, fontSize } = this.state

    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <View
          style={[
            styles.searchContainer,
            { marginLeft: 20 },
            { marginRight: 20 },
          ]}
        >
          <Icon name="search" size={20} color="#000" style={styles.icon} />
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              this.setState({ searchQuery: text }, this.handleSearch)
            }}
            value={searchQuery}
            placeholder="Search Number Here"
          />
          {searchQuery !== "" && (
            <Icon
              name="times-circle"
              size={20}
              color="#000"
              style={styles.icon}
              onPress={() =>
                this.setState({ searchQuery: "", searchResults: [] })
              }
            />
          )}
        </View>
        {searchQuery !== "" && (
          <FlatList<HymnItem>
            data={searchResults}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <Text style={[styles.title, { fontSize }]}>{item.title}</Text>
                <Text style={[styles.description, { fontSize }]}>
                  {item.description}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e0e0e2",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#e0e0e2",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 50,
  },
  description: {
    textAlign: "center",
    paddingBottom: 50,
  },
})
