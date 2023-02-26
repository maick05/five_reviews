export class ReviewsProductDTO {
  public pageSize: number;
  public total: number;
  public totalPages: number;
  public currentPage: number;
  public dataList: ReviewProduct[];
  public otherData: any;
}

export class ReviewProduct {
  id: number;
  customer_id: string;
  nick: string;
  comment_title: string;
  comment_content: string;
  comment_star: number;
  additional_url: string;
  area: string;
  create_time: number;
  replay_content: string;
  likeCount: number;
  dislikeCount: number;
  likeValue: number;
}
