import  React,{ useEffect, useState , useCallback,useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {View, Text, FlatList, StyleSheet ,ScrollView,TouchableOpacity,ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageContext from './PantallaProvider';

// Componente que muestra todas las tareas 


const TaskList = () => {
  const {tasks, setTasks} = useContext(ImageContext);
  const[isVisible, setIsVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // Código a ejecutar cuando la pantalla obtenga el enfoque
      loadTasks();
    }, []));

  useEffect(() => {
    loadTasks();
    
  }, []);

  const loadTasks = async () => {
    try {
      const tasksString = await AsyncStorage.getItem('tasks');
      if (tasksString !== null) {
        const savedTasks = JSON.parse(tasksString);
        const tasksWithCompletion = savedTasks.map((task, index) => ({
          ...task,
          id: index + 1
        }));
        
        setTasks(tasksWithCompletion);
      }
    } catch (e) {
      console.log('Error loading tasks:', e);
    }
  };
  
 
  const renderTaskItem = ({ index, item }) => {
    
    // Obtener la fecha actual
    const taskDate = new Date(item.date);

    // Obtener el día, mes y año de la tarea
    const taskDay = taskDate.getDate();
    const taskMonth = taskDate.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por eso se suma 1
    const taskYear = taskDate.getFullYear();



    // Crear la cadena de formato "dd/mm/yyyy"
    const formattedDate = `${taskDay}/${taskMonth}/${taskYear}`;




    return (
      <ScrollView>
        <View key={item.id}>
          <TouchableOpacity>
            <Text style={styles.Text_list}>________________________________</Text>
            <Text style={styles.Text_list}>{`${index + 1}. ${item.task}` }</Text>
            <Text style={styles.Text_list}>    {`${formattedDate}`}</Text>
            <Text style={styles.Text_list}>________________________________</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };
  
  return (
    <ImageBackground source={require('./papel-pintado-textura-papel-marron-blanco.jpg')} style={styles.view_image}>

      <View style={styles.view}>
      
        <Text>________________________________</Text>
        <Text style={styles.Text_list} >Tareas Pendientes</Text>     
        <Text >________________________________</Text>
        <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item, index) => index.toString()}
         />
      </View>
    
    </ImageBackground>
  );
};

export default TaskList;


const styles = StyleSheet.create({
  view: { 
    padding: 6,
    marginTop:10,
    marginRight:10,
  },
  Text_list: {
    fontFamily: 'Cochin',
    fontSize: 22,
    fontWeight: 'bold',
    
  },
  view_image: {
    borderRadius: 10, 
    overflow: 'hidden', 
  },
  
});

