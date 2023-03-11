import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { PostsService } from 'src/services/post.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string | null = '';
  message: string | null = '';

  constructor(
    private posts: PostsService,
    private auth: AuthService,
    private router: Router
  ) {}

  check() {
    this.posts.getUsers().subscribe((users) => {
      const user = users.find((el) => (el.username == this.username));
      if (user) {
        // this.route
        this.auth.setUser(user);
        this.router.navigate(['']);
      } else {
        this.message = 'not a valid user name';
      }
    });
  }

  ngOnInit(): void {
    //
  }
}
