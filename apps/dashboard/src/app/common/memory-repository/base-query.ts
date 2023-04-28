export interface BaseQuery {
  id?: number;
  term?: string;
  page?: number;
  size?: number;
  sort?: string;
  order?: 'ASC' | 'DESC';
}
