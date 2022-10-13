import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';

import { NotificationsAlertsService } from './notifications-alerts.service';

describe('NotificarionsAlertsService', () => {
  let service: NotificationsAlertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ToastrModule.forRoot()
      ]
    });

    service = TestBed.inject(NotificationsAlertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
