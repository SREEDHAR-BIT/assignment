import { StyleSheet, Text, Alert, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import React, { use, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Users as InitialUsers } from '../data/data.js'
import LinearGradient from 'react-native-linear-gradient'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'





const Register = () => {
  const navigation = useNavigation()
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const handleChange = (key, value) => {
    setData({ ...data, [key]: value })
  }

  const handleSubmit = async () => {
    if(!data.name || !data.email || !data.phone || !data.password){
      Alert.alert('Error', 'Please fill all fields')
      return
    }

    if(data.password.length <8){
      Alert.alert('Error', 'Password must be at least 8 characters')
      return
    }

    if(data.password !== data.confirmPassword){
      Alert.alert('Error', 'Passwords do not match')
      return
    }

    if(!data.email.includes('@') ){
      Alert.alert('Error', 'Invalid email')
      return
    }

    try {
      const storedUsers = await AsyncStorage.getItem('Users')
      const parsedUsers = storedUsers ? JSON.parse(storedUsers) : InitialUsers

      parsedUsers.push(data)
      await AsyncStorage.setItem('Users', JSON.stringify(parsedUsers))

      Alert.alert('Registered Successfully')
      console.log(data)
      navigation.navigate('Login')

    } catch (error) {
      console.error('Error saving user:', error)
    }
  }

  return (
    <LinearGradient
      colors={['#1E3A8A', '#3B82F6']}
      style={styles.container}
    >
      <SafeAreaView style={styles.card}>
        <Text style={styles.title}>Create Account</Text>

        <TextInput
          placeholder="Username"
          mode="outlined"
          value={data.name}
          onChangeText={(text) => handleChange('name', text)}
          style={styles.input}
          activeOutlineColor="#3B82F6"
          left={<TextInput.Icon icon="account" />}
        />

        <TextInput
          placeholder="E-mail"
          mode="outlined"
          value={data.email}
          onChangeText={(text) => handleChange('email', text)}
          style={styles.input}
          activeOutlineColor="#3B82F6"
          left={<TextInput.Icon icon="email" />}
        />

        <TextInput
          placeholder="Phone"
          mode="outlined"
          value={data.phone}
          onChangeText={(text) => handleChange('phone', text)}
          style={styles.input}
          keyboardType="phone-pad"
          activeOutlineColor="#3B82F6"
          left={<TextInput.Icon icon="phone" />}
        />

        <TextInput
          placeholder="Password"
          mode="outlined"
          secureTextEntry
          value={data.password}
          onChangeText={(text) => handleChange('password', text)}
          style={styles.input}
          activeOutlineColor="#3B82F6"
          left={<TextInput.Icon icon="lock" />}
        />

        <TextInput
          placeholder="Confirm Password"
          mode="outlined"
          secureTextEntry
          style={styles.input}
          onChangeText={(text) => handleChange('confirmPassword', text)}
          activeOutlineColor="#3B82F6"
          left={<TextInput.Icon icon="lock" />}
        />

        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonText}
          onPress={handleSubmit}
        >
          Register
        </Button>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: wp(88),
    backgroundColor: '#F8FAFC',
    paddingVertical: hp(4),
    paddingHorizontal: wp(6),
    borderRadius: 16,
    elevation: 8,
    gap: hp(1.8),
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
    backgroundColor: '#1E3A8A',
    paddingVertical: hp(0.6),
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
})
