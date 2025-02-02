import React from 'react'
import { Select as FormilySelect } from '@formily/antd'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { FieldSchemas } from '../../fieldSchemas'

export const Select: DnFC<React.ComponentProps<typeof FormilySelect>> =
  FormilySelect

Select.Behavior = createBehavior({
  name: 'Select',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Select',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.Select, FieldSchemas.Select),
  },
  designerLocales: AllLocales.Select,
})

Select.Resource = createResource({
  icon: 'SelectSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        title: '选择',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        enum: [
          { label: '选项1', value: '选项1' },
          { label: '选项2', value: '选项2' },
        ],
        'x-component-props': {
          mode: '',
          placeholder: '请选择',
          showSearch: false,
          listHeight: 256,
          notFoundContent: '空数据',
        },
      },
    },
  ],
})
