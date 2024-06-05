import { ISchema } from '@formily/react'

export const Text: ISchema = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-value': '文本标题',
    },
    mode: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'normal',
      },
      enum: ['h1', 'h2', 'h3', 'p', 'normal'],
    },
  },
}
