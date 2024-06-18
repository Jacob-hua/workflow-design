import { ISchema } from '@formily/react'

export const Abnormal: ISchema = {
  type: 'object',
  properties: {
    defaultid: {
      type: 'boolean',
      title: '数据id',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      // 'x-visible': false,"x-pattern": "disabled",
      'x-pattern': 'disabled',
      'x-value': Math.random().toString(16).substring(3, 30),
    },
  },
}
