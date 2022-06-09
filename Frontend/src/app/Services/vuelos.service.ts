import { HttpClient, HttpHandler, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

const EXCEL_TYPE =
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset = UTF-8';
const EXCEL_EXT = '.xlsx';

@Injectable({
    providedIn: 'root'
  })

  export class VuelosService implements HttpInterceptor {
    baseUrl: string;

    constructor(private http:HttpClient, private spinner: NgxSpinnerService) {
      this.baseUrl=environment.baseUrl;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler){
      this.spinner.show();
      return next.handle(req).pipe(
        catchError(error => {
          let errorMessage = '';
          if (error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Client-side error: ${error.error.message}`;
            Swal.fire({
              icon: 'error',
              title: 'Error del cliente'})
              this.spinner.hide();
          } else {
            // backend error
            errorMessage = `Server-side error: ${error.status} ${error.message}`;
            Swal.fire({
              icon: 'error',
              title: 'No se pudo establecer una conexion con la base de datos'})
          }
          this.spinner.hide();
          return throwError(errorMessage);
        })
      );
    }
  
    public getVuelosByCodigo(codigo_vuelo: any):Observable<any>{
      return this.http.get(`${this.baseUrl}/vuelos/${codigo_vuelo}`);
     }

     public exportToExcel(json:any[], excelFileName: string): void{
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
      const workbook: XLSX.WorkBook = { Sheets: {'data': worksheet},
      SheetNames:['data']
      };
      const excelBuffer: any= XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
      // llamar al metodo
      this.saveExcel(excelBuffer, excelFileName);
    }

    private saveExcel(buffer: any, fileName: string): void {
      const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
      FileSaver.saveAs(data, fileName + new Date().getTime() + EXCEL_EXT);
    }
  }