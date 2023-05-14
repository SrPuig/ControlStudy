import React, { createContext, useState , useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
const ImageContext = createContext();
//Componente para compartir y actualizar al momento la imagen de fondo,las tareas y preguntas
export const ImageProvider = ({ children }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [questions, setQuestions] = useState(null);
  
  const [tasks, setTasks] = useState(null);
  
  
  useEffect(() => {
    loadQuestions();
    loadTasks();
  }, []);
  const loadQuestions = async () => {
    try {
      const questionsString = await AsyncStorage.getItem('questions');
      if (questionsString !== null) {
        const questions = JSON.parse(questionsString);
        setQuestions(questions);
        console.log('Questions loaded successfully.' + questionsString);
      }
    } catch (e) {
      console.log('Error loading questions:', e);
    }
  };
  
  const loadTasks = async () => {
    try {
      const tasksString = await AsyncStorage.getItem('tasks');
      if (tasksString !== null) {
        const tasks = JSON.parse(tasksString);
        setTasks(tasks);
      }
    } catch (e) {
      console.log('Error loading Tasks:', e);
    }
  };

  return (
    <ImageContext.Provider value={{ imageUrl, setImageUrl , questions , setQuestions ,tasks, setTasks }}>
      {children}
    </ImageContext.Provider>
  );
};

export default  ImageContext;