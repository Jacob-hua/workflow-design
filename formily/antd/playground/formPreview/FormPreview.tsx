import React, { useMemo } from 'react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Display } from '../../src/components/DisplayFormily'
import { Abnormal } from '../../src/components/Abnormal'
import { ChooseEq } from '../../src/components/ChooseEq'
import { CheckIn } from '../../src/components/CheckIn'
import { DataTranscription } from '../../src/components/DataTranscription'

import {
  FormItem,
  DatePicker,
  Checkbox,
  Cascader,
  Editable,
  Input,
  NumberPicker,
  Switch,
  Password,
  PreviewText,
  Radio,
  Reset,
  Select,
  Space,
  Submit,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  FormGrid,
  FormLayout,
  FormTab,
  FormCollapse,
  ArrayTable,
  ArrayCards,
  FormButtonGroup,
} from '@formily/antd'
import { Card, Slider, Rate } from 'antd'
import { TreeNode } from '@designable/core'
import { TestComp } from '../../src'
import { useLocation } from 'react-router-dom'

const Text: React.FC<{
  value?: string
  content?: string
  mode?: 'normal' | 'h1' | 'h2' | 'h3' | 'p'
}> = ({ value, mode, content, ...props }) => {
  const tagName = mode === 'normal' || !mode ? 'div' : mode
  return React.createElement(tagName, props, value || content)
}

const SchemaField = createSchemaField({
  components: {
    Space,
    FormGrid,
    FormLayout,
    FormTab,
    FormCollapse,
    ArrayTable,
    ArrayCards,
    FormItem,
    DatePicker,
    Checkbox,
    Cascader,
    Editable,
    Input,
    Text,
    NumberPicker,
    Switch,
    Password,
    PreviewText,
    Radio,
    Reset,
    Select,
    Submit,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
    Card,
    Slider,
    Rate,
    TestComp,
    Display,
    Abnormal,
    ChooseEq,
    CheckIn,
    DataTranscription,
  },
})

export interface IPreviewWidgetProps {
  tree: TreeNode
}

export const FormPreview = () => {
  const form = useMemo(() => createForm(), [])
  const location = useLocation()
  const { form: formProps, schema } =
    location.state ?? JSON.parse(localStorage.getItem('formily-schema') ?? '')
  const handleSubmit = () => {
    // eslint-disable-next-line no-console
    // console.log('a')
  }
  return (
    <FormProvider {...formProps} form={form}>
      <SchemaField schema={schema} />
      <FormButtonGroup>
        <Submit onSubmit={handleSubmit}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
