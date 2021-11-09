import {Component, OnDestroy, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Post} from './post.model';
import {PostsService} from './posts.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  url = 'https://angular-http-fl-default-rtdb.europe-west1.firebasedatabase.app/posts.json';
  loadedPosts: Post[] = [];
  isFetching = false;
  error: any = null;
  private  errorSub : Subscription;

  constructor(private http: HttpClient, private postService: PostsService) {}

  ngOnInit() {
    this.isFetching = true;
     this.errorSub =  this.postService.error.subscribe( errorMessage => {
       this.error = errorMessage;
     });
    this.postService.fetchPost().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      }, error => {
        this.isFetching = false;
        this.error = error.error.error;
      }
    );
  }

  onCreatePost(postData: Post) {
    // Send Http request // Angular transform json.
    this.postService.createAndStorePost(postData.title, postData.content)

  }
  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.fetchPost().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      }, error => {
        this.error = error.message;
        this.isFetching = false;

      }
    );
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(()=>{
      this.loadedPosts = [];
    })
  }

  onHandleError(){
    this.error = null;
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

}
