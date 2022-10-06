import { TestBed } from '@angular/core/testing';

import { NotificarionsAlertsService } from './notifications-alerts.service';

describe('NotificarionsAlertsService', () => {
  let service: NotificarionsAlertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificarionsAlertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
