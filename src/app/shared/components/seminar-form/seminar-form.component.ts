import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ValidatorEmail } from '../../custom-validators';
import { Configuration } from '../../interfaces';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-seminar-form',
  templateUrl: './seminar-form.component.html',
  styleUrls: ['./seminar-form.component.scss'],
})
export class SeminarFormComponent implements OnInit {
  formGroup: FormGroup;
  conf: Configuration;
  subs: Subscription;
  emailSent: boolean;
  readonly apiUrl: string;

  constructor(
    public utils: UtilsService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) {
    this.apiUrl = 'https://1r2ee49qlj.execute-api.eu-central-1.amazonaws.com/dev/sendemail';
    this.subs = new Subscription();
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, ValidatorEmail]],
      name: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.subs.add(
      this.utils.getState().subscribe(state => {
        if (state.configuration) this.conf = state.configuration;
      })
    )
  }

  async sendEmail() {
    const loading = await this.utils.presentLoading()
    this.formGroup.markAsTouched();
    if (this.formGroup.valid) {
      const body = {
        name: this.formGroup.value.name,
        email: this.formGroup.value.email,
      }
      this.http.post(this.apiUrl, body).subscribe((res) => {
        loading.dismiss();
        this.utils.presentToast('Email enviado con exito');
      }, () => {
        loading.dismiss();
        this.utils.presentToast('¡Ups!. Algo no fue bien. Inténtalo más tarde.', 'danger')
      });
      this.emailSent = true;
    }
  }
}
