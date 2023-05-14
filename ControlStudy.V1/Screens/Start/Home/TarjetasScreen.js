import React,{ useState ,useContext } from 'react';
import {Image,  StyleSheet, Text, View ,ImageBackground ,TouchableOpacity} from 'react-native';
import ImageContext  from './PantallaProvider';
import QuestionsList from "./ShowQuestions";
import Modal from 'react-native-modal';

//Pantalla de tarjetas donde navegar a repasar , crear o borrar tarjetas y tambien se 
//visualizan una lista de ellas a traves del componente QuestionsList

export default function Tarjetas({navigation}){
  
  
  const { questions, setQuestions } = useContext(ImageContext);
  const { imageUrl, setImageUrl } = useContext(ImageContext);
  const [isVisible, setIsVisible] = useState(false);
  


 

  const toggleModal = () => {
    setIsVisible(!isVisible);
    
  };

// Comprueba si las preguntas estan vacias para no poder navegar 
  const IfNullQuestion = () => {

    if (questions && questions.length > 0) {
      navigation.navigate('Repasar');
    }
    
  };



  return (
  <ImageBackground age source={{ uri: imageUrl }} style={{ flex: 1,resizeMode: 'cover' }} >
 
  <View style={styles.container}>
     <View style={styles.view_List}>
     <QuestionsList/>
      </View>
    <View >
    <View style={styles.view_row}>
      <TouchableOpacity
          onPress={IfNullQuestion}
          title="Tarjetas">
        <View style={{marginRight:40}} >
          <Text style={styles.Text_list} >📗</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Añadir')} >
        <View style={{marginRight:40}}>
            <Text style={styles.Text_list} >🖋️</Text>
        </View>
      </TouchableOpacity>


        <TouchableOpacity
          onPress={() => navigation.navigate('Borrar')}
          title="Pause">
          <View style={{marginRight:40}} >
    
            <Text style={styles.Text_list} >🗑️</Text>
          </View>
        </TouchableOpacity>


    </View>

    </View>
  </View>
  <Modal isVisible={isVisible}>
    
  <View style={styles.view} >
      <View style={styles.view_modal}>
          <Text style={styles.Text}>Repasa con tus propias tarjetas o flascards para memorizar
           pequeños conceptos o definiciones (📗).   Crea nuevas tarjetas cuando lo necesites (🖋️)
            o  bien borrarlas cuando ya no sean útiles (🗑️).  </Text>
        
           <TouchableOpacity
         onPress={toggleModal}
            title="Aceptar">
          <View style={styles.view} >

             <Text style={styles.Text_modal} >Aceptar</Text>
           </View>
        </TouchableOpacity>
      </View>
      </View>
    </Modal>
  <TouchableOpacity onPress={toggleModal}>
  <Image
    source={require('./pet-1.webp')} 
    style={styles.Image}
  />
</TouchableOpacity>

  </ImageBackground>
  );
};

const styles = StyleSheet.create({
  
  Image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
  },
  buttonsContainer: {
    marginTop: 20,
  },
    view_row: { 
      flex:1,
      flexDirection: 'row' ,
      justifyContent: 'center',
      padding: 4,
      marginTop:10
        
      },
  Text: {
  fontFamily: 'Cochin',
  fontSize: 22,
  fontWeight: 'bold',
  color: "white",
  },
  view_List: {  
    width: 400,
    height: 400,
    justifyContent: 'left', 
    alignItems: 'left',
    color: 'white',
    borderColor: "#000000",
    borderRadius: 4,
    justifyContent: 'center',
    padding: 4,
    marginTop:10,
    marginLeft:15,
  },
Text_list: {
  fontFamily: 'Cochin',
  fontSize: 42,
  fontWeight: 'bold',
  color: "#A85D31",
},
Text_modal: {
  fontFamily: 'Cochin',
  fontSize: 25,
  fontWeight: 'bold',
  color: "#A85D31",
},
view: {  
  backgroundColor: '#E7C7B4',
  borderRadius: 4,
  padding: 3,
  marginTop:20,
  marginLeft:15,
  marginRight:15,
  color:'white',
},
view_modal:{
  
  justifyContent: 'center', 
  alignItems: 'center',
  width:350,
  height:250,
  backgroundColor: '#B27342',
  borderColor: "#A85D31",
  borderRadius: 4,
  justifyContent: 'center',
  padding: 3,
  color:'white',
},

});