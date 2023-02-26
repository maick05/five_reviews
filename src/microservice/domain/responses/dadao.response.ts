export class DadaoResponse<DataResponse> {
  code: number;
  column: any;
  msg: string;
  otherData: any;
  data: DataResponse;
}

export class DadaoListResponse<DataList> {
  pageSize: number;
  total: number;
  totalPages: number;
  currentPage: number;
  dataList: DataList;
  otherData: any;
}
