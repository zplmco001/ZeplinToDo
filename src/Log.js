import React from 'react';
import{ActivityIndicator,View,Text,StyleSheet,TextInput,TouchableOpacity,} from 'react-native';
import{Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';

class Log extends React.Component{

  state = {
    name: '',
    password: '',
    authenticate: false,
  };
  render(){
    return (
      <View>
        <Text style ={styles.title}>Kullanıcı Adı:</Text>
        <TextInput style={styles.nameInput} placeholder='Kullanıcı'
        onChangeText={(usertext) => {
          this.setState({
            name:usertext,
          });
        }}></TextInput>
        <Text style ={styles.title}>Şifre:</Text>
        <TextInput style={styles.nameInput} placeholder='Şifre'
        onChangeText={(passtext) => {
          this.setState({
            password:passtext,
          });
        }}
        secureTextEntry></TextInput>
        <TouchableOpacity onPress={()=>{

          firebase.auth().signInWithEmailAndPassword(this.state.name,this.state.password)
            .then((user)=>{

                if(user){
                  this.setState({ authenticate: true})


                } else {
                  this.setState({authenticate: false})
                }

                if (this.state.authenticate) {
                  Actions.works({
                    name: this.state.name,
                  })
                }

            })
            .catch((error) =>{
              this.setState({authenticate: false})
              alert('Hatalı Giriş');

            });



          /*Actions.works({
            name: this.state.name,
          })*/


        }} style={styles.button}>
          <Text style ={styles.buttonText}>
            İleri
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  onLoginSuccess(){
    Actions.works({
      name: this.state.name,
    })
  }
}



var styles = StyleSheet.create({
  title:{
    margin:20,
  },
  nameInput:{
    height:40,
    borderWidth:1,
    borderColor: 'blue',
    margin: 20,
  },
  buttonText:{
    color:'white',
    fontSize:20,
  },
  button:{
    margin: 30,
    width: '50%',
    backgroundColor: 'blue',
    borderRadius: 4,
    alignItems: 'center',
  },
})

export default Log;
