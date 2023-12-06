import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  public URL:string = "http://localhost:3000" //Cambiar según sea necesario
  constructor(private httpClient:HttpClient) {}
  async consulta(url:string){
    let ruta:string = this.URL + "/consulta" + url;
    return this.httpClient.get(url)
  }
  async actualizacion(url:string, body:any){
    let ruta:string = this.URL + "/cambio" + url;
    return this.httpClient.put(url, body);
  }
  async alta(url:string, body:any){
    let ruta:string = this.URL + "/alta" + url;
    return this.httpClient.post(url, body);
  }
  async eliminar(url:string, body:any){
    let ruta:string = this.URL + "/baja" + url;
    return this.httpClient.delete(url, body);
  }
}
