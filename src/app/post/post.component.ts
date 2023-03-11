import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { User } from 'src/models/interfaces';
import { AuthService } from 'src/services/auth.service';
import { PostsService } from 'src/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  public id: string | null = '';
  public user: User | null;
  postForm = new FormGroup({
    title: new FormControl('', [Validators.maxLength(200), Validators.required]),
    body: new FormControl('', [Validators.maxLength(2000), Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private posts: PostsService,
    private auth: AuthService
  ) {
    this.user = null
  }

  deletePost(): void {
    this.postForm.markAsUntouched()
    this.posts.deletePost(this.id).subscribe((response) => {
      if (response) {
        this.postForm.markAsPristine();
        this.router.navigate([
          '/'],
          { state: { message: 'Post was deleted successfully' } },
        );
      }
    });
    // pass
  }

  editPost(): void {
    this.postForm.markAsUntouched();
    const post = { ...this.postForm.getRawValue() };
    this.posts.updatePost(post, this.id).subscribe(res => {
      this.postForm.markAsPristine();
      this.router.navigate([
        '/'],
        { state: { message: 'Post was updated successfully' } },
      );
    })
  }

  addPost(): void {
    const post = { userId: this.id, ...this.postForm.getRawValue() };
    this.posts.createPost(post).subscribe(res => {
      this.router.navigate([
        '/'],
        { state: { message: 'A new post was saved successfully' } },
      )
      this.postForm.markAsPristine();
    })
  }

  get title() {
    return this.postForm.get('title');
  }

  get body() {
    return this.postForm.get('body');
  }

  cancelOp(): void {
    this.postForm.markAsPristine();
    this.router.navigate(['/']);
    //pass
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.posts.getPost(params['id']).subscribe((post) => {
          if (post) {
            this.id = params['id'];
            this.postForm.setValue({
              title: post.title,
              body: post.body,
            });
          }
        });
      } else {
        console.log('None');
      }
    });
    this.auth.getUserData().subscribe((user) => (this.user = user));
  }
}
