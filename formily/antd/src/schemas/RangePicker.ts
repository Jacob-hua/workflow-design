import { ISchema } from "@formily/react";

export const RangePicker: ISchema = {
  type: 'object',
  properties: {
    picker: {
      type: 'string',
      enum: ['time', 'date', 'date_time'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      // 'x-component-props': {
      //   defaultValue: 'date',
      // },
      default: 'date',
    },
    precision: {
      type: 'string',
      enum: ['HH', 'HH:mm', 'HH:mm:ss'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      default: 'HH:mm',
      'x-reactions': {
        dependencies: ['.picker'],
        fulfill: {
          state: {
            visible: '{{$deps[0] === "time"}}'
          }
        }
      }
    },
    showTime: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      "x-component": 'Switch',
      'x-visible': false,
      default: false,
      'x-reactions': {
        dependencies: ['.picker'],
        fulfill: {
          state: {
            value: '{{$deps[0] !== "date"}}'
          }
        }
      }
    },
    allowClear: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true,
      },
    },
    // showNow: {
    //   type: 'boolean',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Switch',
    // },
    // showTime: {
    //   type: 'boolean',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Switch',
    // },
    // showToday: {
    //   type: 'boolean',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Switch',
    // },
  },
}