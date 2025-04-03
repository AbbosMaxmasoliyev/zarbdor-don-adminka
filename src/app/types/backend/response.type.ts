export interface IResponse<T> {
  status: boolean,
  data: T,
  page?:T
}
