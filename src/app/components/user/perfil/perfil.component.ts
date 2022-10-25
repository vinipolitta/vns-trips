import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationsAlertsService } from './../../../core/services/notifications-alerts.service';
import { Router } from '@angular/router';
import { AccountService } from './../../../core/services/account.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControlOptions,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ValidatorField } from '@app/shared/helpers/validator-field';
import { UserUpdate } from '@app/shared/interfaces/user-update';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  public form: FormGroup;
  public userUpdate = {} as UserUpdate;
  public inputFunction = [
    { name: 'developer' },
    { name: 'analyst' },
    { name: 'devOps' },
  ];

  constructor(
    private fb: FormBuilder,
    public accountService: AccountService,
    private router: Router,
    private notificationsAlertsService: NotificationsAlertsService,
    private spinner: NgxSpinnerService
  ) {}

  get f(): any {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.validation();
    this.carregarUser();
  }

  private carregarUser(): void {
    this.spinner.show();
    this.accountService
      .getUser()
      .subscribe(
        (user) => {
          console.log(user);
          this.userUpdate = user;
          this.form.patchValue(this.userUpdate);
        },
        (error) => {
          this.notificationsAlertsService.showNotification(
            'danger',
            'bottom',
            'right',
            'Erro ao carregar perfil de usuario.',
            'Error!!'
          );
          console.error(error);
          this.router.navigate(['/home']);
        }
      )
      .add(() => this.spinner.hide());
  }

  public validation(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confirmPass'),
    };

    this.form = this.fb.group(
      {
        permissionRole: [''],
        userName: [''],
        phoneNumber: [''],
        email: ['', [Validators.required, Validators.email]],
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
        address: [''],
        city: [''],
        country: [''],
        funcao: [''],
        titulo: [''],
        postalCode: [''],
        descricao: [''],
        password: ['', [Validators.minLength(4), Validators.maxLength(50)]],
        confirmPass: ['', [Validators.minLength(4), Validators.maxLength(50)]],
      },
      formOptions
    );
  }

  public onSubmit(): void {
    console.log(this.form.value);
    this.atualizarUsuario();
  }
  public atualizarUsuario() {
    this.userUpdate = { ...this.form.value };
    this.spinner.show();
    this.accountService
      .updateUser(this.userUpdate)
      .subscribe(
        () =>
          this.notificationsAlertsService.showNotification(
            'success',
            'bottom',
            'right',
            'Perfil atualizado com sucesso',
            'Success!!'
          ),
        (error: any) => {
          this.notificationsAlertsService.showNotification(
            'danger',
            'bottom',
            'right',
            'Erro ao atualizar perfil do usuario',
            'Error!!'
          );
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }
}
