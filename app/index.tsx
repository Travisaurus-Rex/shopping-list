import Button from '@/components/ui/Button';
import ThemedTextInput from '@/components/ui/ThemedTextInput';
import TopBar from '@/components/ui/TopBar';
import { MODE_COLORS } from '@/constants/Colors';
import { useSession } from '@/context/SessionContext';
import { useTheme } from '@/context/ThemeContext';
import { createList, deleteList, getUserLists } from '@/supabase/lists';
import { List } from '@/types/List';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {
  const { session } = useSession();
  const router = useRouter();
  const userId = session?.user.id;
  const [lists, setLists] = useState<List[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [swiping, setSwiping] = useState(false);
  const { primaryColor, mode } = useTheme();
  const isDarkMode = mode === 'dark';
  const color = MODE_COLORS[mode].text;
  const backgroundColor = MODE_COLORS[mode].background;
  const swipeableRefs = useRef(new Map<string, Swipeable | null>())

  useEffect(() => {
    if (userId) {
      getUserLists(userId).then(setLists).catch(console.error);
    }
  }, [userId]);

  const handleCreate = async () => {
    if (!newTitle.trim() || !userId) return;
    const newList = await createList(newTitle, userId);
    setLists([newList, ...lists]);
    setNewTitle('');
  }

  const handleDelete = async (listId: string) => {
    if (!await confirm('Are you sure you want to delete this list?')) return;

    try {
      await deleteList(listId);
      const swipeable = swipeableRefs.current.get(listId);
      swipeable?.close();
      setLists(currentLists => currentLists.filter(list => list.id !== listId));
    } catch (error) {
      console.error('Failed to delete list', error);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? 'black' : primaryColor }}>
      <TopBar title="Home" />
      <GestureHandlerRootView style={{ flex: 1, backgroundColor }}>
        <View style={[styles.container, { backgroundColor }]}>
          <Text style={[styles.heading, { color }]}>Your Lists</Text>
          <View style={styles.inputRow}>
            <ThemedTextInput
              value={newTitle}
              onChangeText={setNewTitle}
              placeholder="Enter list title"
            />
            <Button title="Add" onPress={handleCreate} />
          </View>

          <FlatList
            data={lists}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Swipeable ref={(ref) => {swipeableRefs.current.set(item.id, ref)}}
                onSwipeableWillOpen={() => setSwiping(true)}
                onSwipeableClose={() => setSwiping(false)}
                renderRightActions={() => (
                  <TouchableOpacity
                    onPress={() => handleDelete(item.id)}
                    style={{
                      backgroundColor: 'red',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 64,
                      height: '100%',
                    }}
                  >
                    <Ionicons name="trash-outline" size={24} color="white" />
                  </TouchableOpacity>
                )}
              >
                 <TouchableOpacity
                    style={styles.listItem}
                    onPress={() => {
                      if (!swiping) {
                        router.push({ pathname: '/list/[id]', params: { id: item.id } })
                      }
                    }}
                  >
                    <Text style={[styles.itemTitle, { color }]}>{item.title}</Text>
                  </TouchableOpacity>
              </Swipeable>
            )}
          />

        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
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
