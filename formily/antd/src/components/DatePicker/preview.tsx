import React from 'react'
import { DatePicker as FormilyDatePicker } from '@formily/antd'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { FieldSchemas } from '../../fieldSchemas'

export const DatePicker: DnFC<React.ComponentProps<typeof FormilyDatePicker>> =
  FormilyDatePicker

DatePicker.Behavior = createBehavior(
  {
    name: 'DatePicker',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'DatePicker',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.DatePicker, FieldSchemas.DatePicker),
    },
    designerLocales: AllLocales.DatePicker,
  },
  // {
  //   name: 'DatePicker.RangePicker',
  //   extends: ['Field'],
  //   selector: (node) => node.props['x-component'] === 'DatePicker.RangePicker',
  //   designerProps: {
  //     propsSchema: createFieldSchema(AllSchemas.DatePicker.RangePicker),
  //   },
  //   designerLocales: AllLocales.DateRangePicker,
  // }
)

DatePicker.Resource = createResource(
  {
    icon: 'DatePickerSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '日期',
          'x-decorator': 'FormItem',
          'x-component': 'DatePicker',
        },
      },
    ],
  },
  // {
  //   icon: 'DateRangePickerSource',
  //   elements: [
  //     {
  //       componentName: 'Field',
  //       props: {
  //         type: 'string[]',
  //         title: '日期范围',
  //         'x-decorator': 'FormItem',
  //         'x-component': 'DatePicker.RangePicker',
  //       },
  //     },
  //   ],
  // }
)
