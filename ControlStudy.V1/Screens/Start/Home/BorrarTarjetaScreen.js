import React,{ useState ,useContext} from 'react';
import { View, Text, TouchableOpacity ,  StyleSheet ,TextInput, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ImageContext  from './PantallaProvider';
import QuestionsList from './ShowQuestions';
  
//Pantalla donde poder borrar las tarjetas y visualizarlas  
const Borrar = () => {
  const { questions, setQuestions } = useContext(ImageContext);
  const [questionIndex, setQuestionIndex] = useState('');
  
  const { imageUrl, setImageUrl } = useContext(ImageContext);

  //Funcion que borra la tarjeta o pregunta con el indice igual a questionIndex
  const removeQuestion = async () => {
    try {
      const questionId = parseInt(questionIndex );
      if (!isNaN(questionId) && questionId >= 0 ) {
        
      const filteredQuestions = questions.filter((question) => question.id !== questionId);
      
      console.log({filteredQuestions}); 
      const updatedQuestions = filteredQuestions.map((question, index) => ({
        ...question,
        id: index + 1
      }));
  
      await AsyncStorage.setItem('questions', JSON.stringify(updatedQuestions));
  
      setQuestions(updatedQuestions);
        console.log('Question removed successfully.');
      } else {
        console.log('Invalid question index.');
      }
    } catch (e) {
      console.error('Error removing question:', e);
    }
  };

  const handleBorrar = () => {
    removeQuestion();
    setQuestionIndex('');
  };

  return (

  <ImageBackground age source={{ uri: imageUrl }} style={{ flex: 1,resizeMode: 'cover' }} >
 
    <View style={styles.container}>
      <View>
          <Text  style={styles.Text_list}>Introduce el índice de la pregunta a borrar:</Text>
       </View>
      <View style={styles.view_row}>    
       <TextInput
          value={questionIndex }
          onChangeText={setQuestionIndex}
          keyboardType="numeric"
          style={styles.input_small}
         />
        <TouchableOpacity
          onPress={handleBorrar}
          title="Tarjetas">
        <View style={{marginRight:40}} >
          <Text style={styles.Text_modal} >🗑️</Text>
        </View>
      </TouchableOpacity>
    </View>
    <View style={styles.view_List}>
       <QuestionsList/>
    </View>
  </View>
  </ImageBackground>
  );
};

export default Borrar;

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
  input: {
    height: 40,
    width: 220,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    width: 24,
    height: 24,
    activeColor: "#000000",
    inactiveColor: "#404040",
    backgroundColor: '#58D3F7'
    },
    view_row: { 
      flexDirection: 'row' ,
      justifyContent: 'center',
      padding: 4,
      marginTop:10
        
      },
    view: { 
      color: 'white',
      borderColor: "#000000",
      borderRadius: 4,
      justifyContent: 'center',
      padding: 4,
      marginTop:10,
      marginRight:10,
  },
  input_small: {
    width: 50,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: 20,
    margin: 20,
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
  fontSize: 20,
  fontWeight: 'bold',
  color: "#A85D31",
  backgroundColor:"white",
  marginTop:10,
},
Text_modal: {
  fontFamily: 'Cochin',
  fontSize: 43,
  fontWeight: 'bold',
  color: "#A85D31",
  
  marginTop:10,
},
view_modal:{
  
  justifyContent: 'center', 
  alignItems: 'center',
  width:350,
  height:350,
  backgroundColor: '#B27342',
  borderColor: "#A85D31",
  borderRadius: 4,
  justifyContent: 'center',
  padding: 3,
  color:'white',
},

});