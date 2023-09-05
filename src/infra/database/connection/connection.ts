export interface Connection<T = any> {
  getConnection: () => T
  query: <T = any>(sql: string, params?: any[]) => Promise<T[]>
}
