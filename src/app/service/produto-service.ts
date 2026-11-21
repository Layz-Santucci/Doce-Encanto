import { Injectable } from "@angular/core";
import { Produto } from '../models/produto';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable ({
    providedIn: 'root',
})
export class ProdutoService {
    constructor(private http: HttpClient){}

    carregarVitrine(): Observable<any> {
        return this.http.get("http://localhost:8081/api/produto/vitrine");
    }

    fazerBusca(termo: string): Observable<any> {
        return this.http.get("http://localhost:8081/api/produto/busca/"+ termo);
    }

    gravar(obj: Produto): Observable<any> {
        return this.http.post("http://localhost:8081/api/produto", obj);
    }
}
