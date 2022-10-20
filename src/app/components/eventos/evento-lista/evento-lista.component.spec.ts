import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { Evento } from './../../../shared/interfaces/evento';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoListaComponent } from './evento-lista.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

describe('EventoListaComponent', () => {
  let component: EventoListaComponent;
  let retorno;
  let events: Evento;
  let fixture: ComponentFixture<EventoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, ToastrModule.forRoot()],
      declarations: [ EventoListaComponent ],
      providers: [BsModalService, BsModalRef],

    })
    .compileComponents();

    fixture = TestBed.createComponent(EventoListaComponent);
    component = fixture.componentInstance;
    retorno =  component.getEventos
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('mostra imagem ou nao', () => {
    let showImage = component.showImageHtml;
    expect(showImage).toBeTruthy();
  })
});
