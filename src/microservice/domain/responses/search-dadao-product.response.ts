export class SearchDadaoProduct {
  public pageSize: number;
  public total: number;
  public totalPages: number;
  public currentPage: number;
  public dataList: DadaoProduct[];
  public otherData: any;
}

export class DadaoProduct {
  goodsId: number;
  goodsTitle: string;
}
