import React, { useState ,useEffect,useContext } from 'react';
import { StyleSheet, Text, View ,TextInput,ImageBackground ,TouchableOpacity,Image} from 'react-native';
import { Audio } from 'expo-av';
import ImageContext  from './PantallaProvider';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Pantalla de descanso de pomodoro donde poder crear recordatorios 
export default function Pause( ){
  const [sound, setSound] = useState(null);

  const { imageUrl, setImageUrl } = useContext(ImageContext);
  const [isVisible, setIsVisible] = useState(false);
  
  const [isVisibleRepasos, setIsVisibleRepasos] = useState(false);
  
  const [isVisibleInfo, setIsVisibleInfo] = useState(false);
  const [materiarepaso, setMateriarepaso] = useState("");
  
  const [FOCUS_TIME_MINNUTES , setFOCUS_TIME_MINNUTES] = useState(5 * 60 * 1000);{/* 5 minutos en milisegundos*/}
  const [timerCount, setTimerCount] = useState(FOCUS_TIME_MINNUTES);
  const [timerRunning, setTimerRunning] = useState(false);

//La cuenta atras empieza al entrar en la pantalla y al finalizar se activa un sonido y al entrar otro diferente.
  useEffect(() => {
    let timerInterval = null;
    startTimer();
    if (timerRunning) {
      timerInterval = setInterval(() => {
        setTimerCount(prev => prev - 1000);
      }, 1000);
    }
    
    if (timerCount <= 0) {
      stopTimer();
      playLocalSound2();
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [timerRunning, timerCount]);

//Activacion del primer sonido al entrar a la pagina
  useEffect(() => {
    playLocalSound();

    },[]);
   //Empezar el contador 
  const startTimer = () => {
    setTimerRunning(true);
  };
//Parar el contador  
  const stopTimer = () => {
    setTimerRunning(false);
  };
//Convierte los milisegundos a un formato legible 
  const formatTime = time => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleModal = () => {
    setIsVisible(!isVisible);
    
  };
  const toggleModalRepasos = () => {
    setIsVisibleRepasos(!isVisibleRepasos);
  };
  const toggleModalInfo= () => {
    setIsVisibleInfo(!isVisibleInfo);
  };

  //Funciones de guardado encadenadas para ser activadas escalonadamnete pero con
  // la variacion de la fecha de repaso 
    const saveTask = async () => {
      try {
        // Obtener la lista de tareas almacenada en AsyncStorage
        if (materiarepaso.trim() === "") {
          
          console.log('Tarea Vacia');
          }else{
  
  
             // Obtener la lista de tareas almacenada en AsyncStorage
          const tasksString = await AsyncStorage.getItem('tasks');
          const tasks = tasksString ? JSON.parse(tasksString) : [];
      
          // Obtener la fecha actual
          const currentDate = new Date();
          const tomorrowDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
          // Crear el objeto de la nueva tarea con la fecha
          const newTask = {
            task: "Primer repaso: " + materiarepaso,
            date: tomorrowDate, 
          };
      
          // Guardar la nueva tarea en la lista
          tasks.push(newTask);
          // Guardar la lista de tareas actualizada en AsyncStorage
          await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
          console.log('Tarea guardada', 'La tarea se guardó correctamente.');
        
          //llama  ala funcion que guarda el recordatorio de los 7 dias despues 
          saveTask7();
          }
         
      } catch (error) {
        console.error('Error al guardar la tarea:', error);
      }
    };

    //Funcion que guarda el recordatorio de los 7 dias despues 
    const saveTask7 = async () => {
      try {
        // Obtener la lista de tareas almacenada en AsyncStorage
        const tasksString = await AsyncStorage.getItem('tasks');
        const tasks = tasksString ? JSON.parse(tasksString) : [];
    
        // Obtener la fecha actual
        const currentDate = new Date();
        // Obtener la fecha de dentro de 7 dias 
        const nextweekDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7);
        // Crear el objeto de la nueva tarea con la fecha
        const newTask = {
          task: "Segundo repaso:" +materiarepaso,
          date: nextweekDate, 
        };
    
        // Guardar la nueva tarea en la lista
        tasks.push(newTask);
    
        // Guardar la lista de tareas actualizada en AsyncStorage
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks)); console.log('Tarea guardada', 'La tarea se guardó correctamente.');
        // llamar a la funcion de los 15 dias despues 
        saveTask15daays();
      } catch (error) {
        console.error('Error al guardar la tarea:', error);
      }
    };
    const saveTask15daays = async () => {
      try {
        // Obtener la lista de tareas almacenada en AsyncStorage
        const tasksString = await AsyncStorage.getItem('tasks');
        const tasks = tasksString ? JSON.parse(tasksString) : [];
    
        // Obtener la fecha actual
        const currentDate = new Date();
        const days15Date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 15);
        // Crear el objeto de la nueva tarea con la fecha
        const newTask = {
          task: "Tercer repaso: " + materiarepaso,
          date: days15Date, // Convertir la fecha a formato ISO8601 (opcional)
        };
    
        // Guardar la nueva tarea en la lista
        tasks.push(newTask);
    
        // Guardar la lista de tareas actualizada en AsyncStorage
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    
        console.log('Tarea guardada', 'La tarea se guardó correctamente.');
        // Cerrar el modal
        toggleModalRepasos();
      } catch (error) {
        console.error('Error al guardar la tarea:', error);
      }
    };
  
    async function playLocalSound() {

      const { sound } = await Audio.Sound.createAsync(require('./audios/empieza-descanso.mp3'));
      setSound(sound);
      await sound.playAsync();
    }
    async function playLocalSound2() {

      const { sound } = await Audio.Sound.createAsync(require('./audios/acaba-descanso.mp3'));
      setSound(sound);
      await sound.playAsync();
    }
    //Funcion creada como prueba para la implementacion de notificaciones que se trabajara en un futuro 
    const notificacion = () => {
      saveTask();
    };



  
  const handleBlur = () => {
    Keyboard.dismiss(); // cerrar el teclado
  };
  return (
    
  <ImageBackground age source={{ uri: imageUrl }} style={{ flex: 1,resizeMode: 'cover' }} >
    <View style={styles.container}>
    
      <View style ={styles.view_count} >
         {timerRunning ? (
           <Text style={styles.Text}>{formatTime(timerCount)}</Text>
          ) : (
            <Text style={styles.Text}> ¡ Volvamos al trabajo ! </Text>
          )}
        </View>
         <View style={styles.layout}>    
          <TouchableOpacity onPress={toggleModalRepasos}>
            <View style={{alignItems: 'center'}}>
               <Text style={styles.Text_icon}>🔔 </Text>
            </View>
           </TouchableOpacity>  
    </View>
  </View>
  <Modal isVisible={isVisible}>
        <View style={styles.view_modal}>
          <Text style={styles.title}>¡VOLVAMOS AL TRABAJO! </Text>
          <TouchableOpacity onPress={toggleModal}>
          <Text >Volver </Text>
          </TouchableOpacity>
        </View>
  </Modal>
  <Modal isVisible={isVisibleRepasos}>
        <View style={styles.view_modal2}>
          <Text style={styles.Text_modal}>Te lo recordaremos para que no se te olvide repasar ;) </Text>
          
          <TextInput
          multiline
          maxLength={100}
          placeholder="¿Que has estudiado hoy? "
          value={materiarepaso}
          onChangeText={setMateriarepaso}
         onBlur={handleBlur} 
          style={styles.input}
          />

          
          <TouchableOpacity onPress={notificacion}>
            <View style={styles.view}> 
              <Text style={styles.Text_list} >Guardar </Text>
             </View>
          </TouchableOpacity>
        
        
          <TouchableOpacity onPress={toggleModalRepasos}>
          <View style={styles.view}> 
            <Text style={styles.Text_list} >Volver</Text>
            </View>
          </TouchableOpacity>
        
        </View>
      </Modal>
      
  <Modal isVisible={isVisibleInfo}>
  <View style={styles.view}>
      <View style={styles.view_modal}>
          <Text style={styles.Text}>Recordar todo lo que estudiamos es muy difícil para  nuestro cerebro por ello
          hay que realizar volver a repasar lo estudiado. 
          Teniendo en cuenta la curva del olvido  te recordaremos mañana, la semana que viene 
          y dentro de quince días que tienes que repasar lo que hayas estudiado y así incrementar las posibilidades de no olvidarlo (🔔).  </Text>
          
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
};
const styles = StyleSheet.create({
  
  Text_icon: {
    fontFamily: 'Cochin',
    fontSize: 60,
    fontWeight: 'bold',
    marginLeft: 12,
    justifyContent: 'center',
  },
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
  view_count: { 
    color: 'white',
    borderColor: "#000000",
    borderRadius: 4,
    justifyContent: 'center',
    padding: 4,
    marginTop:10,
    backgroundColor : '#E7C7B4',
},
  buttonsContainer: {
    marginTop: 20,
  },
  input: {
    height: 100,
    width: 220,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#E7C7B4',
    fontFamily: 'Cochin',
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius:10,
  },
    view_row: { 
      flexDirection: 'row' ,
      justifyContent: 'center',
      padding: 4,
      marginTop:10
        
      },
   view: {  
  justifyContent: 'right', 
  alignItems: 'right',
  backgroundColor: '#E7C7B4',
  borderColor: "#A85D31",
  borderRadius: 4,
  justifyContent: 'right',
  padding: 3,
  marginTop:20,
  marginLeft:15,
  color:'white',
},
  Text: {
  fontFamily: 'Cochin',
  fontSize: 22,
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
  fontSize: 20,
  fontWeight: 'bold',
  color: "#A85D31",
},
Text_modal: {
  fontFamily: 'Cochin',
  fontSize: 25,
  fontWeight: 'bold',
  color: "white",
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
view_modal2:{
  
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