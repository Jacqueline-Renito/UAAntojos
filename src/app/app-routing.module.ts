import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './carrito/carrito.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { LoginComponent } from './login/login.component';
import { MenuCompradorComponent } from './menu-comprador/menu-comprador.component';
import { RegistroClienteComponent } from './registro-cliente/registro-cliente.component';
import { RegistroVendedorComponent } from './registro-vendedor/registro-vendedor.component';
import { SeleccionUsuarioComponent } from './seleccion-usuario/seleccion-usuario.component';
import { MenuVendedorComponent } from './menu-vendedor/menu-vendedor.component';
import { MapaComponent } from './mapa/mapa.component';

const routes: Routes = [
  { path: 'carrito', component: CarritoComponent },
  { path: 'producto', component: DetalleProductoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: MenuCompradorComponent },
  { path: 'registro_cliente', component: RegistroClienteComponent },
  { path: 'registro_vendedor', component: RegistroVendedorComponent },
  { path: 'seleccion_usuario', component: SeleccionUsuarioComponent },
  { path: 'menu_comprador', component: MenuCompradorComponent },
  { path: 'menu_vendedor', component: MenuVendedorComponent },
  { path: 'mapa', component: MapaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
