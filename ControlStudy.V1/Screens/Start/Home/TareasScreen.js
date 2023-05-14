import React,{ useState ,useEffect,useContext } from 'react';
import { Image,TouchableOpacity,  StyleSheet, Text, View ,ImageBackground ,TextInput,Keyboard} from 'react-native';
import ImageContext  from './PantallaProvider';
import TaskList from './Tasks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';


//Pantalla donde visualizar todas los recordatorios o tareas ,
// poder añardirlas y poder navegar a la pantalla donde poder borrarlas
export default function Tareas({navigation}){
  const {tasks, setTasks} = useContext(ImageContext);
  
  const [isVisible, setIsVisible] = useState(false);
  const { imageUrl, setImageUrl } = useContext(ImageContext);
  
  const [isVisibleRepasos, setIsVisibleRepasos] = useState(false);

  const [materiarepaso, setMateriarepaso] = useState("");
  useEffect(() => {
    loadTasks();
    }, []);

  
  const toggleModal = () => {
    setIsVisible(!isVisible);
  
  };
  
  const loadTasks = async () => {
    try {
      console.log(tasks);
      const tasksString = await AsyncStorage.getItem('tasks');
      if (tasksString !== null) {
        const savedTasks = JSON.parse(tasksString);
        setTasks(savedTasks);
      }
    } catch (e) {
      console.log('Error loading tasks:', e);
    }
  };
  
  const toggleModalRepasos = () => {
    setIsVisibleRepasos(!isVisibleRepasos);
  };


  //Funciones de guardado encadenadas para ser activadas escalonadamnete pero con
  // la variacion de la fecha de repaso 
  const saveTask = async () => {
      try {
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
          date: tomorrowDate, // Convertir la fecha a formato ISO8601 (opcional)
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
    
    const saveTask7 = async () => {
      try {
        // Obtener la lista de tareas almacenada en AsyncStorage
        const tasksString = await AsyncStorage.getItem('tasks');
        const tasks = tasksString ? JSON.parse(tasksString) : [];
    
        // Obtener la fecha actual y guardar la fecha de dentro de 7 dias 
        const currentDate = new Date();
        const nextweekDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7);
        // Crear el objeto de la nueva tarea con la fecha
        const newTask = {
          task: "Segundo repaso: " +materiarepaso,
          date:  nextweekDate, // Convertir la fecha a formato ISO8601 (opcional)
        };
    
        // Guardar la nueva tarea en la lista
        tasks.push(newTask);
    
        // Guardar la lista de tareas actualizada en AsyncStorage
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
          //llama  ala funcion que guarda el recordatorio de los 7 dias despues 
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
    
        // Obtener la fecha actual y la de dentro de 15 dias 
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
        loadTasks();
      } catch (error) {
        console.error('Error al guardar la tarea:', error);
      }
    };

    
    const notificacion = () => {
      saveTask();
    };


  return (
  <ImageBackground age source={{ uri: imageUrl }} style={{ flex: 1,resizeMode: 'cover' }} >
  <View style={styles.layout}>
    
    <View style={styles.view_List}>
       <TaskList/>
    </View>
    <View >
    
    <View style={styles.view_row}>
     
      <TouchableOpacity onPress={toggleModalRepasos}>
        <View style={{marginRight:40}}>
            <Text style={styles.Text_list} >🖋️</Text>
        </View>
      </TouchableOpacity>


    <TouchableOpacity onPress={() => navigation.navigate('BorrarTarea')}>
        <View style={{marginRight:40}}>
            <Text style={styles.Text_list} >❎</Text>
        </View>
      </TouchableOpacity>
    </View>
    </View>
  </View>
  <Modal isVisible={isVisibleRepasos}>
        <View style={styles.view_modal2}>
          <Text style={styles.Text}>Te lo recordaremos para que no se te olvide repasar ;) </Text>
          
        <TextInput
        multiline
        maxLength={100}
        placeholder="¿Que has estudiado hoy? "
        value={materiarepaso}
        onChangeText={setMateriarepaso}
        onBlur={() => Keyboard.dismiss()}
        style={styles.input}
      />

          
          <TouchableOpacity onPress={notificacion}>
            <View style={styles.view}> 
              <Text style={styles.Text_modal} >Guardar </Text>
             </View>
          </TouchableOpacity>
        
        
          <TouchableOpacity onPress={toggleModalRepasos}>
          <View style={styles.view}> 
            <Text style={styles.Text_modal} >Volver</Text>
            </View>
          </TouchableOpacity>
        
        </View>
      </Modal>
  <Modal isVisible={isVisible}>
    
  <View style={styles.view} >   
      <View style={styles.view_modal}>
          <Text style={styles.Text}>
          Crea nuevos recordatorios de lo estudiado (🖋️) o  bien borra los cuando ya lo hayas repasado (❎). 
        Recuerda que seguimos la metodología teniendo en cuenta la curva del olvido. Esto quiere decir que te recordaremos mañana , dentro 
        de 7 días y dentro de 15 lo que hayas estudiado hoy para tener el conocimiento fresco y no se te olvide.
             </Text>
        
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
      
  <TouchableOpacity onPress={toggleModal} >
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
    marginTop:60,
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
    height: 100,
    width: 220,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:10,
     backgroundColor: '#B27342',
  },
    view_row: { 
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
  justifyContent: 'center', 
  alignItems: 'center',
  backgroundColor: '#E7C7B4',
  borderColor: "#A85D31",
  borderRadius: 4,
  justifyContent: 'center',
  marginLeft:15,
  marginTop:20,
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