import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  { path: '', redirectTo: 'web', pathMatch: 'full' },
  {
    path: 'web',
    loadChildren: './modules/front/front.module#FrontModule'
  },
  {
    path: 'user',
    loadChildren: './modules/users/users.module#UsersModule'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
