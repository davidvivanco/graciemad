import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  
  formGroup: FormGroup;
  year: string;

  constructor(
    public utils: UtilsService,
    private formBuilder: FormBuilder,

  ) { 
    this.year = new Date().getFullYear().toString();
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required]],
      message: [null, [Validators.required]],
    })
  }

  ngOnInit() { }

  send() {
    this.formGroup.markAsTouched();
    if (this.formGroup.valid) {
      console.log('Enviado')
    }
  }

}
