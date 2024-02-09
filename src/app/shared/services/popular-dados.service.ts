import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopularDadosService {
  popularFormDados(dados:any, formulario:any) {
    formulario.patchValue({
      endereco: {
        cep: dados.cep,
        numero: dados.numero,
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      }
    });
  }
  constructor() { }
}
