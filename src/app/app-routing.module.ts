import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: '', loadChildren: './pages/home/home.module#HomeModule' },
  { path: 'admin', loadChildren: './pages/admin/admin.module#AdminModule', canActivate: [AuthService] },
  { path: 'cizim/:id', loadChildren: './pages/cizim/cizim.module#CizimModule' },
  { path: 'addcizim', loadChildren: './pages/addcizim/addcizim.module#AddcizimModule', canActivate: [AuthService]},
  { path: 'cizimler', loadChildren: './pages/cizimler/cizimler.module#CizimlerModule' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }


