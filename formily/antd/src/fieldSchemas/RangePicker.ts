import { ISchema } from '@formily/react'
import {
  ReactionsSetter,
  // DataSourceSetter,
  // ValidatorSetter,
} from '@designable/formily-setters'

export const RangePicker: ISchema = {
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
      'x-component': 'DatePicker.RangePicker',
      'x-reactions': {
        dependencies: ['*.picker', '*.precision'],
        fulfill: {
          schema: {
            'x-component-props': {
              showTime: '{{$deps[0] === "date" ? false : $deps[0] === "date_time" ? {format: "YYYY-MM-DD HH:mm"} : {format: $deps[1]}}}',
              picker: '{{$deps[0] === "time" ? "time" : "date"}}',
              format: '{{$deps[0] === "date" ? "YYYY-MM-DD" : $deps[0] === "date_time" ? "YYYY-MM-DD HH:mm" : $deps[1]}}'
            }
          },
          state: {
            value: '{{["",""]}}'
          }
        }
      }
    },
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
  }
}