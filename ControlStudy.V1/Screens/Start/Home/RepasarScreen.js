import React, { useState ,useContext } from 'react';
import {  StyleSheet, Text, View ,ImageBackground ,TouchableOpacity} from 'react-native';
import ImageContext  from './PantallaProvider';
import Modal from 'react-native-modal';

//Pantalla para realizar un repaso de las tarjetas. 

export default function Repasar( ){
  const {questions, setQuestions} = useContext(ImageContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { imageUrl, setImageUrl } = useContext(ImageContext);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleFin, setIsVisibleFin] = useState(false);

  const toggleModalFin = () => {
    setIsVisibleFin(!isVisibleFin);
    
  };
  const toggleModal = () => {
    setIsVisible(!isVisible);
    
  };
  const siguientePregunta = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }else{
      toggleModalFin();
      setCurrentQuestionIndex(0);
    }
  };

  return (
    
  <ImageBackground age source={{ uri: imageUrl }} style={{ flex: 1,resizeMode: 'cover' }} >
  
  <View style={styles.container}>
  <View style={styles.question}>
  <ImageBackground source={require('./papel-pintado-textura-papel-marron-blanco.jpg')} style={styles.view_image}>

      <Text style={styles.Text_list}>________________________________</Text>
      {questions && questions.length > 0 ? (
    <>
      <Text style={styles.Text_list}>{currentQuestionIndex + 1}. {questions[currentQuestionIndex].question}</Text>
      <Text style={styles.Text_list}>________________________________</Text>
    </>
  ) : (
    <Text style={styles.Text_list}>No hay preguntas disponibles</Text>
  )}
    
    </ImageBackground>
    </View>
        <View style={styles.view_row}>
            <TouchableOpacity
         onPress={toggleModal}
            title="Comprobar">
          <View style={styles.view} >

             <Text style={styles.Text_modal} >Respuesta</Text>
           </View>
        </TouchableOpacity>
            <TouchableOpacity
         onPress={siguientePregunta}
            title="Siguiente">
          <View style={styles.view} >

             <Text style={styles.Text_modal} >Siguiente</Text>
           </View>
        </TouchableOpacity>
    </View>
  </View>

  

  <Modal isVisible={isVisibleFin}>
        <View style={styles.view_modal}>
        <View style={styles.view} >
          <Text style={styles.Text_modal}>¡No hay mas tarjetas! </Text>
          </View>
          <TouchableOpacity
         onPress={toggleModalFin}
            title="Volver">
          <View style={styles.view} >

             <Text style={styles.Text_modal} >Volver</Text>
           </View>
        </TouchableOpacity>

        </View>
      </Modal>
      <Modal isVisible={isVisible}>
        <View style={styles.view_modal}>
          
          
            <View style={styles.view}>
          <Text style={styles.Text_answer}>{questions[currentQuestionIndex].answer}</Text>
            </View>
          <TouchableOpacity onPress={toggleModal}>
          <View style={styles.view}>
            <Text style={styles.Text_modal} >Volver</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
  </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
  },
    view_row: { 
      flexDirection: 'row' ,
      justifyContent: 'center',
      padding: 4,
      marginTop:10
        
      },
  
  Text_answer: {
  fontFamily: 'Cochin',
  fontSize: 22,
  fontWeight: 'bold',
  color: "black",
  
  padding: 4,
  },
Text_list: {
  fontFamily: 'Cochin',
  fontSize: 22,
  fontWeight: 'bold',
  color: "black",
  padding:4
},
Text_modal: {
  fontFamily: 'Cochin',
  fontSize: 25,
  fontWeight: 'bold',
  color: "#A85D31",
  padding: 4,
},
view: {  
  justifyContent: 'center', 
  alignItems: 'center',
  backgroundColor: '#E7C7B4',
  borderColor: "#A85D31",
  borderRadius: 4,
  justifyContent: 'top',
  marginTop:20,
  marginEnd:20,
  marginLeft:15,
  marginBottom:40,
},
question:{
  borderRadius:30,
  flex: 1,
  width: 380,
  resizeMode: 'cover',
  justifyContent: 'center',
  padding: 4,
  marginTop:10,
  borderRadius:50,
  paddingHorizontal: 1
},
view_image: {
  borderRadius: 10, 
  overflow: 'hidden',
    width: 380,
    resizeMode: 'cover',
    justifyContent: 'center',
    padding: 4,
    marginTop:10,
    borderRadius:50,
    paddingHorizontal: 1, 
},
view_modal:{
  
  justifyContent: 'center', 
  alignItems: 'center',
  width:350,
  height:350,
  borderColor: "#A85D31",
  borderRadius: 4,
  justifyContent: 'center',
  padding: 3,
  color:'white',
},

});