import { BehaviorSubject, filter, Observable } from 'rxjs';

import { PaginationStatus } from './models';

export class MemoryRepository<T extends { id?: number | string }> {
  protected dataSource: T[] | null = null;

  protected datasourse$ = new BehaviorSubject<T[] | null>(this.dataSource);
  protected paginationStatus$ = new BehaviorSubject<PaginationStatus | null>(
    null
  );

  protected total$ = new BehaviorSubject<number>(0);

  setDataSource(dataSource: T[]): void {
    this.dataSource = dataSource;
    this.datasourse$.next(this.dataSource);
  }

  setDataScrollSource(dataSource: T[]): void {
    if (!this.dataSource) {
      this.dataSource = dataSource;
    } else {
      this.dataSource = this.dataSource?.concat(dataSource);
    }
    this.datasourse$.next(this.dataSource);
  }

  getDataSource(): T[] | null {
    return this.dataSource;
  }

  getDataSource$(): Observable<T[] | null> {
    return this.datasourse$
      .asObservable()
      .pipe(filter((dataSource) => !!dataSource));
  }

  create(data: T): void {
    this.dataSource = [...(this.dataSource || []), data];
    this.datasourse$.next(this.dataSource);
  }

  findOne(id: number | string): T | null {
    if (!this.dataSource) {
      return null;
    }
    return this.dataSource.find((item: T) => item.id === id) || null;
  }

  update(data: T): void {
    if (!this.dataSource) {
      return;
    }
    const index = this.dataSource.findIndex((item: T) => item.id === data.id);
    if (index > -1) {
      this.dataSource = [
        ...this.dataSource.slice(0, index),
        data,
        ...this.dataSource.slice(index + 1),
      ];
      this.datasourse$.next(this.dataSource);
    }
  }

  delete(id: number): void {
    if (!this.dataSource) {
      return;
    }

    const index = this.dataSource.findIndex((item: T) => item.id === id);

    if (index > -1) {
      this.dataSource = [
        ...this.dataSource.slice(0, index),
        ...this.dataSource.slice(index + 1),
      ];
      this.datasourse$.next(this.dataSource);
    }
  }

  getPaginationStatus$(): Observable<PaginationStatus | null> {
    return this.paginationStatus$.asObservable();
  }

  setPaginationStatus(paginationStatus: PaginationStatus): void {
    this.paginationStatus$.next(paginationStatus);
  }

  getTotal(): number {
    return this.total$.value;
  }

  getTotal$(): Observable<number> {
    return this.total$.asObservable();
  }

  setTotal(total: number): void {
    return this.total$.next(total);
  }

  reset(): void {
    this.dataSource = null;
    this.datasourse$.next(this.dataSource);
    this.paginationStatus$.next(null);
  }
}
