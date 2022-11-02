import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsAlertsService } from '@app/core/services/notifications-alerts.service';
import { PalestranteService } from '@app/core/services/palestrante.service';
import { PaginatedResult, Pagination } from '@app/shared/interfaces/pagination';
import { Palestrante } from '@app/shared/interfaces/palestrante';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-palestrante-lista',
  templateUrl: './palestrante-lista.component.html',
  styleUrls: ['./palestrante-lista.component.scss']
})
export class PalestranteListaComponent implements OnInit {

  public palestrantes: Palestrante[] = [];
  public widthImg = 50;
  public palestranteId = 0;
  public margenImg = 2;
  public showImage = false;
  public eventsFilter: Palestrante[] = [];
  public pagination = {} as Pagination;

  public modalRef?: BsModalRef;
  public message?: string;

  termoBuscaChanged: Subject<string> = new Subject<string>();
  imagemURL: any;
  file: any;

  constructor(
    private palestranteService: PalestranteService,
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

    this.carregarPalestrantes();
  }

  public filtrarPalestrantes(evt: any): void {
    if (this.termoBuscaChanged.observers.length === 0) {
      this.termoBuscaChanged
        .pipe(debounceTime(1000))
        .subscribe((filtrarPor) => {
          this.spinner.show();
          this.palestranteService
            .getPalestrantes(
              this.pagination.currentPage,
              this.pagination.itemsPerPage,
              filtrarPor
            )
            .subscribe(
              (paginatedResult: PaginatedResult<Palestrante[]>) => {
                this.palestrantes = paginatedResult.result;
                this.pagination = paginatedResult.pagination;
              },
              (error: any) => {
                this.spinner.hide();
                this.notigicationAlert.showNotification(
                  "warging",
                  "bottom",
                  "right",
                  "Erro ao encontrar palestrantes",
                  "Error!!"
                );
              }
            )
            .add(() => this.spinner.hide());
        });
    }
    this.termoBuscaChanged.next(evt.value);
  }

  public onFileChange(ev: any): void {
    const reader = new FileReader();

    reader.onload = (event: any) => {
      this.imagemURL = event.target.result;
    };

    this.file = ev.target.files;

    reader.readAsDataURL(this.file[0]);
    // this.uploadImagem();
  }

  public carregarPalestrantes(): void {
    this.spinner.show();
    this.palestranteService
      .getPalestrantes(
        this.pagination.currentPage,
        this.pagination.itemsPerPage
      )
      .subscribe({
        next: (paginatedResult: PaginatedResult<Palestrante[]>) => {
          this.palestrantes = paginatedResult.result;
          this.eventsFilter = this.palestrantes;
          this.pagination = paginatedResult.pagination;
          console.log(this.pagination);
          console.log("CURRENT", this.pagination.currentPage);
          console.log("PER PAGE", this.pagination.itemsPerPage);
        },
        error: (error) => {
          this.notigicationAlert.showNotification(
            "danger",
            "bottom",
            "right",
            "Palestrante não encontrado",
            "Error!!"
          );
          console.error(error);
        },
      })
      .add(() => this.spinner.hide());
  }

}
