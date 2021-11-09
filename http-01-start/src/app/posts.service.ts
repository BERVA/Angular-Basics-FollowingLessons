import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from '@angular/common/http';
import {Post} from './post.model';
import {catchError, map, tap} from 'rxjs/operators';
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
      .post<{name: string}>(this.url,postData, {
        observe: 'response'
      })
      .subscribe((response)=>{
      console.log(response);
    }, error => {
        this.error.next(error.message)
    });
  }
  fetchPost(){
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key')
    return this.http
      .get<{[key: string]: Post}>(this.url,
        {
          headers: new HttpHeaders({'Custom-Header' :'Hello'}),
          params: searchParams,
          responseType: 'json'
        })
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
    return this.http.delete(this.url, {
      observe: 'events',
      responseType: 'json'
    }).pipe(
      tap( event => {
        console.log(event);
        if (event.type === HttpEventType.Sent){
          console.log(event.type)
        }
        if (event.type === HttpEventType.Response){
          console.log(event.body);
        }
      })
    );
  }
}
