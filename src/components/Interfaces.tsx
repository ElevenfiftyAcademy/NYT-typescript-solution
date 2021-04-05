export interface IResult {
  _id: number;
  headline: IHeadline;
  multimedia: IMultimedia[];
  snippet: string;
  keywords: IKeywords[];
  web_url: string;
}

export interface IKeywords {
  value: string;
}

interface IHeadline {
  main: string;
}

interface IMultimedia {
  url: string;
  
}
