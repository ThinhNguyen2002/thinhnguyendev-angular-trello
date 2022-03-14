import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { BoardContentComponent } from './components/board-content/board-content.component';
import { BoardBarComponent } from './components/board-bar/board-bar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CardComponent } from './components/card/card.component';
import { ColumnComponent } from './components/column/column.component';
import { FackeDataService } from './services/facke-data.service';
import { NgxSmoothDnDModule } from 'ngx-smooth-dnd';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppBarComponent,
    BoardContentComponent,
    BoardBarComponent,
    HomePageComponent,
    AppComponent,
    CardComponent,
    ColumnComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSmoothDnDModule,
    NgbModule,
    FormsModule,
  ],
  providers: [FackeDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
function appRoutes(
  appRoutes: any
):
  | any[]
  | import('@angular/core').Type<any>
  | import('@angular/core').ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}
