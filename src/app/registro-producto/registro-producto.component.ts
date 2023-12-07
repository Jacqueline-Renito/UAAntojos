import { Component, OnInit } from '@angular/core';
import { UnplashService } from '../services/unplash.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataServiceService } from '../services/data-service.service';
import { BackendService } from '../services/backend.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-producto',
  templateUrl: './registro-producto.component.html',
  styleUrls: ['./registro-producto.component.css']
})
export class RegistroProductoComponent implements OnInit{
  listProd:productos[]=[]
  formGroup = new FormGroup({
    'nombre': new FormControl('',[Validators.required]),
    'cantidad': new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    'precio': new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    'descripcion': new FormControl('',[Validators.required]),
  })
  imagenRecibida!:string;
 constructor( private router:Router, private unplash:UnplashService, private dataService: DataServiceService, private backService:BackendService){}

  async ngOnInit(): Promise<void> {
    await this.getProductos();
  }

 async getPhoto(){
  let url:string = this.formGroup.controls.nombre.value!;
  let data = await this.unplash.getPhoto(url);
  data.forEach((imagen:any) => {
    console.log(imagen)
    this.imagenRecibida = imagen.results[0].urls.small
    this.regProd()
    //Llamar a cualquier otra funcion para hacer el alta
  })
 }

 regProd(){
  let usuario = this.dataService.getData('usuario')
  let body = {
    nombre: this.formGroup.controls.nombre.value,
    cantidad: this.formGroup.controls.cantidad.value,
    descripcion: this.formGroup.controls.descripcion.value,
    precio: this.formGroup.controls.precio.value,
    urlImagen: this.imagenRecibida,
    idVendedor: usuario.id
  }
  this.backService.alta('/producto',body).then((data:any)=>{

    if(data.success){
      Swal.fire('Registrar','Se ha registrado correctamente el producto','success').then(()=>{
        this.router.navigateByUrl('/menu_vendedor');
      })
    }
    else{
      Swal.fire('Registrar',data.message,'error');
    }
  });
 }
 async getProductos(){
    (await this.backService.consulta('/productos')).forEach((productos)=>{
      this.listProd = <productos[]>productos;
    })
 }

}

interface productos {
  id: number,
  nombre: string,
  cantidad: number,
  precio: number,
  descripcion: string,
  idVendedor: number,
  baja: boolean,
  vendedor: string
}
