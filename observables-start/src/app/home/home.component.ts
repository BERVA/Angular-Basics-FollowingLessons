import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';
import { map, filter} from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription : Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    const customObservable = new Observable((observer) => {
      let count = 0;
      setInterval(()=>{
        observer.next(count);
        if (count === 2){
          observer.complete()
        }
        if (count > 3){
          observer.error(new Error('Counter is greater 3!'));
        }
        count++;
      }, 1000)
    });

    this.firstObsSubscription = customObservable.pipe(filter( (data) => {
      return data > 0;
    }),map(
      (data : number) => {
        return 'Round ' + (data + 1);
      }
    )).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      console.log(error.message)
    }, ()=>{
      console.log('Task completed');
    })


  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }

}
