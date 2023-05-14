import React,{ useContext } from 'react';
import { StyleSheet, View ,ImageBackground } from 'react-native';
import ImageContext  from './PantallaProvider';
import AddQuestion from "./AddQuestion";
import QuestionsList from "./ShowQuestions";

//Pasntalla donde se puede añadir una tarjeta o pregunta y tambien visualizarlas .
export default function AñadirPregunta({}){
  const { imageUrl, setImageUrl } = useContext(ImageContext);

  return (
    
  <ImageBackground age source={{ uri: imageUrl }} style={{ flex: 1,resizeMode: 'cover' }} >
  <View style={styles.layout}>
    
    <View >
        <AddQuestion/>
    </View>
        <View style={styles.view_List}>
          <QuestionsList/>      
        </View>
    </View>
  </ImageBackground>
  );
};



const styles = StyleSheet.create({
  layout: {
    marginTop:30,
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
  },
    view_List: {  
    width: 400,
    height: 400,
    justifyContent: 'right', 
    alignItems: 'right',
    color: 'white',
    borderColor: "#000000",
    borderRadius: 4,
    justifyContent: 'center',
    padding: 4,
    marginTop:10,
  },
  });