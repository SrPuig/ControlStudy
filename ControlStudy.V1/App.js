
//Titulo: ControlStudy.v1
//Autor: Miguel Puig Hernandez 
//Fecha: 15/05/2023
//Descripción: Aplicacion de ayuda a la planificacion del estudio y mejor de la eficacia de este mediante 
//metodos y tecnicas como Pomodoro ,Flashcards y recordatorios teniendo en cuenta la curva del olvido.

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ImageProvider } from './Screens/Start/Home/PantallaProvider';
import Pomodoro from './Screens/Start/Home/PomodoroScreen.js';
import Pause from './Screens/Start/Home/PauseScreen';
import HomeScreen from './Screens/Start/Home/HomeScreen';
import Tarjetas from './Screens/Start/Home/TarjetasScreen';
import Repasar from './Screens/Start/Home/RepasarScreen';
import AñadirPregunta from './Screens/Start/Home/AñadirPreguntaScreen';
import Borrar from './Screens/Start/Home/BorrarTarjetaScreen';
import Tareas from './Screens/Start/Home/TareasScreen';
import BorrarTarea from './Screens/Start/Home/BorrarTareaScreen';

const Stack = createStackNavigator();


//Componente principal de la aplicacion donde se indica la navegacion de esta.
export default function App(){
    return (
      
      <ImageProvider>
      <NavigationContainer>
        <Stack.Navigator options="true" 
                screenOptions={{
                  headerStyle: { backgroundColor: '#E7C7B4' }, // Establecer el color de fondo del encabezado del modal
                  tabBarStyle: { backgroundColor: '#E7C7B4' }, // Establecer el color de fondo del área de las pestañas
                  headerTintColor: '#A85D31',
                }}>
          <Stack.Group>
            <Stack.Screen name="ControlStudy" component={HomeScreen} />
          </Stack.Group>          
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
             <Stack.Screen name="Concentrate" component={Pomodoro} />
             <Stack.Screen name="Descansa" component={Pause} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
             <Stack.Screen name="Tarjetas" component={Tarjetas} />
             <Stack.Screen name="Repasar" component={Repasar} />
             <Stack.Screen name="Añadir" component={AñadirPregunta} />
             <Stack.Screen name="Borrar" component={Borrar} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
             <Stack.Screen name="Tareas" component={Tareas} />
             <Stack.Screen name="BorrarTarea" component={BorrarTarea} />             
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </ImageProvider>
    );
}
