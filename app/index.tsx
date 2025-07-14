import Button from '@/components/ui/Button';
import ThemedTextInput from '@/components/ui/ThemedTextInput';
import TopBar from '@/components/ui/TopBar';
import { MODE_COLORS } from '@/constants/Colors';
import { useSession } from '@/context/SessionContext';
import { useTheme } from '@/context/ThemeContext';
import { createList, deleteList, getUserLists } from '@/supabase/lists';
import { List } from '@/types/List';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const { session } = useSession();
  const userId = session?.user.id;

  const [lists, setLists] = useState<List[]>([]);
  const [newTitle, setNewTitle] = useState('');

  const { primaryColor, mode } = useTheme();
  const color = MODE_COLORS[mode].text;
  const backgroundColor = MODE_COLORS[mode].background;

  useEffect(() => {
    if (userId) {
      getUserLists(userId).then(setLists).catch(console.error);
    }
  }, [userId, lists]);

  const handleCreate = async () => {
    if (!newTitle.trim() || !userId) return;
    const newList = await createList(newTitle, userId);
    setLists([newList, ...lists]);
    setNewTitle('');
  }

  const handleDelete = async (listId: string) => {
    // LISTS ARE SHARED!
    // WE SHOULD CHECK IF THE USER REALLY WANTS TO DELETE BEFORE PROCEEDING
    try {
      await deleteList(listId);
    } catch (error) {
      console.error('Failed to delete list', error);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Home" />
      <View style={[styles.container, { backgroundColor }]}>
        <Text style={[styles.heading, { color }]}>Your Lists</Text>
        <View style={styles.inputRow}>
          <ThemedTextInput
            value={newTitle}
            onChangeText={setNewTitle}
            placeholder="Enter list title"
            style={{ flex: 1 }}
          />
          <Button title="Add" onPress={handleCreate} />
        </View>

        <FlatList
          data={lists}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={[styles.itemTitle, { color }]}>{item.title}</Text>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={{ padding: 8 }}>
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 8 },
  input: { flex: 1, borderBottomWidth: 1, marginRight: 8, padding: 8 },
  listItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#ddd' },
  itemTitle: { padding: 12, fontSize: 18 },
})
