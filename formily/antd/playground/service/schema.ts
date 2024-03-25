import { Engine } from '@designable/core'
import {
  transformToSchema,
  transformToTreeNode,
} from '@designable/formily-transformer'
import { message } from 'antd'
import actions from './actions'

export const saveSchema = (designer: Engine) => {
  localStorage.setItem(
    'formVersionFile',
    JSON.stringify(transformToSchema(designer.getCurrentTree()))
  )
  // message.success('Save Success')
  actions.setGlobalState({tagInfo: 'save'})
}

export const publishSchema = (designer: Engine) => {
  localStorage.setItem(
    'formily-schema',
    JSON.stringify(transformToSchema(designer.getCurrentTree()))
  )
  message.success('Save Success')
}

export const cancle = () => {
  // localStorage.setItem(
  //   'formVersionFile',
  //   JSON.stringify(transformToSchema(designer.getCurrentTree()))
  // )
  // message.success('Save Success')
  actions.setGlobalState({tagInfo: 'cancle'})
}

export const loadInitialSchema = (designer: Engine) => {
  try {
    designer.setCurrentTree(
      transformToTreeNode(
        JSON.parse(localStorage.getItem('formVersionFile') ?? '')
      )
    )
  } catch {}
}
