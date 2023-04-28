export interface PaginationStatus {
  total: number;
  currentPage: number;
  lastPage: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
