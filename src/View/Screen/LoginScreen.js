import {
    Alert,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import COLORS from '../../conts/colors';
import Input from '../Components/Input';
import icons from '../../conts/icons';
import Buttons from '../Components/Buttons';
import Loader from '../Components/Loader';
import axios from 'axios';

const LoginScreen = ({navigation}) => {
  const [inputs, setInputs] = React.useState({
    email: '',
    name: '',
    mobile_no: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = data => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    }

    if (isValid) {
      login(data);
    }
  };
  const login = value => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      try {
        const loginData = await axios.post(
            `http://localhost:3000/user/login`,
            value
            // navigation.navigate('Home')
          )   
          console.log(loginData, "Login herer...");
          console.log(loginData.data.message);
          if(loginData.data.code == 200 ){
              console.log("Login ho gya re babba");
              navigation.navigate("Home")
          }else{
              Alert.alert("Error", loginData.data.message)
          }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
         console.log(error);
      }
    }, 1000);
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  console.log(inputs);
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 50,
          paddingHorizontal: 20,
          backgroundColor: '#fff',
          height: '100%',
        }}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.description}>Enter Your Details to Login</Text>
        <View style={{marginVertical: 20}}>
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
            autoCapitalize="none"
            iconName={icons.mail}
          />
          <Input
            label="password"
            iconName={icons.password}
            placeholder="Enter your password"
            error={errors.password}
            onFocus={() => handleError(null, 'password')}
            onChangeText={text => handleOnchange(text, 'password')}
            password
          />
          <Buttons title="Login" onPres={() => validate(inputs)} />
          <Text
            onPress={() => navigation.navigate('Register')}
            style={{
              color: COLORS.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Don't have an account? Register
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  description: {
    fontSize: 18,
    color: COLORS.grey,
    marginVertical: 10,
  },
});
