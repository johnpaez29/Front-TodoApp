import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitComponent } from './Components/init/init.component';
import { ToDoComponent } from './Components/to-do/to-do.component';

const routes: Routes = [
  { path: '', redirectTo: 'Init', pathMatch: 'full' },
  { path: 'Init', component: InitComponent },
  { path: 'ToDo', component: ToDoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
