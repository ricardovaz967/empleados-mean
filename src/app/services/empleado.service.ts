import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  baseUri: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http:HttpClient) { }

  //METODO PARA AGREGAR UN NUEVO EMPLEADO
  agregarEmpleado(data):Observable<any> {
    let url = `${this.baseUri}/create` ; //checar comas
    return this.http.post(url,data).pipe(catchError(this.errorManager));
  }

  //METODO PARA OBTENER TODOS LOS EMPLEADOS
  getEmpleados() {
    let url = `${this.baseUri}/empleados` ;
    return this.http.get(url);
  }
  
  //metodo para obtener un solo empleado por su id
  getEmpleado(id):Observable<any>{
    let url = `${this.baseUri}/empleado/${id}`;
    return this.http.get(url, {headers: this.headers})
    .pipe(map((res:Response) => {
      return res || {};
    }),
    catchError(this.errorManager)
    );
  }

  //metodo para actualizar un empleado
  updateEmpleado(id, data):Observable<any>{
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url,data, {headers: this.headers})
      .pipe(catchError(this.errorManager));
  }

  //metodo para eliminar un empleado
  deleteEmpleado(id):Observable<any>{
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .pipe(catchError(this.errorManager));
  }
  
  //manejador de errores
  errorManager(error: HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código de error: ${error.status}\n Mensaje: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}