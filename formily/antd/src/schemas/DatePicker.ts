import { ISchema } from '@formily/react'

// const CommonDatePickerAPI = {
//   allowClear: {
//     type: 'boolean',
//     'x-decorator': 'FormItem',
//     'x-component': 'Switch',
//     'x-component-props': {
//       defaultChecked: true,
//     },
//   },
//   autoFocus: {
//     type: 'boolean',
//     'x-decorator': 'FormItem',
//     'x-component': 'Switch',
//   },
//   bordered: {
//     type: 'boolean',
//     'x-decorator': 'FormItem',
//     'x-component': 'Switch',
//     'x-component-props': {
//       defaultChecked: true,
//     },
//   },
//   disabledTime: {
//     'x-decorator': 'FormItem',
//     'x-component': 'ValueInput',
//     'x-component-props': {
//       include: ['EXPRESSION'],
//     },
//   },
//   disabledDate: {
//     'x-decorator': 'FormItem',
//     'x-component': 'ValueInput',
//     'x-component-props': {
//       include: ['EXPRESSION'],
//     },
//   },
//   inputReadOnly: {
//     type: 'boolean',
//     'x-decorator': 'FormItem',
//     'x-component': 'Switch',
//   },
//   placeholder: {
//     type: 'string',
//     'x-decorator': 'FormItem',
//     'x-component': 'Input',
//   },
//   size: {
//     type: 'string',
//     enum: ['large', 'small', 'middle', null],
//     'x-decorator': 'FormItem',
//     'x-component': 'Select',
//     'x-component-props': {
//       defaultValue: 'middle',
//     },
//   },
//   format: {
//     type: 'string',
//     'x-decorator': 'FormItem',
//     'x-component': 'Input',
//     'x-component-props': {
//       placeholder: 'YYYY-MM-DD',
//     },
//   // },
// }

export const DatePicker: ISchema = {
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

// DatePicker.RangePicker = {
//   type: 'object',
//   properties: {
//     picker: {
//       type: 'string',
//       enum: ['time', 'date'],
//       'x-decorator': 'FormItem',
//       'x-component': 'Select',
//       'x-component-props': {
//         defaultValue: 'date',
//       },
//     },
//     ...CommonDatePickerAPI,
//     showTime: {
//       type: 'boolean',
//       'x-decorator': 'FormItem',
//       'x-component': 'Switch',
//     },
//   },
// }
