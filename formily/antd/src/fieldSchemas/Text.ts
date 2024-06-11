import { ISchema } from '@formily/react'
import {
  ReactionsSetter,
  // ValidatorSetter,
} from '@designable/formily-setters'

export const Text: ISchema = {
  type: 'void',
  'x-component': 'CollapseItem',
  properties: {
    // title: {
    //   type: 'string',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Input',
    // },
    'x-display': {
      type: 'string',
      enum: ['visible', 'hidden'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'visible',
      },
    },
    textContent: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'default': '文本标题',
      'x-reactions': {
        dependencies: ['*.content'],
        fulfill: {
          state: {
            value: '{{$deps[0]}}'
          }
        }
      }
    },
    // 'x-pattern': {
    //   type: 'string',
    //   enum: ['editable', 'disabled'],
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Select',
    //   'x-component-props': {
    //     defaultValue: 'editable',
    //   },
    // },
    // default: {
    //   type: 'string',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'ValueInput','x-component-props': {
    //     include: ['TEXT'],
    //   },
    // },
    // placeholder: {
    //   type: 'string',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Input',
    // },
    // enum: {
    //   'x-decorator': 'FormItem',
    //   'x-component': DataSourceSetter,
    // },
    'x-reactions': {
      'x-decorator': 'FormItem',
      'x-component': ReactionsSetter,
    },
    // 'x-validator': {
    //   type: 'array',
    //   'x-component': ValidatorSetter,
    // },
    // required: {
    //   type: 'boolean',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Switch',
    // },
  },
}
