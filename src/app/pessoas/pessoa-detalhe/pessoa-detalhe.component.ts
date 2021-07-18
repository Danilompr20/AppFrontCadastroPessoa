import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pessoa } from 'src/app/model/pessoa';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-pessoa-detalhe',
  templateUrl: './pessoa-detalhe.component.html',
  styleUrls: ['./pessoa-detalhe.component.css']
})
export class PessoaDetalheComponent implements OnInit {
  pessoa  ={} as Pessoa;
  form: any;
  estadoSalvar ='post'
  constructor(private router: ActivatedRoute,private  pessoaService:PessoaService, private toastr: ToastrService,
     private route:Router) { }
  public carregaPessoa(){
    const param = this.router.snapshot.paramMap.get('id');
      if(param != null){
        this.estadoSalvar ='put';
          this.pessoaService.getPessoasByid(+param).subscribe({
          next:(response:  Pessoa)=>{
            this.pessoa=  {...response};
              this.form.patchValue(this.pessoa);

          },
          error:(error:any)=>{
            console.log(error)
          },
          complete:()=>{},
          });
      }
}
  ngOnInit() {
    this.validation();
    this.carregaPessoa();
  }
  public validation():void{
    this.form = new FormGroup({

            nome :new FormControl("",Validators.required),
            sobreNome :new FormControl("",Validators.required),
            nacionalidade :new FormControl("",Validators.required),
            cep :new FormControl("",Validators.required),
            estado :new FormControl("",Validators.required),
            cidade :new FormControl("",Validators.required),
            logradouro :new FormControl("",Validators.required),
            email :new FormControl("",Validators.required),
            telefone :new FormControl("",Validators.required),
    })
  }
  public resetForm():void{
    this.form.reset();
  }
public buscarPorCep(cep:string):void{

this.pessoaService.buscarPorCep(cep).subscribe(
  (response: any)=>{
    this.form = new FormGroup({

      nome :new FormControl(""),
      sobreNome :new FormControl(""),
      nacionalidade :new FormControl(""),
      cep :new FormControl(response.retorno.cep),
      estado :new FormControl(response.retorno.uf),
      cidade :new FormControl(response.retorno.localidade),
      logradouro :new FormControl(  response.retorno.logradouro),
      email :new FormControl(""),
      telefone :new FormControl("")
    })



  },
  ()=>{},
  ()=>{},
)
}
  public salvarPessoa(){
    if(this.form.valid){

      if(this.estadoSalvar ==="post")
      {
        this.pessoa = {...this.form.value}
        this.pessoaService.post(this.pessoa).subscribe(
          ()=>{this.toastr.success('Criado com sucesso');},

          (error:any)=>{
            console.log(error)
            this.toastr.success('Erro ao salvar')
          },
          ()=>{},
        )
      }
      else{
        this.pessoa = {id: this.pessoa.id,...this.form.value}
        this.pessoaService.put(this.pessoa.id,this.pessoa).subscribe(
          ()=>{this.toastr.success('Alterado com sucesso');},

          (error:any)=>{
            console.log(error)
            this.toastr.success('Erro ao salvar')
          },
          ()=>{},
        )
      }
      this.pessoaService.getPessoas();
      this.route.navigate(['/']);
     // this.location.reload();
    }

  }
}
