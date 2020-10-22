'use strict'


import { ApiInterface } from 'common/interfaces';
import { accountApi } from './account';
import { myselfApi } from './myself';


export const userApi: ApiInterface[] = [
    ...accountApi,
    ...myselfApi,
]
