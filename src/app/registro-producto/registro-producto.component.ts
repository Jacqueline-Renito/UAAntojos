import { Component, OnInit } from '@angular/core';
import { UnplashService } from '../services/unplash.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataServiceService } from '../services/data-service.service';
import { BackendService } from '../services/backend.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DropdownChangeEvent } from 'primeng/dropdown';
@Component({
  selector: 'app-registro-producto',
  templateUrl: './registro-producto.component.html',
  styleUrls: ['./registro-producto.component.css']
})
export class RegistroProductoComponent implements OnInit{
  listProd:productos[]=[]
  btnReg!: HTMLButtonElement;
  optionProd!:productos|null;
  formGroup = new FormGroup({
    'productos': new FormControl<productos | null>(null, Validators.required),
    'nombre': new FormControl('',[Validators.required]),
    'cantidad': new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    'precio': new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    'descripcion': new FormControl('',[Validators.required]),
  })
  imagenRecibida!:string;
 constructor( private router:Router, private unplash:UnplashService, private dataService: DataServiceService, private backService:BackendService){}

  async ngOnInit(): Promise<void> {
    await this.getProductos();
    this.btnReg = <HTMLButtonElement>document.getElementById("btnReg")!;
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
 changeListenerProd(evento:DropdownChangeEvent) {
  if (evento.value != null && evento.value.id != "0") {
    let body = {
      id: evento.value.nombre
    }
    this.backService.alta("/consulta/consProd", body)
      .then((datosProd:any) => {
        if(datosProd!=undefined){
          this.optionProd = <productos>datosProd
          this.loadProducto(this.optionProd)
        }
      });
  } else {
    this.limpiarFormulario()
    this.optionProd = null;
  }
}
 regProd(){
  let usuario = this.dataService.getData('usuario')
  let body = {
    productos: this.formGroup.controls.productos.value,
    cantidad: this.formGroup.controls.cantidad.value,
    descripcion: this.formGroup.controls.descripcion.value,
    precio: this.formGroup.controls.precio.value,
    urlImagen: this.imagenRecibida,
    idVendedor: usuario.id
  }
  if(this.optionProd == null){
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
  else{
    this.backService.actualizacion('producto', body).then((res:any)=>{
      let respuesta = res;
      if(respuesta.success){
        Swal.fire(
          'Actualizar',
          'Se ha actualizado correctamente el producto',
          'success'
        );
        this.limpiarFormulario();
        this.getProductos();
      } else {
        Swal.fire(
          'Actualizar',
          'Ha ocurrido un error al actualizar el producto, faltan datos',
          'error'
        );
      }
    })
  }
 }
 async getProductos(){
    (await this.backService.consulta('/productos')).forEach((productos)=>{
      this.listProd = <productos[]>productos;
      this.listProd.splice(0, 0, <productos>{
        id: 0,
        cantidad: 0,
        descripcion: '',
        nombre: 'Nuevo Producto',
        precio: 0,
      })
    })
 }
 loadProducto(dataProd: productos){
  this.formGroup.controls.nombre.setValue(dataProd.nombre)
  this.formGroup.controls.descripcion.setValue(dataProd.descripcion)
  this.formGroup.controls.precio.setValue(dataProd.precio.toString())
  this.formGroup.controls.cantidad.setValue(dataProd.cantidad.toString())
  this.btnReg.innerHTML = '<i class="fa-solid fa-pencil"></i> Actualizar <i class="fa-solid fa-pencil"></i>';
}
limpiarFormulario() {
  this.btnReg.innerHTML = '<i class="fa-solid fa-book"></i> Registrar <i class="fa-solid fa-book"></i>';
  if(this.formGroup.get('productos')?.value?.id == 0){
    this.formGroup.reset({
      productos: this.formGroup.get('productos')?.value
    })
  }else{
    this.formGroup.reset()
  }

  this.btnReg.disabled = true;
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
