import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit{
  constructor(private dataService:DataServiceService, private backendService:BackendService){

  }

  ngOnInit() {

  }

  async getVentas(){

  }
}
