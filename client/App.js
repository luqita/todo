import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaViewBase,StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { FlatList } from 'react-native';
import Task from './components/Task';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch("http://localhost:8080/todos/1");
    const data = await response.json();
    setTodos(data);
  }

  function clearTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => 
        todo.id === id ? { ...todo, completed: todo.completed === 0 ? 1 : 0 } : todo
      )
    );
  }

  return ( 
  < BottomSheetModalProvider>  
    <View style={styles.container}>
      <SafeAreaView> 
        <FlatList
        data = {todos}
        keyExtractor={(todo) => todo.id.toString()}
        renderItem={({item}) => <Task {...item} toggleTodo={toggleTodo} clearTodo={clearTodo} />}
        ListHeaderComponent={() => <Text style = {styles.title}>Today</Text>}
        contentContainerStyle ={styles.contentContainerStyle}
        />
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9E9EF',
    
  },
  contentContainerStyle: {
    padding: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 15,
  }
});
