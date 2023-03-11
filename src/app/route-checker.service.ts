import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PostComponent } from './post/post.component';

@Injectable({
  providedIn: 'root'
})
export class RouteCheckerService implements CanDeactivate<PostComponent> {
  canDeactivate(component: PostComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (component.postForm?.dirty) {
      return confirm(
        'Are you sure you want to navigate away and lose changes to the form?'
      );
    }
    return true
  }

  constructor() { }
}
