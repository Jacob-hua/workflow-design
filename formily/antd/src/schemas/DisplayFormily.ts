import { ISchema } from '@formily/react'

export const DisplayFormily: ISchema = {
  type: 'object',
  properties: {
    httpUrl: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
}
