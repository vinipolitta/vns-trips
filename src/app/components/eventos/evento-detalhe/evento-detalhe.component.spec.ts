import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoDetalheComponent } from './evento-detalhe.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('EventoDetalheComponent', () => {
  let component: EventoDetalheComponent;
  let fixture: ComponentFixture<EventoDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterModule,
        RouterTestingModule,
        HttpClientModule,
        ToastrModule.forRoot(),
      ],
      declarations: [EventoDetalheComponent],
      providers: [BsModalService, BsModalRef],
    }).compileComponents();

    fixture = TestBed.createComponent(EventoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
