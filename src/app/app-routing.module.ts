import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'modal', loadChildren: './components/modal/modal.module#ModalPageModule' },
  { path: 'inicio', loadChildren: './inicio/inicio.module#InicioPageModule' },  { path: 'visualizador', loadChildren: './visualizador/visualizador.module#VisualizadorPageModule' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
