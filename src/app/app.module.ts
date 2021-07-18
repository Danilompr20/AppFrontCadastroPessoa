import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PessoasComponent } from './pessoas/pessoas.component';
import { HttpClientModule } from '@angular/common/http';
import { PessoaService } from './services/pessoa.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr'
import { PessoaIndexComponent } from './pessoas/pessoa-index/pessoa-index.component';
import { PessoaDetalheComponent } from './pessoas/pessoa-detalhe/pessoa-detalhe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PessoasComponent,
    PessoaIndexComponent,
    PessoaDetalheComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar:true,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
