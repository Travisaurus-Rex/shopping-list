import { List } from '@/types/List';
import { supabase } from './client';

export async function createList(title: string, ownerId: string): Promise<List> {
  const { data, error } = await supabase.from('lists').insert([
    { title, owner_id: ownerId },
  ]).select().single();

  if (error) throw error;
  return data;
}

export async function deleteList(listId: string): Promise<List[] | null> {
  const { data, error } = await supabase
    .from('lists')
    .delete()
    .eq('id', listId);

  if (error) throw error;
  return data;
}

export async function getListTitle(listId: string): Promise<string> {
  const { data, error } = await supabase
    .from('lists')
    .select('title')
    .eq('id', listId)
    .single();

  if (error) throw error;
  return data.title;
}

export async function getUserLists(ownerId: string): Promise<List[]> {
  const { data, error } = await supabase
    .from('lists')
    .select('*')
    .eq('owner_id', ownerId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function getListItems(listId: string) {
  const { data, error } = await supabase
    .from('list_items')
    .select('*')
    .eq('list_id', listId)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data
}

export async function createListItem(listId: string, content: string) {
  const user = supabase.auth.getUser()
  const { data, error } = await supabase
    .from('list_items')
    .insert([{ list_id: listId, content, created_by: (await user).data.user?.id }])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteListItem(itemId: string) {
  const { data, error } = await supabase
    .from('list_items')
    .delete()
    .eq('id', itemId)

  if (error) throw error
  return data
}

