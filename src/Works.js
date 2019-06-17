import React from 'react';
import firebase from 'firebase';
import{View,Text,StyleSheet,TouchableOpacity,Modal,TextInput,Image} from 'react-native';
import{FloatingAction} from 'react-native-floating-action'

class Works extends React.Component{

  state = {
    selected:0,
    canpressed:true,
    mTitle:'',
    mDesc:'',
    mTime:'',
    mPri:'',
    showModal:false,
    results: [],
  }

  render(){
    return (
      <View style={{height:'100%'}}>
        <Modal visible={this.state.showModal}>
          <Text style ={styles.title}>Başlık:</Text>
          <TextInput style={styles.nameInput} placeholder='Kullanıcı'
          onChangeText={(titletext) => {
            this.setState({
              mTitle:titletext,
            });
          }}></TextInput>
          <Text style ={styles.title}>Açıklama:</Text>
          <TextInput style={styles.nameInput} placeholder='Şifre'
          onChangeText={(desctext) => {
            this.setState({
              mDesc:desctext,
            });
          }}></TextInput>
          <Text style ={styles.title}>Süre:</Text>
          <TextInput style={styles.nameInput} placeholder='Kullanıcı'
          onChangeText={(timetext) => {
            this.setState({
              mTime:timetext,
            });
          }}></TextInput>
          <Text style ={styles.title}>Öncelik:</Text>
          <TextInput style={styles.nameInput} placeholder='Şifre'
          onChangeText={(pritext) => {
            this.setState({
              mPri:pritext,
            });
          }}></TextInput>
          <TouchableOpacity style={styles.button} onPress = {()=> {
            firebase.database().ref('todo/').push({
              title: this.state.mTitle,
              desc: this.state.mDesc,
              time: this.state.mTime,
              priority: this.state.mPri,
            }).then(()=>{
              alert('eklendi')
              this.setState({
                showModal:false,
              })
            }).catch((error)=>{
              alert(error())
            })

          }}>
            <Text style={{color:'white'}}>Ekle</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress = {()=> {
            this.setState({
              showModal:false,
            })
          }}>
            <Text style={{color:'white'}}>Geri</Text>
          </TouchableOpacity>

        </Modal>
        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.items} onPress = {()=> {
            this.showItems(0)
          }}>
            <Text style={{color:'white'}}>To do</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.items} onPress = {()=> {
            this.showItems(1)
          }}>
            <Text style={{color:'white'}}>On Progress</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.items} onPress = {()=> {
            this.showItems(2)
          }}>
            <Text style={{color:'white'}}>Done</Text>
          </TouchableOpacity>


        </View>
        <FloatingAction
          action={()=>{

          }}
          onPressMain={()=>{
            if (this.state.canpressed) {
              this.setState({
                showModal:true
              })

              this.state.canpressed = false;

            }
            else {
              this.state.canpressed = true;

            }

          }}/>
          <View>
            {this.state.results}

          </View>

      </View>
    );
  }


  showItems(k){
    var par;
    switch (k) {
      case 0:
        par='todo/'
        break;
      case 1:
        par='onprogress/'
        break;
      case 2:
        par='done/'
        break;
      default:par='todo/'
        break;



    }
    firebase.database().ref(par).on('value',(data)=>{
      let res = data.val()
      let items = Object.values(res)
      var sonuclar = []
      for (var i = 0; i < items.length; i++) {
        sonuclar[i] = this.getView(items[i])

      }
      this.setState({results:sonuclar})
    })

  }

  getView(a){
    return(
      <TouchableOpacity style={styles.postit} onPress = {()=> {

      }}>
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color:'black'}}>{a.title}</Text>
          <Text style={{color:'black'}}>{a.desc}</Text>
          <Text style={{color:'black'}}>{a.time}</Text>
          <Text style={{color:'black'}}>{a.priority}</Text>
        </View>
        <Image style={styles.forimg} source={require('./note147951_1280.png')}>
        </Image>
      </TouchableOpacity>
    );
  }

}

export default Works;

var styles = StyleSheet.create({

  forimg:{
    width:150,
    height:150,
    zIndex: -1,
  },

  postit:{
    backgroundColor: 'transparent',
    alignItems: 'center',
  },

  tabBar:{

    backgroundColor: 'steelblue',
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',

  },
  items:{

    width: '33%',
    alignItems: 'center',

  },
  title:{
    marginTop:50,
    marginLeft:20,
  },
  nameInput:{
    height:40,
    borderWidth:1,
    borderColor: 'blue',
    margin: 10,
    marginLeft:20,
  },
  button:{
    margin: 30,
    width: '50%',
    backgroundColor: 'blue',
    borderRadius: 4,
    alignItems: 'center',

  },

})
