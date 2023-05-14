import React, { useEffect ,useContext} from 'react';
import { View, Text, ScrollView  , StyleSheet ,FlatList,ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ImageContext  from './PantallaProvider';

  //Componente que muestra la lista de tarjetas (questions )
  
const QuestionsList = () => {

    const { questions,setQuestions } = useContext(ImageContext);

    useEffect(() => {
        loadQuestions();
      }, []);
    
      
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
  
    const renderQuestionItem = ({ item, index }) => {
      return (
        <ImageBackground source={require('./papel-pintado-textura-papel-marron-blanco.jpg')} style={styles.view_image}>
          <ScrollView>
           <View  key={item.id} >
             <Text style={styles.Text_list}>{`${index + 1}.`}</Text>
             <Text style={styles.Text_list}>________________________________</Text>
             <Text style={styles.Text_list}>{`${item.question}`}</Text>
             <Text style={styles.Text_list}>________________________________</Text>
             <Text style={styles.Text_list_answer}>   {item.answer}</Text>         
             <Text style={styles.Text_list}>________________________________</Text>
           </View>
          </ScrollView>       
        </ImageBackground>
      );
    };
    return (
      <FlatList
      data={questions ? questions.map((question, index) => ({ ...question, index })) : []}        renderItem={renderQuestionItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  };
  
  export default QuestionsList;
  

const styles = StyleSheet.create({
    Text_list: {
      marginLeft:10,
      fontFamily: 'Cochin',
      fontSize: 22,
      fontWeight: 'bold',
      
      justifyContent: 'center',
      padding: 4,
      marginTop:10,
    },
    Text_list_answer: {
      fontFamily: 'Cochin',
      fontSize: 22,
      fontWeight: 'bold',
      color: 'blue',
      
      justifyContent: 'center',
      padding: 4,
      marginTop:10,
    },
    
  view_image: {
      borderRadius: 10, 
      overflow: 'hidden',
      flex: 1,
      width: 380,
      resizeMode: 'cover',
      justifyContent: 'center',
      padding: 4,
      marginTop:10,
      borderRadius:50,
      paddingHorizontal: 1, // Para ocultar cualquier contenido que se salga de los bordes redondeados
  },
  });