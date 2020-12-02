import { Commit } from 'vuex';
import axios, { AxiosRequestConfig } from 'axios';
import { LOADING } from './modules/user/constant';

export interface ResponseType<P> {
  code: number,
  success: boolean,
  data: P,
}

export interface ListProps<P> {
  [_:string]: P,
}

export interface UserProps {
  id: string,
  name: string,
  age: string,
  worktime: string,
  phone: string,
  city: string,
  createTime: string,
}

export interface UserState {
  tableData: UserProps[],
  loading: boolean,
}

export const asyncAndCommit = async (url: string, mutationName: string, commit: Commit,
  config: AxiosRequestConfig = { method: 'get' }, extraData?: any) => {
  commit(LOADING, true);
  const { data } = await axios(url, config);
  commit(LOADING, false);
  if (extraData) {
    commit(mutationName, { data, extraData });
  } else {
    commit(mutationName, data);
  }
  return data;
};
