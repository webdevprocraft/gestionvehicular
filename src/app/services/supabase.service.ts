import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

  async obtenerRegistros() {
    const { data, error } = await this.supabase.from('registros_placas').select('*');
    if (error) throw error;
    return data;
  }

  async agregarPlaca(placa: string, calles: string) {
    const { error } = await this.supabase.from('registros_placas').insert([
      { placa, calles, estatus: 'A tiempo', color: 'green' }
    ]);
    if (error) throw error;
  }

  async eliminarRegistro(id: string) {
    const { error } = await this.supabase.from('registros_placas').delete().match({ id });
    if (error) throw error;
  }

  async eliminarTodos() {
    const { error } = await this.supabase.from('registros_placas').delete();
    if (error) throw error;
  }
}
