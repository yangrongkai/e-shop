'use strict'

import moment from 'moment';
import { BaseField } from './baseField';


export class DatetimeField extends BaseField{

    format(value: any): string{
        return value.format("YYYY-MM-DD hh:mm:ss")
    }

    parse(value: any): any{
        return moment(value, 'YYYY-MM-DD hh:mm:ss')
    }

    getDiscription(){
        return "datetime field"
    }

}
