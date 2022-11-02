import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '@app/core/services/account.service';
import { NotificationsAlertsService } from '@app/core/services/notifications-alerts.service';
import { ValidatorField } from '@app/shared/helpers/validator-field';
import { UserUpdate } from '@app/shared/interfaces/user-update';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-perfil-detalhe',
  templateUrl: './perfil-detalhe.component.html',
  styleUrls: ['./perfil-detalhe.component.scss'],
})
export class PerfilDetalheComponent implements OnInit {
  @Output() changeFormValue = new EventEmitter();

  public form: FormGroup;
  public userUpdate = {} as UserUpdate;
  public inputFunction = [
    { name: 'developer' },
    { name: 'analyst' },
    { name: 'devOps' },
  ];

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    public accountService: AccountService,
    private router: Router,
    private notificationsAlertsService: NotificationsAlertsService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.validation();
    this.carregarUser();
    this.verificaForm();
  }

  private verificaForm(): void {
    this.form.valueChanges.subscribe(
      () => {
        this.changeFormValue.emit({ ...this.form.value });
      },
      () => {}
    );
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
        imagemURL: [''],
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
