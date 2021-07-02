import { black, white } from "color-name";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Header } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [text, setText] = useState("");
  const [isSearchPressed, searchPressed] = useState(false);
  const [word, setWord] = useState("");
  const [lexicalCategory, setLexicalCategory] = useState("");
  const [definition, setDefinition] = useState("");

  const getWord = (vocab) => {
    var searchKeyWord = vocab.toLowerCase();
    var url =
      "https://rupinwhitehatjr.github.io/dictionary/" + searchKeyWord + ".json";

    return fetch(url)
      .then((data) => {
        if (data.status === 200) {
          return data.json();
        } else {
          return null;
        }
      })
      .then((response) => {
        var responseObj = response;

        if (responseObj) {
          var wordData = responseObj.definitions[0];

          var vocabDefinition = wordData.description;
          var vocabCategory = wordData.wordtype;

          setWord(text);
          setDefinition(vocabDefinition);
          setLexicalCategory(vocabCategory);
        } else {
          setWord(text);
          setDefinition("Not Found");
          setLexicalCategory("Unknown");
        }
      });
  };

  return (
    <SafeAreaProvider>
      <View>
        <Header
          centerComponent={{
            text: "Online Dictionary",
          }}
        />
        <TextInput
          style={styles.inputBox}
          onChangeText={(vocab) => {
            setText(vocab);
            searchPressed(false);
            setWord("Loading...");
            setLexicalCategory("");
            setDefinition("");
          }}
          value={text}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            searchPressed(true);
            getWord(text);
          }}
        >
          <Text style={{ textAlign: "center", padding: 10, color: "white" }}>
            Search
          </Text>
        </TouchableOpacity>

        <View style={styles.wordInfo}>
          <Text style={{ fontSize: 50 }}>Word: {word}</Text>
          <Text style={{ fontSize: 50 }}>
            Lexical Category: {lexicalCategory}
          </Text>
          <Text style={{ fontSize: 25 }}> Definition: {definition} </Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    borderWidth: 4,
    width: "50%",
    height: 40,
    margin: 50,
    alignSelf: "center",
    textAlign: "center",
  },
  searchButton: {
    backgroundColor: "blue",
    width: 100,
    height: 40,
    alignSelf: "center",
  },
  wordInfo: {
    alignItems: "center",
    marginTop: 50,
  },
});
