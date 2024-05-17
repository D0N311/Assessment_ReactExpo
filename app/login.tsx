import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Text, View } from "@/components/Themed";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !validateEmail(email)) {
      Alert.alert("Invalid email", "Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.BASE_URL + "api/login",
        {
          email,
          password,
        }
      );
      setLoading(false);
      if (response.data.token) {
        Alert.alert("Success", "You have successfully logged in.");
      }
    } catch (e) {
      console.log(`email ${email}, Password: ${password}`);
      setLoading(false);
      Alert.alert("Error", "Invalid email or password.");
    }
  };

  const validateEmail = (email: string) => {
    var re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        textContentType="emailAddress"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    marginBottom: 10,
  },
});
