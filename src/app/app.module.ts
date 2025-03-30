import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {TableModule} from 'primeng/table';
import { AppComponent } from './app.component';
import { ParkingComponent } from './parking/parking.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ParkingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TableModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
