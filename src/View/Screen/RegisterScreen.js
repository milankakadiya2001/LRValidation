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

const RegisterScreen = ({navigation}) => {
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
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }

    if (!inputs.name) {
      handleError('Please input name', 'name');
      isValid = false;
    }

    if (!inputs.mobile_no) {
      handleError('Please input phone number', 'mobile_no');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError('Min password length of 5', 'password');
      isValid = false;
    }

    if (isValid) {
      register(data);
    }
  };
  const register = value => {
    setLoading(true);
    setTimeout(async () => {
      try {
        setLoading(false);
        const registerData = await axios.post(
          `http://localhost:3000/user/register`,
          value
        )
        console.log(registerData.data);
        if(registerData.data.code == 200 ){
          console.log("Login Successfully");
          navigation.navigate("Home")
      }else{
          Alert.alert("Error", registerData.data.message)
      }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
      }
    }, 1500);
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
        <Text style={styles.title}>Register</Text>
        <Text style={styles.description}>Enter Your Details to Register</Text>
        <View style={{marginVertical: 20}}>
          
          <Input
            label="Full Name"
            iconName={icons.user}
            placeholder="Enter your full name"
            error={errors.name}
            onFocus={() => handleError(null, 'name')}
            onChangeText={text => handleOnchange(text, 'name')}
          />
          <Input
            label="Phone Number"
            iconName={icons.phone}
            placeholder="Enter your phone no."
            error={errors.mobile_no}
            onFocus={() => handleError(null, 'mobile_no')}
            onChangeText={text => handleOnchange(text, 'mobile_no')}
          />
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
          <Buttons title="Register" onPres={() => validate(inputs)} />
          <Text
            onPress={() => navigation.navigate('Login')}
            style={{
              color: COLORS.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Already have an account? Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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
