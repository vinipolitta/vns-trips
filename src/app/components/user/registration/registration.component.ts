import { Router } from '@angular/router';
import { AccountService } from './../../../core/services/account.service';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ValidatorField } from '@app/shared/helpers/validator-field';
import { User } from '@app/shared/interfaces/user';
import { NotificationsAlertsService } from '@app/core/services/notifications-alerts.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public form: FormGroup;
  public user = {} as User;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private notificationsAlertsService: NotificationsAlertsService
  ) {}

  get f(): any {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.validation();
  }

  public validation(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confirmPass'),
    };
    this.form = this.fb.group(
      {
        primeiroNome: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(50),
          ],
        ],
        ultimoNome: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(50),
          ],
        ],
        userName: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(30),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(50),
          ],
        ],
        confirmPass: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(50),
          ],
        ],
        confirmTerms: [''],
      },
      formOptions
    );
  }

  public register(): void {
    this.user = { ...this.form.value };
    this.accountService.register(this.user).subscribe(
      () => this.router.navigateByUrl('/home'),
      (error: any) => {
        this.notificationsAlertsService.showNotification(
          'danger',
          'bottom',
          'right',
          'Erro ao criar usuario',
          'Error!!'
        );
        console.error(error)
      }
    );
  }
}
