import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoteService } from './../../../core/services/lote.service';
import { Lote } from './../../../shared/interfaces/lote';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { EventoService } from './../../../core/services/evento.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Evento } from '@app/shared/interfaces/evento';
import { NotificationsAlertsService } from '@app/core/services/notifications-alerts.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss'],
})
export class EventoDetalheComponent implements OnInit {
  public modalRef: BsModalRef;
  public form: FormGroup;
  public evento = {} as Evento;
  public estadoSalvar = 'post';
  public eventoId: number;
  public loteAtual = { id: 0, nome: '', indice: 0 };
  public imagemURL = 'assets/img/2831104.jpg';
  public file: File;

  get modoEditar(): boolean {
    return this.estadoSalvar === 'put';
  }

  get lotes(): FormArray {
    return this.form.get('lotes') as FormArray;
  }

  get f(): any {
    return this.form.controls;
  }

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      containerClass: 'theme-default',
      isAnimated: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm ',
      showWeekNumbers: false,
      withTimepicker: true,
    };
  }

  get bsConfigLote(): any {
    return {
      adaptivePosition: true,
      containerClass: 'theme-default',
      isAnimated: true,
      dateInputFormat: 'DD/MM/YYYY',
      showWeekNumbers: false,
      withTimepicker: true,
    };
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private modalService: BsModalService,
    private actiatedRouter: ActivatedRoute,
    private eventoService: EventoService,
    private spinner: NgxSpinnerService,
    private loteService: LoteService,
    private notificationsAlertsService: NotificationsAlertsService,
    private router: Router
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
      imagemURL: [''],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      lotes: this.fb.array([]),
    });
  }

  public adicionarLote(): void {
    this.lotes.push(this.criarLote({ id: 0 } as Lote));
  }

  public criarLote(lote: Lote): FormGroup {
    return this.fb.group({
      id: [lote.id],
      nome: [lote.nome, Validators.required],
      quantidade: [lote.quantidade, Validators.required],
      preco: [lote.preco, Validators.required],
      dateInicio: [lote.dateInicio],
      dataFim: [lote.dataFim],
    });
  }

  public resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl | AbstractControl) {
    return {
      'is-invalid': campoForm?.errors && campoForm?.touched,
    };
  }

  public carregarEvento(): void {
    this.eventoId = +this.actiatedRouter.snapshot.paramMap.get('id');

    if (this.eventoId !== null && this.eventoId !== 0) {
      this.spinner.show();

      this.estadoSalvar = 'put';

      this.eventoService
        .getEventoById(this.eventoId)
        .subscribe(
          (evento: Evento) => {
            this.evento = { ...evento };
            this.form.patchValue(this.evento);
            if (this.evento.imagemURL !== null || undefined) {
              this.imagemURL = environment.apiURL + 'resources/images/' + this.evento.imagemURL;
            }
            this.evento.lotes.forEach((lote) =>
              this.lotes.push(this.criarLote(lote))
            );
          },
          (error: any) => {
            this.notificationsAlertsService.showNotification(
              'danger',
              'bottom',
              'right',
              'Erro ao tentar carregar Evento',
              'Error!!'
            );
            console.error(error);
          }
        )
        .add(() => this.spinner.hide());
    }
  }


  public mostrarImagem(imagemURL: string): string {

    return imagemURL !== '' || undefined
      ? `${environment.apiURL}resources/images/${imagemURL}`
      : 'assets/img/not-found-image.jpg';
  }


  public salvarEvento(): void {
    this.spinner.show();
    if (this.form.valid) {
      this.evento =
        this.estadoSalvar === 'post'
          ? { ...this.form.value }
          : { id: this.evento.id, ...this.form.value };
    }
    this.eventoService[this.estadoSalvar](this.evento)
      .subscribe(
        (eventoRetorno: Evento) => {
          this.notificationsAlertsService.showNotification(
            'success',
            'bottom',
            'right',
            'Evento atualizado com sucesso',
            'Success!!'
          );
          this.router.navigate([`eventos/lista`]);
        },
        (error) => {
          console.error(error);
          this.notificationsAlertsService.showNotification(
            'danger',
            'bottom',
            'right',
            'Erro ao Atualizar carregar Evento',
            'Error!!'
          );
        }
      )
      .add(() => this.spinner.hide());
  }

  public salvarLotes(): void {
    if (this.form.controls['lotes'].valid) {
      this.spinner.show();
      this.loteService
        .saveLote(this.eventoId, this.form.value.lotes)
        .subscribe(
          () => {
            this.notificationsAlertsService.showNotification(
              'success',
              'bottom',
              'right',
              'Lotes salvo com sucesso',
              'Success!!'
            );
          },
          (error: any) => {
            this.notificationsAlertsService.showNotification(
              'danger',
              'bottom',
              'right',
              'Erro ao tentar salvar lote',
              'Error!!'
            );
            console.error(error);
          }
        )
        .add(() => this.spinner.hide());
    }
  }

  public removerLote(template: TemplateRef<any>, indice: number): void {
    this.loteAtual.id = this.lotes.get(indice + '.id').value;
    this.loteAtual.nome = this.lotes.get(indice + '.nome').value;
    this.loteAtual.id = indice;

    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    // this.lotes.removeAt(indice);
  }

  public confirmLoteDelete(): void {
    this.modalService.hide();
    this.spinner.show();
    this.loteService
      .deleteLote(this.eventoId, this.loteAtual.id)
      .subscribe(
        () => {
          this.notificationsAlertsService.showNotification(
            'success',
            'bottom',
            'right',
            'Lotes deletado com sucesso',
            'Success!!'
          );
          this.lotes.removeAt(this.loteAtual.indice);
        },
        (error: any) => {
          this.notificationsAlertsService.showNotification(
            'danger',
            'bottom',
            'right',
            `Erro ao tentar deletar lote: ${this.loteAtual.id}}`,
            'Error!!'
          );
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }

  public declineLoteDelete(): void {
    this.modalService.hide();
  }

  public verifyNameLote(campo: string): string {
    return campo === null || campo === '' ? 'Nome do Lote' : campo;
  }

  public onFileChange(ev: any): void {
    const reader = new FileReader();

    reader.onload = (event: any) => {
      this.imagemURL = event.target.result;
    };

    this.file = ev.target.files;
    reader.readAsDataURL(this.file[0]);
    this.uploadImage();
  }

  public uploadImage(): void {
    this.spinner.show();
    this.eventoService
      .postUpload(this.eventoId, this.file)
      .subscribe(
        () => {
          this.carregarEvento();
          this.notificationsAlertsService.showNotification(
            'success',
            'bottom',
            'right',
            'imagem atualizada com sucesso',
            'Success!!'
          );
        },
        (error: any) => {

          this.notificationsAlertsService.showNotification(
            'danger',
            'bottom',
            'right',
            `Erro ao fazer upload de imagem`,
            'Error!!'
          );
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }
}
