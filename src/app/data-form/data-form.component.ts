import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { DropdownService } from '../shared/services/dropdown.service';
import { Estados } from '../shared/models/estados';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { PopularDadosService } from '../shared/services/popular-dados.service';
import { ResetaDadosService } from '../shared/services/reseta-dados.service';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrl: './data-form.component.scss',
})
export class DataFormComponent {
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private dropDown: DropdownService,
    private cepService: ConsultaCepService,
    private popularDadosService: PopularDadosService,
    private resetaDadosService: ResetaDadosService
  ) {}

  formulario: FormGroup;
  estados: Observable<Estados[]>;
  cargos: any[];

  ngOnInit() {
    // this.dropDown.getEstadoBr().subscribe((dados: any) => {
    //   this.estados = dados;
    // });

    this.estados = this.dropDown.getEstadoBr().pipe(map((resp: any) => resp)); 

    this.cargos = this.dropDown.getCargo()

    this.formulario = this.formBuilder.group({
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),
      cargo: [null]
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      console.log('valido');
      this.http
        .post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
        .pipe(map((res: any) => res))
        .subscribe(
          (dados: any) => {
            console.log(dados);
          },
          (error: any) => alert('erro')
        );
    } else {
      this.verificaValidacoesForm(this.formulario);
      console.log('invalido');
    }
  }

  resetar() {
    this.formulario.reset();
  }

  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(this.formulario.controls).forEach((campo) => {
      const controle = formGroup.get(campo);
      controle?.markAllAsTouched();
    });
  }

  

  verificaEmailInvalido() {
    let campoEmail = this.formulario.get('email');
    if (campoEmail?.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }
  verificaValidTouched(campo: string) {
    return (
      !this.formulario.get(campo)?.valid &&
      (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
    );
  }

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo),
      'is-invalid': this.verificaValidTouched(campo),
    };
  }
  aplicaCssValid(campo: string) {
    return { 'is-valid': this.formulario.get(campo)?.valid };
  }

  msgDeValidacao(campo: string) {
    if (this.verificaValidTouched(campo)) {
      return this.aplicaCssErro(campo);
    } else return this.aplicaCssValid(campo);
  }

  consultaCEP() {
    const cep = this.formulario.get('endereco.cep')?.value;
    if (cep !== '' && cep != null) {
      this.cepService.consultaCEP(cep)?.subscribe((dados) => {
        this.resetaDadosService.resetaFormDados(this.formulario)
        this.popularDadosService.popularFormDados(dados, this.formulario);
      });
    }
  }

  setCargo(){
    const cargo = {nome: "Dev", nivel: "Pleno", desc: "Dev Pl"}
    this.formulario.get('cargo')?.setValue(cargo)
  }
  compararCargos(obj1:any,obj2:any){
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2
  }
}
