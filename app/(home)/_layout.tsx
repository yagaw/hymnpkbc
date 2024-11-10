import { Text, View } from "react-native"
import React, { Component } from "react"
import { MaterialIcons } from "@expo/vector-icons"
import { Tabs } from "expo-router"

export default class _layoyt extends Component {
  render() {
    return (
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: "PKBC Hymns",
            tabBarIcon: () => <MaterialIcons name="music-note" size={29} />,
            tabBarLabelStyle: { fontWeight: "bold" }, // Make the title bold
            headerTitleStyle: { fontWeight: "bold" }, //make the header title bold
          }}
        />
        <Tabs.Screen
          name="setting"
          options={{
            title: "Setting",
            tabBarIcon: () => <MaterialIcons name="book" size={29} />,
            tabBarLabelStyle: { fontWeight: "bold" }, // Make the title bold
            headerTitleStyle: { fontWeight: "bold" }, //make the header title bold
          }}
        />
      </Tabs>
    )
  }
}
