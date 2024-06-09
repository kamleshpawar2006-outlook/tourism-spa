import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { BranchListComponent } from './branch-list/branch-list.component';
import { EditTariffComponent } from './edit-tariff/edit-tariff.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: "branch-list", component: BranchListComponent },
  { path: "add-branch", component: AddBranchComponent },
  { path: "edit-tariff/:branchId", component: EditTariffComponent },
  { path: "home", component: HomeComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
