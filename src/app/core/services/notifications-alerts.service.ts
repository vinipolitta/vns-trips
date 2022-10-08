import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsAlertsService {

  constructor(private toastr: ToastrService) { }

  public showNotification(
    toastClasse?: string,
    from = 'bottom',
    align = 'right',
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
}
