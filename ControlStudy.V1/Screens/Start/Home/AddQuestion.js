import React, { useState, useEffect ,useContext } from 'react';
import { View, Text, TextInput ,  StyleSheet , Keyboard ,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageContext  from './PantallaProvider';

// Componente para añadir tarjetas

const QuestionForm = ({ onAddQuestion }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  //Planes de futuro : Clasificar par unidades y asignaturas
  //const [unit, setUnit] = useState('');
  //const [subject, setSubject] = useState('');
  //const [isVisible, setIsVisible] = useState(false);


  // Comprueba que no esten vacias question y answer y a continuacion se las pasa a onAddQuestion 

  const handleAddQuestion = () => {
    if (question.trim() !== '' && answer.trim() !== '') {
      onAddQuestion({ question, answer });
      setQuestion('');
      setAnswer('');
    }
  };
  const handleBlur = () => {
    Keyboard.dismiss(); // cerrar el teclado
  };
  
  return (
    <View style={styles.view}>
      {/*<View style={styles.view_row}>
      <TextInput
        editable
        multiline
        numberOfLines={4}
         maxLength={10}
        placeholder="Unidad"
        value={unit}
        onChangeText={setUnit}
        onBlur={handleBlur} 
        style={styles.small}
      />
      <TextInput
        editable
        multiline
        numberOfLines={4}
         maxLength={10}
        placeholder="Asignatura"
        value={subject}
        onChangeText={setSubject}
        onBlur={handleBlur} 
        style={styles.medium}
      />
  </View> */}
        <View style={styles.view}>
        <TextInput
        editable
        multiline
         maxLength={250}
        placeholder="Pregunta"
        value={question}
        onChangeText={setQuestion}
        onBlur={handleBlur} 
        style={styles.input}
      />
      
        </View>
      <View style={styles.view}>
      <TextInput
        editable
        multiline
         maxLength={250}
        placeholder="Respuesta"
        value={answer}
        onChangeText={setAnswer}
        onBlur={handleBlur} 
        style={styles.input}
      />
      </View>

      <TouchableOpacity
      onPress={handleAddQuestion}
            title="Agregar"
    >
      <View style={styles.ButtonView}>
      <Text style={styles.Text_list} >  Agregar tarjeta  </Text>
     </View>
    </TouchableOpacity>




    </View>
    
  );
};

export default function AddQuestion() {

  
  useEffect(() => {
    loadQuestions();
  }, []);
  
  const { questions,setQuestions } = useContext(ImageContext);
  //Añade la nueva tarjeta al sistenma de almacenado del movil mediante AsyncStorage
  const handleAddQuestion = async (newQuestion) => {
    if (!questions) {
      // Si questions es nulo, agregar el primer elemento como id 1
      const newQuestions = [{ ...newQuestion, id: 0 }];
      setQuestions(newQuestions);
      try {
        await AsyncStorage.setItem('questions', JSON.stringify(newQuestions));
        console.log('Questions saved successfully.');
      } catch (e) {
        console.log('Error saving questions:', e);
      }
    } else {
      // Si questions existe, agregar un nuevo elemento
      const newQuestions = [...questions, { ...newQuestion, id: questions.length + 1 }];
      setQuestions(newQuestions);
      try {
        await AsyncStorage.setItem('questions', JSON.stringify(newQuestions));
        console.log('Questions saved successfully.');
      } catch (e) {
        console.log('Error saving questions:', e);
      }
    }
  };
  

      // Carga las tarjetas (questions) mediante AsyncStorage 
const loadQuestions = async () => {
  try {
    const questionsString = await AsyncStorage.getItem('questions');
    if (questionsString !== null) {
      const questions = JSON.parse(questionsString);
      setQuestions(questions);
      console.log('Questions loaded successfully.');
    }
  } catch (e) {
    console.log('Error loading questions:', e);
  }
};
  return (
    <View>
      <QuestionForm onAddQuestion={handleAddQuestion} />
    </View>
  );
}


const styles = StyleSheet.create({
      ButtonView: { 
      justifyContent: 'center',
      padding: 4,
      marginTop:10,
      backgroundColor: '#E7C7B4',
      borderColor: "#000000",
      borderRadius: 40,
      justifyContent: 'center',
      padding: 4,
      marginTop:10,
    },
      view: { 
      justifyContent: 'center',
      padding: 4,
      marginTop:10
        
      },
    input: {
      width: 300,
      height: 100,
      backgroundColor: '#fff',
      borderRadius: 20,
      paddingHorizontal: 16,
      
    },
   Text_list: {
    fontFamily: 'Cochin',
    fontSize: 22,
    fontWeight: 'bold',
    color: "#A85D31",
  },
  });
