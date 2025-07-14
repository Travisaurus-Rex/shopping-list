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


export async function getUserLists(ownerId: string): Promise<List[]> {
  const { data, error } = await supabase
    .from('lists')
    .select('*')
    .eq('owner_id', ownerId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}
