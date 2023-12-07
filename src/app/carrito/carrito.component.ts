import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BackendService } from '../services/backend.service';
import { DataServiceService } from '../services/data-service.service';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  productos:prod[]=[];
  detProd:producto[]=[];
  constructor(private dataService:DataServiceService, private backService:BackendService){}

  eliminarProd(prodId:Number){
  Swal.fire('Eliminar','Se ha eliminado este producto exitosamente','error').then(()=>{
    this.productos = this.productos.filter((prod)=>prod.id !== prodId);
    this.dataService.saveData(this.productos,'carrito');
  })
  }
  async ngOnInit(): Promise<void> {
      await this.cargarCarrito();
  }
  async cargarCarrito(){
    const data = this.dataService.getData('carrito');
    if (data && Array.isArray(data)) {
      this.productos = data;
    }
    console.log(this.productos)
    this.cargarProductos();
  }

  async cargarProductos(){
    this.detProd = []
    this.productos.forEach(async (prod)=>{
      let consulta = await this.backService.consulta('/producto/'+prod.id);
      consulta.forEach((data:any) => {
        let detprod = <producto>data.producto;
        detprod.cantidadAgregada = prod.cantidad;
        this.detProd.push(detprod);
      })
    })
    console.log(this.detProd)
  }

}


interface prod {
  id:number,
  cantidad:number
}

interface producto {
  id: number,
  nombre: string,
  cantidad: number,
  precio: number,
  descripcion: string,
  idVendedor: number,
  baja: boolean,
  vendedor: string,
  cantidadAgregada: number
}
