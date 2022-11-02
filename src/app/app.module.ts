import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ToastrModule } from 'ngx-toastr';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from './shared/shared.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { EventosComponent } from './components/eventos/eventos.component';
import { DateTimeFormatPipe } from './shared/pipes/date-time-format.pipe';
import { ContatosComponent } from './components/contatos/contatos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';
import { EventoDetalheComponent } from './components/eventos/evento-detalhe/evento-detalhe.component';
import { EventoListaComponent } from './components/eventos/evento-lista/evento-lista.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';

import { NgxPaginationModule } from 'ngx-pagination';

import { RegistrationComponent } from './components/user/registration/registration.component';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { PerfilDetalheComponent } from './components/user/perfil/perfil-detalhe/perfil-detalhe.component';
defineLocale('pt-br', ptBrLocale);

export const customCurrencyMaskConfig = {
  align: 'left',
  allowNegative: true,
  allowZero: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL,
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventosComponent,
    DateTimeFormatPipe,
    ContatosComponent,
    DashboardComponent,
    PerfilComponent,
    PalestrantesComponent,
    EventoDetalheComponent,
    EventoListaComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    PerfilDetalheComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    BsDatepickerModule.forRoot(),
    CollapseModule.forRoot(),
    ToastrModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
    NgbModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
