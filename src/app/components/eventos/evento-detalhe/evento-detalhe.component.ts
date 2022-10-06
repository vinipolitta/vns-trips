import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { EventoService } from './../../../core/services/evento.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Evento } from '@app/shared/interfaces/evento';
import { NotificationsAlertsService } from '@app/core/services/notifications-alerts.service';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss'],
})
export class EventoDetalheComponent implements OnInit {
  public form: FormGroup;
  public evento = {} as Evento;
  public estadoSalvar = 'post';

  get f(): any {
    return this.form.controls;
  }

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      containerClass: 'theme-default',
      isAnimated: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      showWeekNumbers: false,
      withTimepicker: true,
    };
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private router: ActivatedRoute,
    private eventoService: EventoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private notificationsAlertsService: NotificationsAlertsService
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.carregarEvento();
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      tema: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      local: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      dataEvento: [null],
      qtdPessoas: ['', Validators.required],
      imagemURL: [null],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl): any {
    return {
      'is-invalid': campoForm?.errors && campoForm?.touched,
    };
  }

  public carregarEvento(): void {
    const eventoIdParam = this.router.snapshot.paramMap.get('id');

    if (eventoIdParam !== null) {
      this.spinner.show();

      this.estadoSalvar = 'put';

      this.eventoService.getEventoById(+eventoIdParam).subscribe(
        (evento: Evento) => {
          this.evento = { ...evento };
          this.form.patchValue(this.evento);
        },
        (error: any) => {
          this.spinner.hide();
          this.notificationsAlertsService.showNotification(
            'danger',
            'bottom',
            'right',
            'Erro ao tentar carregar Evento',
            'Error!!'
          );
          console.log(error);
        },
        () => this.spinner.hide()
      );
    }
  }

  public salvarAlteracao(): void {
    this.spinner.show();
    if (this.form.valid) {
      this.evento =
        this.estadoSalvar === 'post'
          ? { ...this.form.value }
          : { id: this.evento.id, ...this.form.value };
    }
    this.eventoService[this.estadoSalvar](this.evento).subscribe(
      () => {
        this.spinner.hide();
        this.notificationsAlertsService.showNotification(
          'success',
          'bottom',
          'right',
          'Evento atualizado com sucesso',
          'Success!!'
        );
      },
      (error) => {
        console.error(error);
        this.spinner.hide();
        this.notificationsAlertsService.showNotification(
          'danger',
          'bottom',
          'right',
          'Erro ao Atualizar carregar Evento',
          'Error!!'
        );
      },
      () => this.spinner.hide()
    );
  }

  // this.eventoService.postEvento()
}
