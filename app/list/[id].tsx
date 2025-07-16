import Button from '@/components/ui/Button'
import ThemedTextInput from '@/components/ui/ThemedTextInput'
import TopBar from '@/components/ui/TopBar'
import { MODE_COLORS } from '@/constants/Colors'
import { useTheme } from '@/context/ThemeContext'
import { createListItem, deleteListItem, getListItems, getListTitle, toggleListItemCompleted } from '@/supabase/lists'
import { ListItem } from '@/types/ListItem'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ListDetailScreen() {
  const { id: listId } = useLocalSearchParams();
  const [items, setItems] = useState<any[]>([]);
  const [newItem, setNewItem] = useState('');
  const [listTitle, setListTitle] = useState('');
  const { primaryColor, mode } = useTheme();
  const isDarkMode = mode === 'dark';
  const color = MODE_COLORS[mode].text;
  const backgroundColor = MODE_COLORS[mode].background;
  const borderColor = MODE_COLORS[mode].borderColor;

  useEffect(() => {
    if (typeof listId === 'string') {
      getListItems(listId).then(setItems).catch(console.error);
      getListTitle(listId).then(setListTitle).catch(console.error);
    }
  }, [listId]);

  const handleAddItem = async () => {
    if (!newItem.trim()) return;
    const added = await createListItem(listId as string, newItem.trim());
    setItems(prev => [...prev, added]);
    setNewItem('');
  }

  const handleDelete = async (itemId: number) => {
    await deleteListItem(itemId);
    setItems(prev => prev.filter(item => item.id !== itemId));
  }

  const handleToggleCompleted = async (itemId: number, currentState: boolean) => {
    try {
      await toggleListItemCompleted(itemId, currentState);
      setItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, completed: !currentState } : item
        )
      );
    } catch (err) {
      console.error('Failed to toggle completed state:', err);
    }
  };

  const ItemList = ({
    items,
    onDeleteItem,
    onToggleCompleted,
    color,
  }: {
    items: ListItem[];
    onDeleteItem: (id: number) => void;
    onToggleCompleted: (id: number, currentStatus: boolean) => void;
    color: string;
  }) => {
    const swipeableRow = useRef<Swipeable | null>(null);
    const [isSwiping, setIsSwiping] = useState(false);

    const closeSwipe = () => {
      if (swipeableRow.current) {
        swipeableRow.current.close();
      }
    }

    return (
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Swipeable
            ref={(ref) => {
              if (ref) swipeableRow.current = ref;
            }}
            onSwipeableWillOpen={() => setIsSwiping(true)}
            onSwipeableWillClose={() => setTimeout(() => setIsSwiping(false), 100)}
            renderRightActions={() => (
              <TouchableOpacity
                onPress={() => {
                  onDeleteItem(item.id);
                  closeSwipe();
                }}
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
              style={styles.itemRow}
              onPress={() => {
                if (!isSwiping) {
                  onToggleCompleted(item.id, item.completed);
                }
              }}
            >
              <Text
                style={{
                  color: item.completed ? 'gray' : color,
                  textDecorationLine: item.completed ? 'line-through' : 'none',
                }}
              >
                {item.content}
              </Text>
            </TouchableOpacity>
          </Swipeable>
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? 'black' : primaryColor }}>
      <TopBar title={listTitle} showBack />
      <View style={{ flex: 1 , backgroundColor}}>
        <View style={styles.inputRow}>
          <ThemedTextInput
            value={newItem}
            onChangeText={setNewItem}
            placeholder="Add item..."
            style={{ flex: 1 }}
          />
          <Button title="Add" onPress={handleAddItem} />
        </View>
        { (!items || items.length == 0) &&
          <View style={{ padding: 24, margin: 16, borderStyle: 'solid', borderWidth: 1, borderColor, borderRadius: 6 }}>
            <Text style={{ color, textAlign: 'center' }}>No items yet</Text>
          </View>
        }
        { items && items.length > 0 &&
          <ItemList
            items={items}
            onDeleteItem={handleDelete}
            onToggleCompleted={handleToggleCompleted}
            color={color}
          />
        }
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
})
