import { Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import Swal from 'sweetalert2';
import { BackendService, vendedor } from '../services/backend.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})

export class MapaComponent implements OnInit, OnDestroy{
  ubicacion!:GeolocationCoordinates;
  mapa!:any;
  vendedores:vendedor[] = [];
  updateMapa!:any;
  updateUsuario!:any;

  constructor(private backendService:BackendService, private router:Router){
    this.ngOnInit();
  }
  ngOnDestroy(): void {
    clearInterval(this.updateUsuario);
    clearInterval(this.updateMapa);
  }

  private icon = L.icon({
    iconUrl: 'assets/Leaflet/marker-icon.png',
  })

  async ngOnInit() {
    this.getVendedores();
    this.getUsuario();
    this.crearMapa();
    this.updateUsuario = setInterval(this.getUsuario, 10000 /**Cada 10 segudndos actualza */)
    this.updateMapa = setInterval(this.getVendedores, 10000 /**Cada 10 segudndos actualza */)
  }

  async getUsuario(){
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      this.ubicacion = position.coords;
      this.setUsuario()
    }, (error) => {
      Swal.fire('Ubicación', 'No se ha podido obtener la ubicación', 'error')
    }, {enableHighAccuracy: true, maximumAge: 0});
  }

  async getVendedores(){
    let consulta = await this.backendService.consulta('/vendedores');
    consulta.forEach((data:any) => {
      if(data.success){
        this.vendedores = <vendedor[]>data.vendedores;
        this.setVendedores();
      }else{
        Swal.fire('Vendedores', data.message, 'error')
      }
    });
  }

  crearMapa(){
    this.mapa = L.map('map');
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 15,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',

    }).addTo(this.mapa);
    this.mapa.setView([21.913357686792555, -102.31741885752632], 16);
  }

  setUsuario(){
    let usuarioMarker = L.marker([this.ubicacion.latitude, this.ubicacion.longitude],{
      icon: this.icon
    });
    usuarioMarker.addTo(this.mapa);
    usuarioMarker.bindPopup("<b>Tú</b>").openPopup();
    this.mapa.setView([21.913357686792555, -102.31741885752632], 16);
  }

  setVendedores(){
    let markers:L.Marker[] = []
    this.vendedores.forEach((vendedor) => {
      if(vendedor.activo && vendedor.ubicacion.latitud != 1000 && vendedor.ubicacion.longitud != 1000){
        let marker = L.marker([vendedor.ubicacion.latitud, vendedor.ubicacion.longitud], {
          icon: this.icon
        })
        let popUp = marker.bindPopup(vendedor.nombreComercial);
        marker.on('mouseover', (evento:L.LeafletMouseEvent) => {
          popUp.openPopup();
        });
        marker.on('click', (event:L.LeafletMouseEvent) => {
          this.router.navigateByUrl('/vendedor/'+vendedor.id);
        })
        marker.addTo(this.mapa);
      }
    })
  }

}


