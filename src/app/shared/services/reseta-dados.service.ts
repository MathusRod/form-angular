import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetaDadosService {
  resetaFormDados(formulario:any) {
    console.log("ola2")
    formulario?.patchValue({
      endereco: {
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null,
      },
    });
  }
  constructor() { }
}
