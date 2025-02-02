import React from 'react'
import { Cascader as FormilyCascader } from '@formily/antd'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { FieldSchemas } from '../../fieldSchemas'

export const Cascader: DnFC<React.ComponentProps<typeof FormilyCascader>> =
  FormilyCascader

Cascader.Behavior = createBehavior({
  name: 'Cascader',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Cascader',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.Cascader, FieldSchemas.Cascader),
  },
  designerLocales: AllLocales.Cascader,
})

Cascader.Resource = createResource({
  icon: 'CascaderSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        title: '级联',
        'x-decorator': 'FormItem',
        'x-component': 'Cascader',
        'x-component-props': {
          allowClear: true,
          placeholder: '请选择',
        },
      },
    },
  ],
})
