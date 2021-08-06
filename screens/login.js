import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, Image } from 'react-native';
import fire from '../fire'
import { LinearGradient } from 'expo-linear-gradient';
import firebase from 'firebase';

export default function Login({ navigation }) {

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);
  const [uuid, setUuid] = useState('');

  var database = firebase.firestore()

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };

  const clearError = () => {
    setEmailError('');
    setPasswordError('');
  };

  const handleLogin = () => {
    clearError();
    clearInputs();

    fire
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return fire.auth().signInWithEmailAndPassword(email, password)
      })
      .catch(err => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
          default:
            setEmailError(err.message);
            break;
        }
      });
  };

  const handleSignup = async () => {
    clearError();

    await fire
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return fire.auth().createUserWithEmailAndPassword(email, password)
      })
      .catch(err => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
          default:
            break;
        }
      }
      )


  };

  // If logged in, reroute to Home
  useEffect(() => {
    const authListener = () => {

      fire.auth().onAuthStateChanged((user) => {
        if (user) {

          database.collection('users').doc(fire.auth().currentUser.uid).get()
          .then((doc) => {
            if (doc.exists) {
              console.log("Cached document data:", doc.data());
              navigation.navigate("Home", { screen: 'Account', params: { user: doc.data() }});
            }
            else {
              navigation.navigate("SignUp", { email: email });
            }  
            
          }).catch((error) => {
              console.log("Error getting cached document:", error);
          });

          
        }
      });
    };
    authListener();
  }, [email]);

  return (
    <LinearGradient style={styles.container}
      colors={['#d100ff', '#00d4ff']}
      useAngle={true} angle={45} angleCenter={{x:0.5,y:0.5}}
    >
      <Image 
        source={require('../assets/locked.png')}
        style={styles.logo}
      />

        <Text style={styles.text}>EMAIL</Text>
        <TextInput style={styles.input} type="text" autoFocus required value={email} onChangeText={text => setEmail(text)} />
        <Text>{emailError}</Text>
        <Text style={styles.text}>PASSWORD</Text>
        <TextInput style={styles.input} type="text" secureTextEntry required value={password} onChangeText={setPassword} />
        <Text>{passwordError}</Text>

        {hasAccount ? (
          <>
            <Pressable style={styles.btn} onPress={handleLogin}>
              <Text style={styles.text}>SIGN IN</Text>
            </Pressable>

            <Text>Don't have an account?
                    <Text onPress={() => setHasAccount(!hasAccount)}> Sign Up
                    </Text>
            </Text>
          </>
        ) : (
          <>
            <Pressable style={styles.btn} onPress={handleSignup}>
              <Text style={styles.text}>SIGN UP</Text>
            </Pressable>
            <Text>Have an account?
                    <Text onPress={() => setHasAccount(!hasAccount)}> Sign In
                    </Text>
            </Text>
          </>
        )
        }
        
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems:'center',
    justifyContent:'center'
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30
  },
  appName: {
    color: 'white',
    textAlign: 'center',
    fontSize: 50
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: 'transparent',
    marginTop: 20
  },
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    paddingLeft: 10,
    fontSize: 20,
    borderColor: 'white',
    color: 'white'
  },
  logo: {
    width: '70%',
    height: '40%'
  }
});