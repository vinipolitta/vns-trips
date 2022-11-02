import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsAlertsService } from '@app/core/services/notifications-alerts.service';
import { Evento } from '@app/shared/interfaces/evento';
import { PaginatedResult, Pagination } from '@app/shared/interfaces/pagination';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, Subject } from 'rxjs';
import { EventoService } from 'src/app/core/services/evento.service';
import { environment } from 'src/environments/environment';

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
  public pagination = {} as Pagination;

  public modalRef?: BsModalRef;
  public message?: string;

  termoBuscaChanged: Subject<string> = new Subject<string>();

  public filtrarEventos(evt: any): void {
    if (this.termoBuscaChanged.observers.length === 0) {
      this.termoBuscaChanged
        .pipe(debounceTime(1000))
        .subscribe((filtrarPor) => {
          this.spinner.show();
          this.eventoService
            .getEventos(
              this.pagination.currentPage,
              this.pagination.itemsPerPage,
              filtrarPor
            )
            .subscribe(
              (paginatedResult: PaginatedResult<Evento[]>) => {
                this.eventos = paginatedResult.result;
                this.pagination = paginatedResult.pagination;
              },
              (error: any) => {
                this.spinner.hide();
                this.notigicationAlert.showNotification(
                  'warging',
                  'bottom',
                  'right',
                  'Erro ao encontrar eventos',
                  'Error!!'
                );
              }
            )
            .add(() => this.spinner.hide());
        });
    }
    this.termoBuscaChanged.next(evt.value);
  }

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private notigicationAlert: NotificationsAlertsService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pagination = {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 1,
    } as Pagination;
    this.getEventos();
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

  public mostrarImagem(imagemURL: string): string {
    return imagemURL !== ''
      ? `${environment.apiURL}resources/images/${imagemURL}`
      : 'assets/img/not-found-image.jpg';
  }

  public decline(): void {
    this.modalRef?.hide();
  }

  public filterEvents(evt: any): void {
    console.log(evt.value);
    this.eventoService
      .getEventos()
      .subscribe(
        (paginatedResult: PaginatedResult<Evento[]>) => {
          this.eventos = paginatedResult.result;
          this.pagination = paginatedResult.pagination;
        },
        (error: any) => {
          this.spinner.hide();

          this.notigicationAlert.showNotification(
            'danger',
            'bottom',
            'right',
            'Evento não encontrado',
            'Error!!'
          );
        }
      )
      .add(() => this.spinner.hide());
  }

  public getEventos(): void {
    this.spinner.show();
    this.eventoService
      .getEventos(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe({
        next: (paginatedResult: PaginatedResult<Evento[]>) => {
          this.eventos = paginatedResult.result;
          this.eventsFilter = this.eventos;
          this.pagination = paginatedResult.pagination;
          console.log(this.pagination);
          console.log('CURRENT', this.pagination.currentPage);
          console.log('PER PAGE', this.pagination.itemsPerPage);
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

  public pageChanged(ev): void {
    console.log(ev);
    this.pagination.currentPage = ev.page;
    this.getEventos();
  }
}
