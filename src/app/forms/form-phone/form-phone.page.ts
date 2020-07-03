import { Component, OnInit } from '@angular/core';
//Validators
import { FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: 'app-form-phone',
  templateUrl: './form-phone.page.html',
  styleUrls: ['./form-phone.page.scss'],
})
export class FormPhonePage implements OnInit {

  constructor(
    //Validators
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
  }

  //Validators
  registrationForm = this.formBuilder.group({
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$")
      ]
    ],
    code: [
      '',
      [
        Validators.required,
        Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$")
      ]
    ]
  });

  public submit() {
    console.log(this.registrationForm.value);
    
  }
  get phone() {
    return this.registrationForm.get('phone');
  }
  get code() {
    return this.registrationForm.get('code');
  }


  public errorMessages = {
    phone: [
      { type: 'required', message: 'El número de telefono es obligatorio' },
      { type: 'pattern', message: 'Por favor, ingrese un número valido' }
    ],
    code: [
      { type: 'required', message: 'El código de país es obligatorio' },
      { type: 'pattern', message: 'Por favor, ingrese un código valido' }
    ]
  };
}
