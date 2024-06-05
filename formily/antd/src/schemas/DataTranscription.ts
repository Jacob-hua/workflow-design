import { ISchema } from '@formily/react'

export const DataTranscription: ISchema = {
  type: 'object',
  properties: {
    models: {
      'x-component': 'TreeItem',
      'x-decorator': 'FormItem',
      'x-validator': [],
      // "enum": getModelData(),
      'x-component-props': {},
    },
  },
}
