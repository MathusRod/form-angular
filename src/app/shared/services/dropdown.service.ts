import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Estados } from '../models/estados';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadoBr(){return this.http.get<Estados>('assets/dados/estadosBr.json').pipe();}

  getCargo(){
    return [
      {nome: "Dev", nivel: "Junior", desc: "Dev Jr"},
      {nome: "Dev", nivel: "Pleno", desc: "Dev Pl"},
      {nome: "Dev", nivel: "Senior", desc: "Dev Sr"},
    ]
  }
}
