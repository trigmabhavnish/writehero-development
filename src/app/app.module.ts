import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';

//importing intercepters
import { ApiIntercepter } from './core/interceptors/api.interceptor';
import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { PageLoaderComponent } from './shared/components/page-loader/page-loader.component';

//import core services
import { UsersService, CommonUtilsService, ProjectsService } from './core/_services';

//services 
import { PageLoaderService } from './shared/_services'

//import shared module
import { SharedModule } from './core/shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [
    UsersService,
    CommonUtilsService,
    PageLoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiIntercepter, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
