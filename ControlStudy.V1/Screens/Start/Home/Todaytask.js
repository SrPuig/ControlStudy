import React,{ useEffect ,useCallback,useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {View, Text, FlatList, StyleSheet ,ScrollView,TouchableOpacity,ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageContext from './PantallaProvider';


// Componente que muestra las tareas del dia actual
const TaskListToday = () => {

  const {tasks, setTasks} = useContext(ImageContext);

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
    const taskDate = new Date(item.date);
    const currentDate = new Date();
 //comprobar si la fecha coincide con la actual   
    if (
      taskDate.getDate() === currentDate.getDate() &&
      taskDate.getMonth() === currentDate.getMonth() &&
      taskDate.getFullYear() === currentDate.getFullYear()
    ) {
      return (
        <ScrollView>
          <View key={item.id}>
            <TouchableOpacity>
              <Text style={styles.Text_list}>________________________________</Text>
              <Text style={styles.Text_task_today}>{  `${item.task}` }</Text>
              <Text style={styles.Text_list}>________________________________</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    } else {
      // La tarea no coincide con el día de hoy, no se muestra
      return (
        <ScrollView>
        </ScrollView>
      );
    }
  };
  
  
  
  return (
    <ImageBackground source={require('./papel-pintado-textura-papel-marron-blanco.jpg')} style={styles.view_image}>
     <View style={styles.view}>     
         <Text>________________________________</Text>
         <Text style={styles.Text_list} >Tareas pendientes de hoy</Text>     
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

export default TaskListToday;



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
  Text_task_today: {
    fontFamily: 'Cochin',
    fontSize: 22,
    fontWeight: 'bold',
    color: "blue",
    
  },
  view_image: {
    borderRadius: 10, 
    overflow: 'hidden', 
  },
  
});

