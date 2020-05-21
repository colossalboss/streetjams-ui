import { NgModule } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';


// src/app/material.module.ts
import {  MatSliderModule } from "@angular/material/slider";

const modules = [
  MatButtonModule,
  MatListModule,
  MatSliderModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule
];

@NgModule({
  imports: modules,
  exports: modules
})

export class MaterialModule { }
