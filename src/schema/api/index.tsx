'use strict'


import { userApi } from './user';
import { fileUploadApi } from './file';


export const apiConfig = [
    ...userApi,
    ...fileUploadApi,
]
