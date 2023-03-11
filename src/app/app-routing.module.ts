import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { RouteCheckerService } from './route-checker.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: '',
    component: PostsComponent,
    pathMatch: 'full',
  },
  {
    path: 'post',
    component: PostComponent,
    canDeactivate: [RouteCheckerService],
  },
  {
    path: 'post/:id',
    component: PostComponent,
    canDeactivate: [RouteCheckerService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
