import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './carrito/carrito.component';
import { LoginComponent } from './login/login.component';
import { RegistroClienteComponent } from './registro-cliente/registro-cliente.component';
import { RegistroVendedorComponent } from './registro-vendedor/registro-vendedor.component';
import { MenuCompradorComponent } from './menu-comprador/menu-comprador.component';
import { SeleccionUsuarioComponent } from './seleccion-usuario/seleccion-usuario.component';
import { RegistroProductoComponent } from './registro-producto/registro-producto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BackendService } from './services/backend.service';
import { MapaComponent } from './mapa/mapa.component';
import { VendedorComponent } from './vendedor/vendedor.component';
import { MenuVendedorComponent } from './menu-vendedor/menu-vendedor.component';
import { ProductosComponent } from './productos/productos.component';
import { VendedoresComponent } from './vendedores/vendedores.component';
import { VentasComponent } from './ventas/ventas.component';
import { ComprasComponent } from './compras/compras.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { PrincipalComponent } from './principal/principal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarritoComponent,
    LoginComponent,
    RegistroClienteComponent,
    RegistroVendedorComponent,
    VendedorComponent,
    MenuCompradorComponent,
    SeleccionUsuarioComponent,
    RegistroProductoComponent,
    MapaComponent,
    MenuVendedorComponent,
    ProductosComponent,
    VendedoresComponent,
    VentasComponent,
    ComprasComponent,
    EditarClienteComponent,
    EditarProductoComponent,
    PrincipalComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule

  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
