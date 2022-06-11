import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vnsCreative';

constructor(private toastr: ToastrService) {

}
  teste() {
    this.toastr.success('testando', 'Sucess!!', {
      progressBar: true,
      positionClass: 'toast-bottom-right',
    })
  }
}
