import React, { Component } from "react"
import { Text, View, TextInput, FlatList, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import hymns from "../assets/pwohymn.json" // Import the JSON data

interface HymnItem {
  id: number
  title: string
  description: string
}

export default class Hymn extends Component {
  state = {
    searchQuery: "",
    searchResults: [],
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
    const { searchQuery, searchResults } = this.state

    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <View style={styles.searchContainer}>
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
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
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
    borderWidth: 3,
    borderColor: "#e0e0e2",
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#e0e0e2",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 5,
  },
  title: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "Padauk-Bold", // Updated custom font name
  },
  description: {
    textAlign: "center",
    paddingBottom: 20,
    fontFamily: "Padauk-Regular", // Updated custom font name
  },
})
