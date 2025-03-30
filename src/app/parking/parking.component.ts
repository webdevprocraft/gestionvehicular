import { Component, ViewChild, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { Table } from 'primeng/table';
interface RegistroPlaca {
  id?: string;
  placa: string;
  calles: string;
  horaRegistro: string;
  estatus: string;
  color: string;
}

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss']
})
export class ParkingComponent implements OnInit {
  nuevaPlaca: string = '';
  calles: string = '';
  registros: RegistroPlaca[] = [];

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    this.obtenerRegistros();
  }

  @ViewChild('dt1') dt!: Table;


  async obtenerRegistros() {
    try {
      this.registros = await this.supabaseService.obtenerRegistros();
    } catch (error) {
      console.error('Error obteniendo registros:', error);
    }
  }

  async agregarPlaca() {
    if (!this.nuevaPlaca.trim() || !this.calles.trim()) {
      alert('Ingrese todos los datos.');
      return;
    }

    try {
      await this.supabaseService.agregarPlaca(this.nuevaPlaca, this.calles);
      this.nuevaPlaca = '';
      this.calles = '';
      this.obtenerRegistros();
    } catch (error) {
      alert('Error agregando placa. Verifica que no esté repetida.');
    }
  }

  async eliminarRegistro(id: string) {
    if (confirm('¿Seguro que quieres eliminar este registro?')) {
      try {
        await this.supabaseService.eliminarRegistro(id);
        this.obtenerRegistros();
      } catch (error) {
        alert('Error eliminando registro.');
      }
    }
  }

  async eliminarTodas() {
    if (confirm('¿Seguro que quieres eliminar TODOS los registros?')) {
      try {
        await this.supabaseService.eliminarTodos();
        this.obtenerRegistros();
      } catch (error) {
        alert('Error eliminando registros.');
      }
    }
  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}
