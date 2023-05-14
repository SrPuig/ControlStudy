import React, { useState ,useContext ,useEffect } from 'react';
import { View, Text,TouchableOpacity, Image ,StyleSheet,ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ImageContext  from './PantallaProvider';
import AddQuestion from "./AddQuestion";
import QuestionsList from './ShowQuestions';
import Modal from 'react-native-modal';

//Pantalla que implementa la tecnica Pomodoro mediante un contador al que se le pueden añadir y quitar minutos
//, cuando el contador llega a 0 se navega a la pantalla de descnasar automaticamnete 
export default function Pomodoro({navigation}) {

   useFocusEffect(
    React.useCallback(() => {
      setTimerCount(FOCUS_TIME_MINNUTES);
    }, [])
  );

    //tiempo inicial del contador a 25 minutos 
  const [FOCUS_TIME_MINNUTES , setFOCUS_TIME_MINNUTES] = useState(25 * 60 * 1000);
  const [timerCount, setTimerCount] = useState(FOCUS_TIME_MINNUTES);
  const [timerRunning, setTimerRunning] = useState(false);


  const { imageUrl } = useContext(ImageContext);
  const [isVisibleAñadir,setIsVisibleAñadir] = useState(false);
  
  const [isVisibleTarjetas,setIsVisibleTarjetas] = useState(false);
  
  const [isVisibleInfo, setIsVisibleInfo] = useState(false);

    // Mientras timerRunning sea verdadero se descontara un segundo al contador 
  useEffect(() => {
    let timerInterval = null;

    if (timerRunning) {
      timerInterval = setInterval(() => {
        setTimerCount(prev => prev - 1000);
      }, 1000);
    }
    // si llega a  0 , navega a la pantalla de descansar llamando a la funcion handleStopwatchBreak y para la resta del contador 
    if (timerCount <= 0) {
      stopTimer();
      handleStopwatchBreak();
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [timerRunning, timerCount]);
//Indica que se empieza el ciclo de pomodoro
  const startTimer = () => {
    setTimerRunning(true);
  };
//Para el contador del Pomodoro
  const stopTimer = () => {
    setTimerRunning(false);
  };
//Convierte los milisegundos a un formato legible
  const formatTime = time => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };


//navega a la pantalla de descanso 
  const handleStopwatchBreak = () =>{
    navigation.navigate('Descansa');

  };
  const toggleModalTarjetas = () => {
    setIsVisibleTarjetas(!isVisibleTarjetas);
  };


  const toggleModalInfo= () => {
    setIsVisibleInfo(!isVisibleInfo);
  };


  const toggleModalAñadir = () => {
    setIsVisibleAñadir(!isVisibleAñadir);
  };

  
 //Funciones para añadir o quitar minutos al contador 
  const addmin = () => {
    setTimerCount(timerCount + (1 * 60 * 1000 ))
  };
  const lessmin = () => {
    setTimerCount(timerCount - (1 * 60 * 1000 ))
  };
  //funciones para añadir o quitar de 5 en 5
  const less5min = () => {
    setTimerCount(timerCount - (5 * 60 * 1000 ))
  };
  const add5min= () => {
    setTimerCount(timerCount + (5 * 60 * 1000 ))
  };

  return (
  <ImageBackground age source={{ uri: imageUrl }} style={{ flex: 1,resizeMode: 'cover' }} >

    <View style={styles.container}>
     <View style={styles.view_row}>
      <TouchableOpacity onPress={less5min}>
        <View style={styles.view_count_border1}>
            <Text style={styles.Text_count} >-5</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={lessmin}>
        <View style={styles.view_count_border1}>
            <Text style={styles.Text_count} >-1</Text>
        </View>
      </TouchableOpacity>
       <View style ={styles.view_count_border}>
        <View style ={styles.view_count} >
         <Text style ={styles.Text_count}>{formatTime(timerCount)}</Text>
         </View>
      </View>
     <TouchableOpacity onPress={addmin}>
        <View style={styles.view_count_border1}>
            <Text style={styles.Text_count} >+1</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={add5min}>
        <View style={styles.view_count_border1}>
            <Text style={styles.Text_count} >+5</Text>
        </View>
      </TouchableOpacity>
    </View>
    <View style={styles.view_row}>
      <TouchableOpacity
          onPress={toggleModalTarjetas}
          title="Tarjetas">
        <View style={{marginRight:40}} >
          <Text style={styles.Text_list} >📘</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleModalAñadir}>
        <View style={{marginRight:40}}>
            <Text style={styles.Text_list} >🖋️ </Text>
        </View>
      </TouchableOpacity>
      {!timerRunning ? (
          
      <TouchableOpacity
      onPress={startTimer} 
      disabled={timerRunning}
          title="Play">
         <View style={{marginRight:40}} >
            <Text style={styles.Text_list} >▶️</Text>
         </View>
      </TouchableOpacity>
     ) : (
        <TouchableOpacity
        onPress={stopTimer} disabled={!timerRunning}
          title="Pause">
          <View style={{marginRight:40}} >
              <Text style={styles.Text_list} >⏸️</Text>
          </View>
        </TouchableOpacity>
          
        )}
        <TouchableOpacity
          onPress={handleStopwatchBreak}
          title="Pause">
          <View style={{marginRight:40}} >
    
            <Text style={styles.Text_list} >😴</Text>
          </View>
        </TouchableOpacity>
    </View>
  </View>
  <Modal isVisible={isVisibleAñadir}>
    <View  style ={styles.view_modal2}>
      <View style={styles.view_modal}>         
        <AddQuestion/>
        <TouchableOpacity
         onPress={toggleModalAñadir}
            title="Cerrar">
          <View style={styles.view} >
             <Text style={styles.Text_modal} >Cerrar</Text>
           </View>
        </TouchableOpacity>
        </View>
      </View>
    </Modal>
    <Modal isVisible={isVisibleTarjetas}>
        <QuestionsList/>
       <TouchableOpacity
         onPress={toggleModalTarjetas}
            title="Tarjetas">
          <View style={styles.view} >

             <Text style={styles.Text_modal} >Cerrar</Text>
           </View>
        </TouchableOpacity>
    </Modal>   
  <Modal isVisible={isVisibleInfo}>
  <View  style ={styles.view_modal2}>
      <View style ={styles.modal}>
          <Text style={styles.Text}>
          Mantenerse concentrado es muy importante para que sea fructífero el 
          estudio y como no somos maquinas no podemos estar todo el tiempo que quisiéramos concentrados.
           Lo optimo es concentrase  durante 25 minutos y descansar 5 (▶️).
           Desde aquí también podrás repasar 
           con tus propias tarjetas o flascards (📘).   Crea nuevas tarjetas cuando lo necesites (🖋️) o  
           bien descansar y crear recordatorios (😴).  </Text>
          
           <TouchableOpacity
         onPress={toggleModalInfo}
            title="Aceptar">
          <View style={styles.view} >

             <Text style={styles.Text_modal} >Aceptar</Text>
           </View>
        </TouchableOpacity>
      </View>
      </View>
    </Modal>
  <TouchableOpacity onPress={toggleModalInfo} >
  <Image
    source={require('./pet-1.webp')} 
    style={styles.Image}
  />
</TouchableOpacity>
  </ImageBackground>
  );
}



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
    view_row: { 
      flexDirection: 'row' ,
      justifyContent: 'center',
      padding: 4,
      marginTop:10
        
      },
      view_modal2: {  
        backgroundColor: '#E7C7B4',
        borderRadius: 4,
        justifyContent: 'right',
        padding: 3,
        marginTop:20,
        marginLeft:15,
        marginRight:15,
        color:'white',
      },
      
      modal:{
  
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#B27342',
        borderColor: "#A85D31",
        borderRadius: 4,
       
        padding: 3,
        color:'white',
      },
      view_count_border:{
        flexDirection: 'row' ,
        backgroundColor: '#B27342',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:30,
        width:120,
        height:70,
        borderRadius:10,
        
      },
      view_count_border1:{
        flexDirection: 'row' ,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:30,
        width:50,
        height:70,
        borderRadius:10,
        backgroundColor: '#E7C7B4',
      },
  view: {  
  justifyContent: 'right', 
  alignItems: 'right',
  backgroundColor: '#E7C7B4',
  borderRadius: 4,
  justifyContent: 'right',
  padding: 3,
  marginTop:20,
  marginLeft:15,
  color:'white',
},
    view_count: { 
      borderRadius: 10,
      justifyContent: 'center',
      padding: 4,
      backgroundColor : '#E7C7B4',
  },
  Text: {
  fontFamily: 'Cochin',
  fontSize: 22,
  fontWeight: 'bold',
  color: "white",
  },
  
  Text_count: {
    fontFamily: 'Cochin',
    fontSize: 42,
    fontWeight: 'bold',
    color: "white",
    },
TouchableOpacity :{
  justifyContent: 'right', 
  alignItems: 'right',
  width:150,
  backgroundColor: '#8E7C72',
  borderColor: "#A85D31",
  borderRadius: 4,
  justifyContent: 'right',
  padding: 3,
  marginLeft:15,
  color:'white',
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