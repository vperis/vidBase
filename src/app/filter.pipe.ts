import {Pipe, PipeTransform} from '@angular/core';

// Filter the list with only entries that match the search text
@Pipe({
    name:'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items:any, filter:any) {
              if (filter && Array.isArray(items)){
                let filterKeys = Object.keys(filter);
                  return items.filter(item =>
                    filterKeys.reduce((memo, keyName) =>
                        (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) ||
                                      filter[keyName] === "", true));
              } else {
                  return items;
              }
    }
}