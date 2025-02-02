import React from 'react'
import { Input as FormilyInput } from '@formily/antd'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { FieldSchemas } from '../../fieldSchemas'

export const Input: DnFC<React.ComponentProps<typeof FormilyInput>> =
  FormilyInput

Input.Behavior = createBehavior(
  {
    name: 'Input',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Input',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Input, FieldSchemas.Input),
    },
    designerLocales: AllLocales.Input,
  }
  // {
  //   name: 'Input.TextArea',
  //   extends: ['Field'],
  //   selector: (node) => node.props['x-component'] === 'Input.TextArea',
  //   designerProps: {
  //     propsSchema: createFieldSchema(AllSchemas.Input.TextArea,'Input.TextArea'),
  //   },
  //   designerLocales: AllLocales.TextArea,
  // }
)

Input.Resource = createResource(
  {
    icon: 'InputSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '输入框',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
      },
    ],
  }
  // {
  //   icon: 'TextAreaSource',
  //   elements: [
  //     {
  //       componentName: 'Field',
  //       props: {
  //         type: 'string',
  //         title: '多行输入',
  //         'x-decorator': 'FormItem',
  //         'x-component': 'Input.TextArea',
  //       },
  //     },
  //   ],
  // }
)
