import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from './post.model';
import {map, catchError} from 'rxjs/operators';
import {Subject, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostsService {
  url = 'https://angular-http-fl-default-rtdb.europe-west1.firebasedatabase.app/posts.json';

  error = new Subject<string>()

  constructor(private http: HttpClient) {
  }
  createAndStorePost(title: string, content: string){
    const postData: Post = {title, content}
    this.http
      .post<{name: string}>(this.url,postData).subscribe((response)=>{
      console.log(response);
    }, error => {
        this.error.next(error.message)
    });
  }

  fetchPost(){
    return this.http
      .get<{[key: string]: Post}>(this.url)
      .pipe(
        map(
        responseData =>{
          const postArray: Post[] = [];
          for (const key in responseData){
            if (responseData.hasOwnProperty(key)){
              postArray.push({...responseData[key], id: key})
            }
          }
          return postArray;
        }), catchError( errorResponse => {
          // Send analytics to server
          return throwError(errorResponse);
        })
      );

  }

  deletePosts(){
    return this.http.delete(this.url);
  }

}
