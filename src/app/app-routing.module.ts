import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaInicialComponent } from './components/pagina-inicial/pagina-inicial.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  //First Path
  {path: '', redirectTo: 'pagina-inicial', pathMatch: 'full'},
  {path: 'pagina-inicial', component: PaginaInicialComponent},
  {path: 'table', component: TableComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
