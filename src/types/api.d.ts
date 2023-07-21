export interface ErrorsInterface {
  301: () => void;
  400: () => void;
  401: () => void;
  403: () => void;
  404: () => void;
  405: () => void;
  408: () => void;
  422: () => void;
  426: () => void;
  429: () => void;
  500: () => void;
  unknown: () => void;

  [propName: string]: () => void;
}
