import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EventoService } from 'src/app/core/services/evento.service';
import { Evento } from 'src/app/shared/interfaces/evento';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss'],
})
export class EventoListaComponent implements OnInit {
  public eventos: Evento[] = [];
  public widthImg = 50;
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
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEventos();
    this.spinner.show();
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  public confirm(): void {
    this.modalRef?.hide();
    this.showNotification(
      'success',
      'bottom',
      'right',
      'Deletado com sucesso',
      'Deletado!!'
    );
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
    this.eventoService.getEvento().subscribe({
      next: (_eventos: Evento[]) => {
        this.eventos = _eventos;
        this.eventsFilter = this.eventos;
      },
      error: (error) => {
        console.log(error),
          this.spinner.hide(),
          this.showNotification(
            'danger',
            'bottom',
            'right',
            'Evento não encontrado',
            'Error!!'
          );
      },
      complete: () => this.spinner.hide(),
    });
  }

  public showImageHtml() {
    this.showImage = !this.showImage;
  }

  // TOAST
  public showNotification(
    toastClasse?: string,
    from?: string,
    align?: string,
    subTitle?: string,
    titleToast?: string
  ) {
    // <span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Welcome to <b>Black Dashboard Angular</b> - a beautiful freebie for every web developer.
    this.toastr.show(
      '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>' +
        subTitle,
      titleToast,

      {
        disableTimeOut: false,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-' + toastClasse + ' alert-with-icon',
        positionClass: 'toast-' + from + '-' + align,
      }
    );
  }

  public editEvent(eventoId: number): void {
    this.router.navigate([`/eventos/detalhe/${eventoId}`]);
  }
}
