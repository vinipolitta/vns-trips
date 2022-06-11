import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerColorsComponent } from './manager-colors.component';

describe('ManagerColorsComponent', () => {
  let component: ManagerColorsComponent;
  let fixture: ComponentFixture<ManagerColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerColorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
