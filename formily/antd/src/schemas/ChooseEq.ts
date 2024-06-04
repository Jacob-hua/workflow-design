import { ISchema } from '@formily/react'

export const ChooseEq: ISchema = {
  type: 'object',
  properties: {
    test: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
}
