import React, { useState ,useContext} from 'react';
import { View, Text, TouchableOpacity  , StyleSheet  ,TextInput, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageContext  from './PantallaProvider';
import TaskList from './Tasks'; 
import Modal from 'react-native-modal';

// Pantalla para borrar tareas y con pop-ups(modal) de confirmacion 

const BorrarTarea = ({  }) => {
  const { tasks, setTasks } = useContext(ImageContext);
  const [taskIndex, setTaskIndex] = useState('');
 
  const { imageUrl, setImageUrl } = useContext(ImageContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

//Funcion que borra una tarea con cierto indice.
  const removeTask = async (taskId) => {
    try {
      const parsedTaskId = parseInt(taskId );
      if (!isNaN(parsedTaskId) && parsedTaskId >= 0) {
        
        const tasksString = await AsyncStorage.getItem('tasks');
        const savedTasks = JSON.parse(tasksString);
        const filteredTasks = savedTasks.filter((task) => task.id !== parsedTaskId);
  
        const updatedTasks = filteredTasks.map((task, index) => ({
          ...task,
          id: index + 1
        }));
        await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
        console.log('Task removed successfully.');
        
      } else {
        console.log('Invalid task index.');
      }
    } catch (e) {
      console.error('Error removing task:', e);
    }
  };
//Llama a la funcion de borrar tarea 
  const handleBorrar = () => {
     removeTask(taskIndex);
    
  };
  const openModal = () => {
    setModalVisible(!modalVisible);
  };
  
  const handleMessage = () => {
    
    setShowMessage(true);
  };

  return (
    
  <ImageBackground age source={{ uri: imageUrl }} style={{ flex: 1,resizeMode: 'cover' }} >
    
    <View style={styles.container}>
      
    <View>
          
          <Text  style={styles.Text_list}>Introduce el índice de la pregunta a borrar : </Text>
          </View>
          
      <View style={styles.view_row}>
      <TextInput
        value={taskIndex }
        onChangeText={setTaskIndex}
        keyboardType="numeric"
        style={styles.input_small}
      />
      <TouchableOpacity onPress={() => {
        openModal();
      }} >
      <Text style={styles.Text_modal}> 🗑️</Text>
    </TouchableOpacity>
        </View>
        <View style={styles.view_List}>
       <TaskList/>
    </View>
      
     <Modal visible={modalVisible} transparent={true}>
          
          <View style={styles.view_modal}>
            <View style={styles.view}>

          <Text style={styles.Text_list} > ⚙️ Borrar la tarea numero:  {`${taskIndex}`}</Text>
          </View>
          <View>
      {showMessage ? (
        
        <TouchableOpacity onPress={() => {
        openModal();
        handleBorrar();
        }} style={styles.view}>
        <Text style={styles.Text_modal}> 🗑️</Text>
      </TouchableOpacity>
         ) : (
           <TouchableOpacity onPress={handleMessage} style={styles.view}>
          <Text style={styles.Text_list}> ¿ Estas seguro de borrar la tarea ?</Text>
        </TouchableOpacity>
            )}
             </View>
              <TouchableOpacity
               onPress={() => {
                openModal();}}
               title="Cerrar"
                style={styles.view}>
                     <Text style={styles.Text_list} >Cerrar</Text>
       
              </TouchableOpacity>
            </View>
        
      </Modal>
  </View>
  </ImageBackground>
  );
};

export default BorrarTarea;

const styles = StyleSheet.create({

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