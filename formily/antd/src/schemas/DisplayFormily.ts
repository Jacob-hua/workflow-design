import { ISchema } from '@formily/react'

export const DisplayFormily: ISchema = {
  type: 'object',
  properties: {
    isShowInsCode: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}
