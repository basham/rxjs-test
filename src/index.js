import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operator/map';
import {merge} from 'rxjs/operator/merge';

Observable.of(1,2,3)::map(x => x + '!!!');
