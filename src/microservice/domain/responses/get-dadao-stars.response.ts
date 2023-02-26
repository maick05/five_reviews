export class GetDadaoStarsResponse {
  countAndAvgMap: CountAndAvgMap;
  starMap: {
    [key: number]: number;
  };
}

export class CountAndAvgMap {
  avgStar: string;
  commentCount: number;
}
