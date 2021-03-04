export interface FirestoreQuery {
  where?: {
    fieldPath: string;
    operator: string;
    value: any;
  }[];
  orderBy?: {
    fieldPath: string;
    direction: string;
  }[];
  startAfter?: string[];
  limit?: number;
}

export interface QueryResultDocument<T> {
  id: string;
  data: T;
}

export interface QueryResult<T> {
  docs: QueryResultDocument<T>[];
}
