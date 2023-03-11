import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Post, User } from 'src/models/interfaces';
import { AuthService } from 'src/services/auth.service';
import { PostsService } from 'src/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  users: User[] = [];
  test: Post[] = [];
  step: number = 10;
  top: number = 0;
  current: number = 0;
  moveForward: boolean = false;
  moveBack: boolean = true;
  user: User | null;
  state:any;

  constructor(private postsService: PostsService, private auth: AuthService, private router: Router) {
    this.user = null
    this.state = this.router.getCurrentNavigation()?.extras?.state;
  }

  checkAviability() {
    this.moveForward = this.top - this.current == 1 ? true : false;
    this.moveBack = this.current == 0 ? true : false;
  }

  newPost(){
    this.router.navigate(['post'])
  };

  logout() {
    this.state = ''
    this.auth.removeUser();
  }

  login() {
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
    this.postsService.getTodos().subscribe((posts) => {
      this.posts = posts;
      this.postsService.getUsers().subscribe((users) => {
        this.users = users;
        this.posts = this.posts.map((element) => ({
          ...element,
          user: this.users.find((user) => element.userId == user.id),
        }));
        this.test = this.posts.slice(0, this.step);
        this.top = Math.floor(this.posts.length / this.step);
      });
    });

    this.auth.currentUser.subscribe((user) => (this.user = user));
  }
  onNext() {
    if (this.current != this.top) {
      this.test = this.posts.slice(
        this.current * this.step,
        (this.current + 1) * this.step
      );
      this.current = this.current + 1;
    }
    this.checkAviability();
  }
  onPrev() {
    if (this.current != 0) {
      this.test = this.posts.slice(
        (this.current - 1) * this.step,
        this.current * this.step
      );
      this.current = this.current - 1;
      this.checkAviability();
    }else {
      this.moveBack = true;

    }
    this.checkAviability();
  }
}
