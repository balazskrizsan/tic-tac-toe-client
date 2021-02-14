import {Observable} from 'rxjs';
import {IResponseEntity} from '../interfaces/i-response-entity';

export interface IAbstractCrudApiRepository {
  search<T>(page: number, limit: number, navigationId: number, uri, requestRelationIds?: number[]): Observable<IResponseEntity<T[]>>;

  get<T>(uri?: string): Observable<IResponseEntity<T>>;

  update(updateData): Promise<boolean>;

  create(updateData: {}): Observable<IResponseEntity<null>>;

  delete(siteId: number): Promise<boolean>;
}
