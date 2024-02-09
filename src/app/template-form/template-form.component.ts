import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { PopularDadosService } from '../shared/services/popular-dados.service';
import { ResetaDadosService } from '../shared/services/reseta-dados.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrl: './template-form.component.scss',
})
export class TemplateFormComponent {
  constructor(
    private http: HttpClient,
    private cepService: ConsultaCepService,
    private popularDadosService: PopularDadosService,
    private resetaDadosService: ResetaDadosService
  ) {}

  user: any = {
    nome: null,
    email: null,
  };

  onSubmit(form: any) {
    this.http
      .post('https://httpbin.org/post', JSON.stringify(form.value))
      .pipe(map((res: any) => res))
      .subscribe((dados: any) => console.log(dados));
  }

  verificaValidTouched(campo: any) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo: any) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo),
      'is-invalid': this.verificaValidTouched(campo),
    };
  }
  aplicaCssValid(campo: any) {
    return { 'is-valid': campo.valid };
  }

  msgDeValidacao(campo: any) {
    if (this.verificaValidTouched(campo)) {
      return this.aplicaCssErro(campo);
    } else return this.aplicaCssValid(campo);
  }
  consultaCEP(cep: any, form: any) {
    cep = cep.replace(/\D/g, '');
    if (cep !== '' && cep != null) {
      this.cepService.consultaCEP(cep)?.subscribe((dados) => {
        console.log("ola")
        this.resetaDadosService.resetaFormDados(form.form)
        this.popularDadosService.popularFormDados(dados, form.form);
      });
    }
  }
}
