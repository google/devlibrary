export interface FirestoreQuery {
  scope?: "COLLECTION" | "COLLECTION_GROUP";
  where?: {
    fieldPath: string;
    operator: string;
    value: any;
  }[];
  orderBy?: {
    fieldPath: string;
    direction: "asc" | "desc";
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
