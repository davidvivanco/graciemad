import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Configuration, State } from 'src/app/shared/interfaces';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  state: Partial<State>;
  conf: Configuration;
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private utils: UtilsService
  ) {
    this.utils.getState().subscribe(state => {
      this.state = state;
      console.log("STATE", this.state)
      this.conf = state.configuration;
      if (this.conf) {
        this.setForm();
        this.setValueChanges();
      }
    })
  }

  ngOnInit() {
  }

  setForm() {
    const date = this.conf?.seminar?.date;
    this.formGroup = this.formBuilder.group({
      seminar: [this.conf?.seminar?.active, []],
      seminarDate: [date ? date.toDate().toISOString() : null, []],
      jiujitsuToogle: [this.conf?.pricing[0]?.active, []],
      grapplingToogle: [this.conf?.pricing[1]?.active, []],
      mmaToogle: [this.conf?.pricing[2]?.active, []],
      premiumToogle: [this.conf?.pricing[3]?.active, []],
      privateToogle: [this.conf?.pricing[4]?.active, []],
      jiujitsu: [
        this.conf?.pricing[0]?.price,
        this.conf?.pricing[0]?.active ? [Validators.required] : []
      ],
      grappling: [
        this.conf?.pricing[1]?.price,
        this.conf?.pricing[1]?.active ? [Validators.required] : []
      ],
      mma: [
        this.conf?.pricing[2]?.price,
        this.conf?.pricing[2]?.active ? [Validators.required] : []
      ],
      premium: [
        this.conf?.pricing[3]?.price,
        this.conf?.pricing[3]?.active ? [Validators.required] : []
      ],
      private: [
        this.conf?.pricing[4]?.price,
        this.conf?.pricing[4]?.active ? [Validators.required] : []
      ],

    })
  }

  setValueChanges() {
    this.formGroup.controls['jiujitsuToogle'].valueChanges.subscribe(v => {
      const control = this.formGroup.controls['jiujitsu'];
      setTimeout(() => {
        if (v) {
          control.setValidators([Validators.required])
          if (!control.value) control.setErrors(Validators.required)
        }
        else {
          control.setErrors(null)
          control.removeValidators(Validators.required)
        }
      });
    })
    this.formGroup.controls['grapplingToogle'].valueChanges.subscribe(v => {
      const control = this.formGroup.controls['grappling'];
      setTimeout(() => {
        if (v) {
          control.setValidators([Validators.required])
          if (!control.value) control.setErrors(Validators.required)
        }
        else {
          control.setErrors(null)
          control.removeValidators(Validators.required)
        }
      });
    })
    this.formGroup.controls['mmaToogle'].valueChanges.subscribe(v => {
      const control = this.formGroup.controls['mma'];
      setTimeout(() => {
        if (v) {
          control.setValidators([Validators.required])
          if (!control.value) control.setErrors(Validators.required)
        }
        else {
          control.setErrors(null)
          control.removeValidators(Validators.required)
        }
      });
    })
    this.formGroup.controls['premiumToogle'].valueChanges.subscribe(v => {
      const control = this.formGroup.controls['premium'];
      setTimeout(() => {
        if (v) {
          control.setValidators([Validators.required])
          if (!control.value) control.setErrors(Validators.required)
        }
        else {
          control.setErrors(null)
          control.removeValidators(Validators.required)
        }
      });
    })
    this.formGroup.controls['privateToogle'].valueChanges.subscribe(v => {
      const control = this.formGroup.controls['private'];
      setTimeout(() => {
        if (v) {
          control.setValidators([Validators.required])
          if (!control.value) control.setErrors(Validators.required)
        }
        else {
          control.setErrors(null)
          control.removeValidators(Validators.required)
        }
      });
    })
  }

  save() {
    const form = this.formGroup.value;
    this.conf.pricing[0].active = form.jiujitsuToogle;
    this.conf.pricing[1].active = form.grapplingToogle;
    this.conf.pricing[2].active = form.mmaToogle;
    this.conf.pricing[3].active = form.premiumToogle;
    this.conf.pricing[4].active = form.privateToogle;
    this.conf.pricing[0].price = Number(form.jiujitsu);
    this.conf.pricing[1].price = Number(form.grappling);
    this.conf.pricing[2].price = Number(form.mma);
    this.conf.pricing[3].price = Number(form.premium);
    this.conf.pricing[4].price = Number(form.private);
    this.conf.seminar.active = form.seminar;
    this.conf.seminar.date = form.seminarDate;
    console.log(this.conf)

  }
}
