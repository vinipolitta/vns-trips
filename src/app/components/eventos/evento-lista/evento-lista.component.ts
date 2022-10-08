import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EventoService } from 'src/app/core/services/evento.service';
import { Evento } from '@app/shared/interfaces/evento';
import { NotificationsAlertsService } from '@app/core/services/notifications-alerts.service';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss'],
})
export class EventoListaComponent implements OnInit {
  public eventos: Evento[] = [];
  public widthImg = 50;
  public eventoId = 0;
  public margenImg = 2;
  public showImage = false;
  public eventsFilter: Evento[] = [];
  private _filterList;

  public modalRef?: BsModalRef;
  public message?: string;

  public get filterList() {
    return this._filterList;
  }

  public set filterList(value: string) {
    this._filterList = value;
    this.eventsFilter = this.filterList
      ? this.filterEvents(this.filterList)
      : this.eventos;
  }

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private notigicationAlert: NotificationsAlertsService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEventos();
    this.spinner.show();
  }

  public openModal(event: any, template: TemplateRef<any>, eventoId: number) {
    event.stopPropagation();
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    this.eventoId = eventoId;
  }

  public confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.eventoService
      .deleteEvento(this.eventoId)
      .subscribe(
        (result: any) => {
          if (result.message === 'Deletado') {
            this.notigicationAlert.showNotification(
              'success',
              'bottom',
              'right',
              'Deletado com sucesso',
              'Deletado!!'
            );
            this.getEventos();
          }
        },
        (error: any) => {
          this.notigicationAlert.showNotification(
            'warging',
            'bottom',
            'right',
            `Erro ao deletar evento ${this.eventoId}`,
            'Error!!'
          );
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }

  public decline(): void {
    this.modalRef?.hide();
  }

  public filterEvents(filterFor: string): Evento[] {
    filterFor = filterFor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento) =>
        evento.tema.toLocaleLowerCase().indexOf(filterFor) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filterFor) !== -1
    );
  }

  public getEventos(): void {
    this.spinner.show();
    this.eventoService
      .getEvento()
      .subscribe({
        next: (_eventos: Evento[]) => {
          this.eventos = _eventos;
          this.eventsFilter = this.eventos;
        },
        error: (error) => {
          this.notigicationAlert.showNotification(
            'danger',
            'bottom',
            'right',
            'Evento não encontrado',
            'Error!!'
          );
          console.error(error);
        },
      })
      .add(() => this.spinner.hide());
  }

  public showImageHtml() {
    this.showImage = !this.showImage;
  }

  public editEvent(eventoId: number): void {
    this.router.navigate([`/eventos/detalhe/${eventoId}`]);
  }
}
