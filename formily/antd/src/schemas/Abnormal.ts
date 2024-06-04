import { ISchema } from '@formily/react'

export const Abnormal: ISchema = {
  type: 'object',
  properties: {
    test: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
}
