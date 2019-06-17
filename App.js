import React, { Component } from 'react';
import { AppRegistry, Image } from 'react-native';

import Log from './src/Log';
import Works from './src/Works';
import * as firebase from 'firebase';

import{
  Router,
  Scene,
} from 'react-native-router-flux';

export default class App extends Component {

  componentWillMount(){
    var firebaseConfig = {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: ""
    };
  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  render() {
    return(
      <Router>
        <Scene key = 'root' style={{paddingLeft: 100}}>
          <Scene key = 'log' component = {Log} title = 'Log'/>
          <Scene key = 'works' component = {Works} title = 'Works'/>

        </Scene>
      </Router>
    )
  }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => App);
