import { ISchema } from '@formily/react'

export const Select: ISchema = {
  type: 'object',
  properties: {
    mode: {
      type: 'string',
      enum: ['multiple', 'tags', ''],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: '',
        optionType: 'button',
      },
      'x-value': ''
    },
    placeholder: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-visible': false,
      'x-reactions': {
        dependencies: ['*.defaultholder'],
        fulfill: {
          state: {
            value: '{{$deps[0]}}'
          }
        }
      }
    },
    allowClear: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    // autoClearSearchValue: {
    //   type: 'boolean',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Switch',
    //   'x-component-props': {
    //     defaultChecked: true,
    //   },
    // },
    // dropdownMatchSelectWidth: {
    //   type: 'boolean',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Switch',
    //   'x-component-props': {
    //     defaultChecked: true,
    //   },
    // },
    // autoFocus: {
    //   type: 'boolean',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Switch',
    // },
    // bordered: {
    //   type: 'boolean',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Switch',
    //   'x-component-props': {
    //     defaultChecked: true,
    //   },
    // },
    // defaultActiveFirstOption: {
    //   type: 'boolean',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Switch',
    //   'x-component-props': {
    //     defaultChecked: true,
    //   },
    // },
    // defaultOpen: {
    //   type: 'boolean',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Switch',
    // },
    // labelInValue: {
    //   type: 'boolean',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Switch',
    // },
    showArrow: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultValue: true,
      },
    },
    showSearch: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'default': false
    },
    // virtual: {
    //   type: 'boolean',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Switch',
    //   'x-component-props': {
    //     defaultValue: true,
    //   },
    // },
    // filterOption: {
    //   type: 'boolean',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'ValueInput',
    //   'x-component-props': {
    //     include: ['BOOLEAN', 'EXPRESSION'],
    //   },
    // },
    // filterSort: {
    //   type: 'boolean',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'ValueInput',
    //   'x-component-props': {
    //     include: ['EXPRESSION'],
    //   },
    // },
    listHeight: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        defaultValue: 256,
      },
      'x-value': 256,
    },
    maxTagCount: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-reactions': {
        dependencies: ['.mode'],
        fulfill: {
          state: {
            visible: '{{$deps[0] !== ""}}'
          }
        }
      }
    },
    // maxTagPlaceholder: {
    //   type: 'string',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Input',
    // },
    // maxTagTextLength: {
    //   type: 'number',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'NumberPicker',
    // },
    notFoundContent: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        defaultValue: '空数据',
      },
      'x-value': '空数据',
    },

    // size: {
    //   type: 'string',
    //   enum: ['large', 'small', 'middle', null],
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Select',
    //   'x-component-props': {
    //     defaultValue: 'middle',
    //   },
    // },
  },
}
