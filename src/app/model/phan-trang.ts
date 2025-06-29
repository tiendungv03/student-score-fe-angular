export interface phanTrang<T> {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  items: T[];
}
