import {HttpService} from '../services/http-service';
import {HttpParams} from '@angular/common/http';
import {IAbstractCrudApiRepository} from './i-abstract-crud-api-repository';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {IResponseEntity} from '../interfaces/i-response-entity';

export abstract class AbstractApiRepository implements IAbstractCrudApiRepository {
  protected constructor(private httpService: HttpService) {
  }

  private static paramCleaner(rawData: any): {} {
    const cleanData = {};

    Object.keys(rawData).forEach(
      (key: string) => {
        const valueOrObject = rawData[key];

        if ('undefined' === typeof valueOrObject || null === valueOrObject) {
          return;
        }

        if ('boolean' === typeof valueOrObject) {
          cleanData[key] = valueOrObject ? 1 : 0;

          return;
        }
        if (valueOrObject instanceof File) {
          cleanData[key] = valueOrObject;

          return;
        }

        if ('object' === typeof valueOrObject) {
          cleanData[key] = AbstractApiRepository.paramCleaner(valueOrObject);

          return;
        }

        cleanData[key] = valueOrObject;
      }
    );

    return cleanData;
  }

  private static createFormData(rawData: {}): FormData {
    rawData = AbstractApiRepository.paramCleaner(rawData);
    const params = new FormData();

    Object.keys(rawData).forEach(
      (key: string) => {
        const valueOrObject = rawData[key];

        if (valueOrObject instanceof File) {
          params.append(key, valueOrObject, 'a.jpg');

          return;
        }

        params.append(key, typeof valueOrObject === 'object' ? JSON.stringify(valueOrObject) : valueOrObject);
      }
    );

    return params;
  }

  private static createHttpParams(rawData: {}): HttpParams {
    rawData = AbstractApiRepository.paramCleaner(rawData);
    let params = new HttpParams();

    Object.keys(rawData).forEach(
      (key: string) => {
        const valueOrObject = rawData[key];

        if ('object' === typeof valueOrObject) {
          Object.keys(valueOrObject).forEach(
            (subKey) => {
              params = params.append(key, valueOrObject[subKey]);
            }
          );

          return;
        }

        params = params.append(key, valueOrObject);
      }
    );

    return params;
  }

  abstract getController(): string;

  protected post<T>(uri: string = '', postData: {} = {}): Observable<IResponseEntity<T>> {

    return this.httpService.post<T>(`${environment.backend.api.host}${uri}`, AbstractApiRepository.createFormData(postData));
  }

  create(updateData: {} = {}): Observable<IResponseEntity<null>> {
    return this.post<null>('', updateData);
  }

  delete(siteId: number): Promise<boolean> {
    return Promise.resolve(false);
  }

  search<T>(seekId: number, limit: number, navigationId?: number, uri = '', requestRelationIds?: number[]):
    Observable<IResponseEntity<T>> {
    if ('' === uri) {
      uri = this.getController();
    }

    return this.httpService.get<T>(
      `${environment.backend.api.host}${uri}`,
      AbstractApiRepository.createHttpParams({seekId, limit, navigationId, requestRelationIds})
    );
  }

  get<T>(uri = ''): Observable<IResponseEntity<T>> {
    if ('' === uri) {
      uri = this.getController();
    }

    return this.httpService.get<T>(`${environment.backend.api.host}${uri}`);
  }

  update(updateData): Promise<boolean> {
    return Promise.resolve(false);
  }
}

