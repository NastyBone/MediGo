import { Optional } from '@angular/core';

import { BehaviorSubject, finalize, Observable } from 'rxjs';

import { BaseQuery } from './base-query';
import { MemoryRepository } from './memory-repository';
import { PaginationStatus } from './models';
import { UseCase } from './use-case';

export class ListComponentService<
  T extends { id?: string | number | undefined },
  R extends BaseQuery = BaseQuery
> {
  protected loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private getService: UseCase<T[], BaseQuery>,
    @Optional() private memoryService?: MemoryRepository<T> | null,
    @Optional() private deleteService?: UseCase<number, number> | null,
    @Optional() private createService?: UseCase<T, T> | null,
    @Optional() private updateService?: UseCase<T, T> | null,
    @Optional() private findService?: UseCase<T, BaseQuery> | null,
    @Optional() private reportService?: UseCase<T> | null
  ) {}

  getData$(): Observable<T[] | null> {
    if (!this.memoryService) {
      throw new Error('MemoryService is not defined');
    }
    return this.memoryService.getDataSource$();
  }

  getLoading$(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  create(data: T): Observable<T | null> {
    if (!this.createService) {
      throw new Error('createService is not defined');
    }
    this.loading$.next(true);
    return (this.createService.exec(data) as Observable<T>).pipe(
      finalize(() => this.loading$.next(false))
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  report(data: T): Observable<any> {
    if (!this.reportService) {
      throw new Error('reportService is not defined');
    }
    this.loading$.next(true);
    return (this.reportService.exec(data) as Observable<T>).pipe(
      finalize(() => this.loading$.next(false))
    );
  }

  delete(id: number): void {
    if (!this.deleteService) {
      throw new Error('DeleteService is not defined');
    }
    this.loading$.next(true);
    (this.deleteService.exec(id) as Observable<number>)
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe();
  }

  update(data: T): Observable<T | null> {
    if (!this.updateService) {
      throw new Error('updateService is not defined');
    }
    this.loading$.next(true);
    return (this.updateService.exec(data) as Observable<T>).pipe(
      finalize(() => this.loading$.next(false))
    );
  }

  get(data: R): void {
    this.loading$.next(true);
    (this.getService.exec(data) as Observable<T[]>)
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe();
  }

  getPaginationStatus$(): Observable<PaginationStatus | null> {
    if (!this.memoryService) {
      throw new Error('MemoryService is not defined');
    }
    return this.memoryService.getPaginationStatus$();
  }

  getTotal$(): Observable<number> {
    if (!this.memoryService) {
      throw new Error('MemoryService is not defined');
    }
    return this.memoryService.getTotal$();
  }

  reset(): void {
    if (!this.memoryService) {
      throw new Error('MemoryService is not defined');
    }
    this.memoryService.reset();
  }

  find$(data: R): Observable<T | null> {
    if (!this.findService) {
      throw new Error('findService is not defined');
    }
    this.loading$.next(true);
    return (this.findService.exec(data) as Observable<T>).pipe(
      finalize(() => this.loading$.next(false))
    );
  }

  setLoading(loading: boolean): void {
    this.loading$.next(loading);
  }
}
