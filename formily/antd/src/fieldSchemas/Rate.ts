import { ISchema } from '@formily/react'
import {
  ReactionsSetter,
  // ValidatorSetter,
} from '@designable/formily-setters'

export const Rate: ISchema = {
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
    default: {
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        min: 0,
      },
      'x-reactions': {
        dependencies: ['*.count', '*.allowHalf'],
        fulfill: {
          schema: {
            'x-component-props': {
              max: '{{$deps[0]}}',
              step: '{{$deps[1] ? 0.5 : 1}}'
            }
          },
          state: {
            value: '{{!$deps[1] ? Math.floor($self.value) : $self.value}}'
          }
        }
      }
    },
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
    required: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}
