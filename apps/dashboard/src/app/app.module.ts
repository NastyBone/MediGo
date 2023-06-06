import { ErrorHandler, NgModule, forwardRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { StateModule } from './common/state/state.module';
import { ApiModule, Configuration } from '@medigo/dashboard-sdk';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { TableModule } from './common';
import { ToastModule, ToastService } from '@medigo/toast';
import { ErrorHandlerModule, ErrorHandlerService } from '@medigo/error-handler';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AuthGuard } from './auth/auth.guard';

function apiConfigFactory(): Configuration {
  return new Configuration({
    basePath: environment.apiBasePath,
    withCredentials: true,
  });
}

@NgModule({
  declarations: [AppComponent, WelcomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    ApiModule.forRoot(apiConfigFactory),
    HttpClientModule,
    ToastModule.forRoot(),
    StateModule,
    TableModule,
    ErrorHandlerModule.forRoot({
      alertService: forwardRef(() => ToastService),
      alertMethodName: 'error',
      alertClientErrors: true,
      loggerConfig: {
        allowConsole: true,
      },
    }),
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    //  AuthGuard, //TODO: ADD
    {
      provide: ErrorHandler,
      useExisting: forwardRef(() => ErrorHandlerService),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
