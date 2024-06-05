import React from 'react'
import { Checkbox as FormilyCheckbox } from '@formily/antd'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { FieldSchemas } from '../../fieldSchemas'

export const Checkbox: DnFC<
  React.ComponentProps<typeof FormilyCheckbox.Group>
> = FormilyCheckbox.Group

Checkbox.Behavior = createBehavior({
  name: 'Checkbox',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Checkbox',
  designerProps: {
    propsSchema: createFieldSchema(
      AllSchemas.Checkbox.Group,
      FieldSchemas.Checkbox
    ),
  },
  designerLocales: AllLocales.CheckboxGroup,
})

Checkbox.Resource = createResource({
  icon: 'CheckboxGroupSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'Array<string | number>',
        title: '复选',
        'x-decorator': 'FormItem',
        'x-component': 'Checkbox',
        enum: [
          { label: '选项1', value: 1 },
          { label: '选项2', value: 2 },
        ],
      },
    },
  ],
})
