import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Array<object>): any {

    return value.sort((a, b) => {
      // @ts-ignore
      if (a.name < b.name) {
        return -1;
      }
      // @ts-ignore
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }

}
