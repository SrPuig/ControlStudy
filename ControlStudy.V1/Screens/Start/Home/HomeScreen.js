import React, { useState ,useContext ,useEffect } from 'react';
import { StyleSheet, Text, View,ImageBackground, Image, Linking,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageContext  from './PantallaProvider';
import Modal from 'react-native-modal';
import TaskListToday from './Todaytask';

//Pantalla principal donde se muestran las tareas de hoy y los botones para navegar a las siguientes funcionalidades

export default function HomeScreen({navigation}){
 
  const { imageUrl, setImageUrl } = useContext(ImageContext);
  const apiKey = 'nu_rUordD-LYAXezB_GvUvJ95TqhImTE2kEf75GKpA0';
  const [author , setAuthor] = useState("false");
  
  const [modalVisible, setModalVisible] = useState(false);
  
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    loadSavedImage();
    },[]);
    
const toggleModal = () => {
  setIsVisible(!isVisible);
  
};
//Realiza la petición de la imagen a traves de una llamada a la función fetchRandomPhoto y
// guarda el url de la imagen devuelta
  const fetchBackgroundImage = async () => {
    const url = await fetchRandomPhoto(apiKey);
    
    setImageUrl(url);
  };

  
//Recoge del almacenamiento la imagen y la informacion guardada del anterior guardado

  const loadSavedImage = async () => {
    try {
      const savedImageUrl = await AsyncStorage.getItem('backgroundImage');
      const authorsavedImageUrl = await AsyncStorage.getItem('authorbackgroundImage');
      //Si no hay imagen guardada realiza la petición a la API a traves de la función fetchBackgroundImage
      if (savedImageUrl) {
        setImageUrl(savedImageUrl);
        setAuthor(authorsavedImageUrl);
      } else {
        fetchBackgroundImage();
      }
    } catch (error) {
      console.error('Error loading saved image:', error);
      fetchBackgroundImage();
    }
  };


  //Realiza la petición a la API a traves del url y la apaikey propia de mi usuario .
  // Para funcionamiento comercial hay que cambiar a usario empresarial.

  const fetchRandomPhoto = async (apiKey) => {
    const url = `https://api.unsplash.com/photos/random?client_id=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      const author = data.user.name;
     // Actualizar el estado con la nueva imagen y autor    
      setAuthor(author);
      return data.urls.full;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
   //Guarda en el almacenamiento del telefono la url y el autor de la imagen 
  const saveImageToStorage = async () => {
    try {
      await AsyncStorage.setItem('backgroundImage', imageUrl);
      await AsyncStorage.setItem('authorbackgroundImage', author);
      console.log('Image saved successfully.');
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  const openModal = () => {
    setModalVisible(!modalVisible);
  };


  return (
    
<ImageBackground age source={{ uri: imageUrl }} style={{ flex: 1 ,resizeMode: 'cover' }} >
  <View style={styles.container}>
    <View style={styles.view_List}>
         <TaskListToday/>
    </View>
    <View style={styles.view_row}>
        
      <TouchableOpacity
      onPress={() => navigation.navigate('Concentrate')}
            title="Pomodoro">
        <View style={styles.view} >

         <Text style={styles.Text_list} >Pomodoro</Text>
       </View>
     </TouchableOpacity>

    <TouchableOpacity
      onPress={() => navigation.navigate('Tarjetas')}
            title="Tarjetas">
      <View style={styles.view} >

        <Text style={styles.Text_list} >Tarjetas</Text>
       </View>
     </TouchableOpacity>
  
    
  <TouchableOpacity
      onPress={() => navigation.navigate('Tareas')}
            title="Tareas"
    >
      <View style={styles.view}>
      <Text style={styles.Text_list} >Tareas</Text>
     </View>
    </TouchableOpacity>
    
 

    </View>

  <Modal isVisible={isVisible}>   
  <View style={styles.view} >
      <View style={styles.view_modal}>
          <Text style={styles.Text}> ¡ Bienvenido ! ControlStudy es tu aplicación 
          para tener un estudio eficiente y una planificación correcta.
           Con Pomodoro te concentraras para sacar el mayor partido a tu tiempo.
          Puedes crear y repasar con tus propias tarjetas o flascards para memorizar 
          pequeños conceptos o definiciones. También podrás realizar un seguimiento de tu estudio para saber cuando debes repasar
           una materia o tema y que no se caiga en el olvido . </Text>
          
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
     <Modal isVisible={modalVisible} transparent={true}>
     <ImageBackground age source={{ uri: imageUrl }} style={{ flex: 1 ,resizeMode: 'cover' }} > 
        <View >
             <TouchableOpacity
             onPress={saveImageToStorage}
             title="Guardar imagen"
              style={styles.view_conf}>
                   <Text style={styles.Text_list} >Guardar imagen</Text>
     
            </TouchableOpacity>
            <TouchableOpacity
             onPress={fetchBackgroundImage}
             title="Obtener imagen"
              style={styles.view_conf}>
                   <Text style={styles.Text_list} >Nueva imagen</Text>
     
            </TouchableOpacity>
            <TouchableOpacity
             onPress={openModal}
             title="Cerrar"
              style={styles.view_conf}>
                   <Text style={styles.Text_list} >Cerrar</Text>
     
            </TouchableOpacity>
            </View>
            <View style={styles.authorTextContainer}>
                   <Text style={styles.authorText}>Autor: {author}</Text>
               </View>
      </ImageBackground>
      <TouchableOpacity
          onPress={() => Linking.openURL('https://unsplash.com/es')}
          style={styles.linkContainer}
      >
         <Text style={styles.linkText}>Fuente de imagenes Unsplash</Text>
      </TouchableOpacity>
    </Modal>
    <View style={styles.view_row}> 
        <TouchableOpacity
             onPress= {openModal
            }
            title="Configuracion ">
            <View>
              <Text style={styles.Text_icon} > ⚙️</Text>
           </View>
        </TouchableOpacity>  
        <TouchableOpacity onPress={toggleModal} >
          <Image
          source={require('./pet-1.webp')} 
          style={styles.Image}
          />
        </TouchableOpacity>
      </View>
    </View>
  </ImageBackground>
  );
};
const styles = StyleSheet.create({
  
  Text: {
    fontFamily: 'Cochin',
    fontSize: 22,
    fontWeight: 'bold',
    color: "white",
    },

  view_row: { 
    flexDirection: 'row' ,
    justifyContent: 'center',
    padding: 4,
    marginTop:40
      
    },
  Image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    marginTop:10,
    marginLeft :200,
  },
  Text_icon: {
    fontFamily: 'Cochin',
    fontSize: 66,
    fontWeight: 'bold',
  },
Text_list: {
  fontFamily: 'Cochin',
  fontSize: 22,
  fontWeight: 'bold',
  color: "#A85D31",
},
Text_modal: {
  fontFamily: 'Cochin',
  fontSize: 25,
  fontWeight: 'bold',
  color: "#B27342",
},
authorTextContainer: {
  position: 'absolute',
  bottom: 10,
  right: 10,
  backgroundColor: '#F5E6CA', // Color de fondo amarillo hueso
  padding: 8,
  borderRadius: 4,
},
authorText: {
  
  fontFamily: 'Cochin',
  color: '#A85D31',
  fontSize: 14,
  fontWeight: 'bold',
  textDecorationLine: 'underline', // Agregar línea debajo del texto
},
view: {  
  backgroundColor: '#E7C7B4',
  borderRadius: 4,
  justifyContent: 'right',
  padding: 3,
  marginTop:20,
  marginLeft:15,
  marginRight:15,
  color:'white',
},
view_conf: {  
  justifyContent: 'left', 
  backgroundColor: '#E7C7B4',
  borderRadius: 4,
  padding: 3,
  marginTop:20,
  marginLeft:15,
  width: 160,
  height: 30,
},
view_modal:{
  
  justifyContent: 'center', 
  alignItems: 'center',
  width:350,
  height:400,
  backgroundColor: '#B27342',
  borderColor: "#A85D31",
  borderRadius: 4,
  justifyContent: 'center',
  padding: 3,
  color:'white',
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
linkContainer: {
  backgroundColor: 'yellow',
  borderRadius: 8,
  paddingVertical: 8,
  paddingHorizontal: 16,
},
  });