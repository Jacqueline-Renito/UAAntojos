import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './carrito/carrito.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { LoginComponent } from './login/login.component';
import { RegistroClienteComponent } from './registro-cliente/registro-cliente.component';
import { RegistroVendedorComponent } from './registro-vendedor/registro-vendedor.component';
import { MenuCompradorComponent } from './menu-comprador/menu-comprador.component';
import { SeleccionUsuarioComponent } from './seleccion-usuario/seleccion-usuario.component';

const appRoutes:Routes=[
  {path:'', component:LoginComponent},
  {path:'carrito', component:CarritoComponent},
  {path:'detalleproducto', component:DetalleProductoComponent},
  {path:'menucomprador', component:MenuCompradorComponent},
  {path:'registrarcliente', component:RegistroClienteComponent},
  {path:'registrarvendedor', component:RegistroVendedorComponent},
  {path:'seleccionusuario', component:SeleccionUsuarioComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarritoComponent,
    DetalleProductoComponent,
    LoginComponent,
    RegistroClienteComponent,
    RegistroVendedorComponent,
    MenuCompradorComponent,
    SeleccionUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }