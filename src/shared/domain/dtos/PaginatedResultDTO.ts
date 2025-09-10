export interface PaginatedResultDTO<T> {
  data: T[];
  pagination: PaginationDTO;
}

export interface PaginationDTO {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}