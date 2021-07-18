import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService  } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import { Pessoa} from '../model/pessoa';
import { PessoaService } from '../services/pessoa.service';


@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css'],

})
export class PessoasComponent implements OnInit {
  modalRef!: BsModalRef;
  public pessoaId =0;
  public  pessoas:Pessoa[]=[];
  constructor(private pessoaService: PessoaService,
    private modalService: BsModalService,
    private toastr: ToastrService,private router: Router) {}


  ngOnInit(): void {
    console.log("entrei")
     this.getPessoa();
  }
  getPessoa(){
    this.pessoaService.getPessoas().subscribe((response:Pessoa[])=>
      {
        this.pessoas = response;
      },
      (      error: any)=> {
        console.log(error)
      });
}

  openModal(template: TemplateRef<any>,  pessoa:number) {
    this.pessoaId = pessoa;
    this.modalRef = this.modalService.show(template)
  }
  confirm():void{
   this.pessoaService.delete(this.pessoaId).subscribe(
        (response: any)=>{
          if(response.mensagem =="Pessoa Deletada com Sucesso")
          {
            this.toastr.success('Excluido com sucesso');
            this.getPessoa();
          }
        },
        (error:any)=>{
          this.toastr.success('Erro ao deletar');
        },
        ()=>{},

   )
    this.modalRef.hide();
    this.toastr.success('Excluido com sucesso');
  }
  decline():void{
    this.modalRef.hide();
  }

  editar(id:number):void{
    this.router.navigate([`detalhe/${id}`])
  }
}
