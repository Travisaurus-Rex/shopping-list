import Button from '@/components/ui/Button'
import ThemedTextInput from '@/components/ui/ThemedTextInput'
import TopBar from '@/components/ui/TopBar'
import { useTheme } from '@/context/ThemeContext'
import { createListItem, deleteListItem, getListItems, getListTitle } from '@/supabase/lists'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

export default function ListDetailScreen() {
  const { id: listId } = useLocalSearchParams();
  const [items, setItems] = useState<any[]>([]);
  const [newItem, setNewItem] = useState('');
  const [listTitle, setListTitle] = useState('');
  const { primaryColor, mode } = useTheme();

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

  const handleDelete = async (itemId: string) => {
    await deleteListItem(itemId);
    setItems(prev => prev.filter(item => item.id !== itemId));
  }

  return (
    <View style={{ flex: 1 }}>
      <TopBar title={listTitle} showBack />
      <View style={styles.inputRow}>
        <ThemedTextInput
          value={newItem}
          onChangeText={setNewItem}
          placeholder="Add item..."
          style={{ flex: 1 }}
        />
        <Button title="Add" onPress={handleAddItem} />
      </View>

      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={{ color: mode === 'dark' ? '#fff' : '#000' }}>{item.content}</Text>
            <Button
              title="🗑️"
              onPress={() => handleDelete(item.id)}
              fullWidth={false}
            />
          </View>
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
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
