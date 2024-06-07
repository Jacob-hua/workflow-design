import { ISchema } from '@formily/react'
import {
  ReactionsSetter,
  // ValidatorSetter,
} from '@designable/formily-setters'

export const Slider: ISchema = {
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
      // 'x-component-props': {
      //   include: ['NUMBER'],
      // },
      'x-reactions': {
        dependencies: ['*.min', '*.max', '*.step'],
        fulfill: {
          schema: {
            'x-component-props': {
              min: '{{$deps[0]}}',
              max: '{{$deps[1]}}',
              step: '{{$deps[2]}}'
            }
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
