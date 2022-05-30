export type PaginatorPropsType = {
  pageSize: number
  currentPage: number
  totalUsersCount: number
  onPageChanged: (pageNumber: number) => void
  // eslint-disable-next-line react/require-default-props
  portionSize?: number
}