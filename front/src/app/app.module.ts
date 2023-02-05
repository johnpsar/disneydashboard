import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { Character } from './character';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { SpinnerComponent } from './spinner/spinner.component';
import { ModalComponent } from './modal/modal.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [{ path: '', component: DashboardComponent }];
@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    SpinnerComponent,
    ModalComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [Character],
  bootstrap: [AppComponent],
})
export class AppModule {}
