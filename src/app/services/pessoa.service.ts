import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa} from '../model/pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
baseUrl = 'https://localhost:44376/api/Pessoa';
constructor(private http: HttpClient) { }
public getPessoas(): Observable<Pessoa[]>{
  return this.http.get<Pessoa[]>(this.baseUrl)

  }
  public getPessoasByid(id: number): Observable<Pessoa>{
    return this.http.get<Pessoa>(this.baseUrl+"/"+id)
    }

    public post(pessoa: Pessoa): Observable<Pessoa>{
      return this.http.post<Pessoa>(this.baseUrl, pessoa)
      }

    public put(id: number, pessoa: Pessoa): Observable<Pessoa>{
      return this.http.put<Pessoa>(this.baseUrl+"/"+id, pessoa)
      }

    public delete(id: number): Observable<any>{
      return this.http.delete(this.baseUrl+"/"+id)
      }

      public buscarPorCep(cep: string): Observable<any>{
        return this.http.get(this.baseUrl+"/RetornaEndereco?cep="+cep)
        }
}
