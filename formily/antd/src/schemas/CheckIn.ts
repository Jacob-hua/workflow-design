import { ISchema } from '@formily/react'

export const CheckIn: ISchema = {
  type: 'object',
  properties: {
    test123: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
}
