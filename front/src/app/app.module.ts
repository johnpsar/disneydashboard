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
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartComponent } from './chart/chart.component';
import { FileSaverModule } from 'ngx-filesaver';
const appRoutes: Routes = [{ path: '', component: DashboardComponent }];
@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    SpinnerComponent,
    ModalComponent,
    DashboardComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HighchartsChartModule,
    FileSaverModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [Character],
  bootstrap: [AppComponent],
})
export class AppModule {}
