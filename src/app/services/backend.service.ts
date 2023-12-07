import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private URL:string = "http://localhost:3000" //Cambiar según sea necesario
  constructor(private httpClient:HttpClient) {}
  async consulta(url:string){
    let ruta:string = this.URL + "/consulta" + url;
    return this.httpClient.get(ruta)
  }
  async actualizacion(url:string, body:any){
    let ruta:string = this.URL + "/cambio" + url;
    return this.httpClient.put(ruta, body).toPromise();
  }
  async alta(url:string, body:any){
    let ruta:string = this.URL + "/alta" + url;
    return this.httpClient.post(ruta, body).toPromise();
  }
  async eliminar(url:string, body:any){
    let ruta:string = this.URL + "/baja" + url;
    return this.httpClient.delete(ruta, body).toPromise();
  }
}

export interface vendedor{
  id:number,
  nombreComercial: string,
  corre: string,
  nombre: string,
  ubicacion: {
    longitud:number,
    latitud:number
  },
  activo: Boolean
}

export interface producto{
  id:number,
  nombre: string,
  cantidad: number,
  precio: number,
  descripcion: string,
  idVendedor:number,
  baja:Boolean,
  vendedor:string,
  imagen:string
}
