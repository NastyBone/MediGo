export type DataOptions = {
  source: any[];
  date: string;
  imgSystem: string;
};

export type DocumentOptions = {
  html: string;
  data: DataOptions;
  path: string;
  type: string;
};
