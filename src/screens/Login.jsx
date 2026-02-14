import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import {Users as InitialUsers} from '../data/data.js'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'



const Login = () => {
  const navigation = useNavigation()
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

const handleSubmit = async () => {
  if (!name || !password) {
    Alert.alert('Error', 'Please fill all fields')
    return
  }

  try {
    const storedUsers = await AsyncStorage.getItem('Users')
    const users = storedUsers ? JSON.parse(storedUsers) : InitialUsers

    const user = users.find(
      u => u.name === name && u.password === password
    )

    if (user) {
      Alert.alert('Login Successful')
      navigation.navigate('Home')
    } else {
      Alert.alert('Invalid Credentials')
    }
  } catch (error) {
    Alert.alert('Error', 'Something went wrong')
    console.error(error)
  }
}


  return (

    <LinearGradient
      colors={['#1E3A8A', '#3B82F6']}
      style={styles.container}
    >
      <SafeAreaView style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>

        <TextInput
          placeholder="Name"
          mode="outlined"
          value={name}
          onChangeText={setName}
          style={styles.input}
          outlineColor="#CBD5E1"
          activeOutlineColor="#3B82F6"
          left={<TextInput.Icon icon="account" />}
        />

        <TextInput
          placeholder="Password"
          mode="outlined"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          outlineColor="#CBD5E1"
          activeOutlineColor="#3B82F6"
          left={<TextInput.Icon icon="lock" />}
        />

        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonText}
          onPress={handleSubmit}
        >
          Login
        </Button>

        <TouchableOpacity onPress={()=>{navigation.navigate('Register')}}>
          <Text style={styles.linkText}>
            Don’t have an account? Register Now
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: wp(85),
    backgroundColor: '#F8FAFC',
    paddingVertical: hp(4),
    paddingHorizontal: wp(6),
    borderRadius: 16,
    elevation: 8,
    gap: hp(2),
  },

  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: hp(1),
  },

  input: {
    backgroundColor: '#FFFFFF',
  },

  button: {
    marginTop: hp(1),
    borderRadius: 8,
    paddingVertical: hp(0.5),
    backgroundColor: '#1E3A8A',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },

  linkText: {
    textAlign: 'center',
    marginTop: hp(2),
    color: '#2563EB',
    fontSize: 14,
  },
})
