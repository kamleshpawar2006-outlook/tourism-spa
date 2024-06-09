import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BranchListComponent } from './branch-list/branch-list.component';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EditTariffComponent } from './edit-tariff/edit-tariff.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BranchListComponent,
    AddBranchComponent,
    EditTariffComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
