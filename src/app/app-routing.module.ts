import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaDetalheComponent } from './pessoas/pessoa-detalhe/pessoa-detalhe.component';
import { PessoasComponent } from './pessoas/pessoas.component';
const routes: Routes = [


      {path:"detalhe/:id", component:PessoaDetalheComponent},
      {path:"detalhe", component:PessoaDetalheComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
