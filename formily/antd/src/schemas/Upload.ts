import { ISchema } from '@formily/react'

export const Upload: ISchema & { Dragger?: ISchema } = {
  type: 'object',
  properties: {
    textContent: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    accept: {
      type: 'string',
      name: 'accept',
      enum: ['.pdf, .doc, .docx, .xls, .xlsx', '.jpeg, .jpg, .png, .svg, .gif', '.mp3', '.mp4'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      "x-component-props": {
        mode: 'multiple'
      },
    },
    // action: {
    //   'x-decorator': 'FormItem',
    //   'x-component': 'ValueInput',
    //   'x-component-props': {
    //     include: ['TEXT'],
    //   },
    // },
    name: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        defaultValue: 'fileName',
      },
    },
    maxCount: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        stpe: 1,
        precision: 0
      }
    },
    // method: {
    //   enum: ['POST', 'PUT', 'GET'],
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Radio.Group',
    //   'x-component-props': {
    //     defaultValue: 'POST',
    //     optionType: 'button',
    //   },
    // },
    // data: {
    //   'x-decorator': 'FormItem',
    //   'x-component': 'ValueInput',
    //   'x-component-props': {
    //     include: ['EXPRESSION'],
    //   },
    // },
    // headers: {
    //   'x-decorator': 'FormItem',
    //   'x-component': 'ValueInput',
    //   'x-component-props': {
    //     include: ['EXPRESSION'],
    //   },
    // },

    // listType: {
    //   enum: ['text', 'picture', 'picture-card'],
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Radio.Group',
    //   'x-component-props': {
    //     defaultValue: 'text',
    //     optionType: 'button',
    //   },
    //   'x-reactions': {
    //     when: '{{$self.value == "text"}}',
    //     target: 'accept',
    //     fulfill: {
    //       state: {
    //         value: '.pdf, .doc, .docx, .xls, .xlsx'
    //       }
    //     },
    //     otherwise: {
    //       state: {
    //         value: '.png, .jpg, .jpeg, .gif'
    //       }
    //     }
    //   },
    // },
    // directory: {
    //   type: 'boolean',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Switch',
    // },
    multiple: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    // openFileDialogOnClick: {
    //   type: 'boolean',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Switch',
    //   'x-component-props': {
    //     defaultChecked: true,
    //   },
    // },
    // showUploadList: {
    //   type: 'boolean',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Switch',
    //   'x-component-props': {
    //     defaultChecked: true,
    //   },
    // },
    // withCredentials: {
    //   type: 'boolean',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Switch',
    // },
  },
}

// Upload.Dragger = Upload
