export type ApiResponse<Data> =
  | {
      status: 1
      data: Data
      error: null
    }
  | {
      status: 0
      data: null
      error: Error
    }
