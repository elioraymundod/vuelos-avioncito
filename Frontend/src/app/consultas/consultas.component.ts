import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { VuelosService } from '../Services/vuelos.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {

  filtrosFormGroup: FormGroup;
  dataSource = new MatTableDataSource();
  displayedColumns = ['codigoVuelo', 'noPasaporte', 'aeorpuertoSalida', 'aeropuertoIngreso', 'horaSalida', 'horaIngreso']
  dataSourceExcel = new MatTableDataSource();
  btnExcel: boolean = false;

  constructor(private _formBuilder: FormBuilder,
             private vuelosService: VuelosService,
             private spinner: NgxSpinnerService) {
    this.filtrosFormGroup = this._formBuilder.group({
      codigoVueloFormControl: ['', [Validators.required]]
    });

   }

  ngOnInit() {
    this.btnExcel = false;
  }

  async realizarBusqueda(datos: any){
   try{
    await this.vuelosService.getVuelosByCodigo(datos.codigoVueloFormControl).subscribe(res => {
      console.log('el res es ', res)
      if(res.length !== 0) {
        for(let i = 0; i< res.length; i++) {
          res[i].fechaHoraSalida = String(moment(res[i].fechaHoraSalida.replace('+0000', '')).format('DD-MM-YYYY HH:MM:SS'))
          res[i].fechaHoraIngreso = String(moment(res[i].fechaHoraIngreso.replace('+0000', '')).format('DD-MM-YYYY HH:MM:SS'))
        }
        this.dataSource.data = res;
        this.dataSourceExcel.data = res;
        this.btnExcel = true;
        console.log(res)
        this.spinner.hide();
        return;
      } else if (res.length == 0){
        this.btnExcel = false;
        this.dataSource.data = [];
        this.filtrosFormGroup.reset();
        Swal.fire({
          icon: 'error',
          title: 'Codigo de vuelo invalido'})
        this.spinner.hide();
        return;

      }
      
      return;
    })
   }catch(e) {
    console.log('error ', e)
   }
  }

  limpiar(){
    this.filtrosFormGroup.reset();
    this.dataSource.data = [];
    this.btnExcel = false;
  }

  exportarExcel(){
      this.vuelosService.exportToExcel(this.dataSourceExcel.data, 'resultado_consulta');
  }

}
