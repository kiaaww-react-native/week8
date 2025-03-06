import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, TextInput } from 'react-native';
import { db } from './firebaseConfig'
import { addDoc, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(db, "list"));
    const itemList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setItems(itemList);
  };

  const addItem = async () => {
    if (input.trim() === "") return;

    console.log("Adding item:", input);
    try {
      const docRef = await addDoc(collection(db, "list"), { name: input });
      console.log("Added item ID:", docRef.id);
  
      setItems([...items, { id: docRef.id, name: input }]);
      setInput("");
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const removeItem = async (id) => {
    await deleteDoc(doc(db, "list", id));
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Add item..."
        />

          <Button title="Add" onPress={addItem} />
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <Text style={styles.item}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  item: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#ddd',
    fontSize: 18,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  inputContainer: {
    marginBottom: 20,
    flexDirection: 'row',
  },

});
