import peRequest from '../../index'
import { IDataType } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return peRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

//url:/users/id
export function deletePageData(url: string) {
  return peRequest.delete<IDataType>({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return peRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return peRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
