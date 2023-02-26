export class GetAllDadaoReviewsResponse {
  public pageSize: number;
  public total: number;
  public totalPages: number;
  public currentPage: number;
  public dataList: DadaoReview[];
  public otherData: any;
}

export class DadaoReview {
  commentId: number;
  status: number;
  star: number;
  commentTitle: string;
  content: string;
  nick: string;
  email: string;
  additional_url: string;
  create_time: number;
  area: string;
  featured: boolean;
  platform: number;
  goods_title: string;
  replay_content: string;
}
