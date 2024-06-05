import { ISchema } from '@formily/react'
import {
  ReactionsSetter,
  // ValidatorSetter,
  DataSourceSetter
} from '@designable/formily-setters'

export const Select: ISchema = {
  type: 'void',
  'x-component': 'CollapseItem',
  properties: {
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    'x-display': {
      type: 'string',
      enum: ['visible', 'hidden'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'visible',
      },
    },
    'x-pattern': {
      type: 'string',
      enum: ['editable', 'disabled'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'editable',
      },
    },
    // default: {
    //   'x-decorator': 'FormItem',
    //   'x-component': 'ValueInput','x-component-props': {
    //     include: ['TEXT','NUMBER','BOOLEAN'],
    //   },
    // },
    default: {
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-reactions': {
        dependencies: ['.enum', '*.mode'],
        fulfill: {
          state: {
            dataSource: '{{$deps[0]}}'
          },
          schema: {
            "x-component-props.mode": '{{$deps[1]}}'
          }
        }
      },
      // 'x-component-props': {
      //   mode: 'multiple'
      // }
    },
    defaultholder: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-value': '请选择'
    },
    enum: {
      'x-decorator': 'FormItem',
      'x-component': DataSourceSetter,
    },
    'x-reactions': {
      'x-decorator': 'FormItem',
      'x-component': ReactionsSetter,
    },
    // 'x-validator': {
    //   type: 'array',
    //   'x-component': ValidatorSetter,
    // },
    required: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  }
}