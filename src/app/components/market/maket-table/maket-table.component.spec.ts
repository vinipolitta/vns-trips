import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaketTableComponent } from './maket-table.component';

describe('MaketTableComponent', () => {
  let component: MaketTableComponent;
  let fixture: ComponentFixture<MaketTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaketTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaketTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
