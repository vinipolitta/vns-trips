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
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  public form: FormGroup;
  public usuario = {} as UserUpdate;
  public imagemURL;
  file: File;

  get f(): any {
    return '';
  }

  constructor(
    private spinner: NgxSpinnerService,
    private notificationsAlertsService: NotificationsAlertsService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {}

  public setFormValue(usuario: UserUpdate): void {
    this.usuario = usuario;
    this.usuario.imagemURL != null
      ? (this.imagemURL =
          environment.apiURL + `resources/perfil/${this.usuario.imagemURL}`)
      : (this.imagemURL = './assets/img/not-found-image.jpg');
  }

  public get ehPalestrante(): boolean {
    return this.usuario.funcao === 'palestrante';
  }

  public onFileChange(ev: any): void {
    const reader = new FileReader();

    reader.onload = (event: any) => {
      this.imagemURL = event.target.result;
    };

    this.file = ev.target.files;
    console.log(this.file);

    reader.readAsDataURL(this.file[0]);
    this.uploadImagem();
  }

  public mostrarImagem(imagemURL: string): string {
    console.log(imagemURL);

    return imagemURL !== '' || undefined
      ? `${environment.apiURL}resources/images/${imagemURL}`
      : 'assets/img/not-found-image.jpg';
  }

  private uploadImagem(): void {
    this.spinner.show();
    this.accountService
      .postUpload(this.file)
      .subscribe(
        () =>
          this.notificationsAlertsService.showNotification(
            'success',
            'bottom',
            'right',
            'Evento atualizado com sucesso',
            'Success!!'
          ),
        (error: any) => {
          this.notificationsAlertsService.showNotification(
            'danger',
            'bottom',
            'right',
            'Erro ao Atualizar imagem',
            'Error!!'
          );
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }
}
