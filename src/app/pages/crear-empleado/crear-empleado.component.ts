import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css']
})
export class CrearEmpleadoComponent implements OnInit {

  //propiedades
  empleadoForm: FormGroup;
  enviado = false;
  empleadoDepartamento: any = [
   'Administracion', 'Finanzas', 'Recursos Humanos', 'TI', 'Ventas' 
  ];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private empleadoService: EmpleadoService
  ) { 
    this.mainForm();
  }

  ngOnInit(): void {
  }

  mainForm(){
    this.empleadoForm = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      departamento: ['',[Validators.required]],
      email: ['',
      [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'),
      ],
    ],
    telefono: ['',
      [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ],
    ]
  });
  
}

//METODO PARA SELECCIONAR DEPARTAMENTO CON UN SELECT
actualizarDepartamento(d){
  this.empleadoForm.get('departamento').setValue(d,{
    onlySelf: true,
  });
}

//getter para acceder a controles del formulario
get myForm(){
  return this.empleadoForm.controls;
}

//metodo que se ejecuta cuando el usuario envie un formulario
onSubmit(){
  this.enviado = true;
  if(!this.empleadoForm.valid) {
    return false;
  } else {
    return this.empleadoService.agregarEmpleado(this.empleadoForm.value)
    .subscribe({
      complete: () => {
        console.log('Empleado agregado correctamente'),
        this.ngZone.run(() => this.router.navigateByUrl('/listar-empleados'));
      },
      error: (e) => {
        console.log(e);
          },
        });
    }
  }
}