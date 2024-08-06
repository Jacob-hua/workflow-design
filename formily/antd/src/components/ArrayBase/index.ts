import { createBehavior } from '@designable/core'
import { createFieldSchema, createVoidFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { FieldSchemas } from '../../fieldSchemas'
import { queryNodesByComponentPath } from '../../shared'

export const createArrayBehavior = (name: string) => {
  return createBehavior(
    {
      name,
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === name,
      designerProps(node) {
        return {
          droppable:
            queryNodesByComponentPath(node, [
              'ArrayCards',
              '*',
              (name) => name.indexOf('ArrayCards.') === -1,
            ]).length <= 0,
          propsSchema: createFieldSchema(
            AllSchemas[name],
            FieldSchemas.ArrayCards
          ),
        }
      },
      designerLocales: AllLocales[name],
    },
    {
      name: `${name}.Addition`,
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === `${name}.Addition`,
      designerProps: {
        // allowDrop(parent) {
        //   return parent.props['x-component'] === name
        // },
        // propsSchema: createVoidFieldSchema(AllSchemas[name].Addition),
        // deletable: false,
        cloneable: false,
        draggable: false,
      },
      designerLocales: AllLocales.ArrayAddition,
    },
    {
      name: `${name}.Remove`,
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === `${name}.Remove`,
      designerProps: {
        // allowDrop(parent) {
        //   return parent.props['x-component'] === name
        // },
        // propsSchema: createVoidFieldSchema(),
        // deletable: false,
        cloneable: false,
        draggable: false,
      },
      designerLocales: AllLocales.ArrayRemove,
    },
    {
      name: `${name}.Index`,
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === `${name}.Index`,
      designerProps: {
        // allowDrop(parent) {
        //   return parent.props['x-component'] === name
        // },
        // propsSchema: createVoidFieldSchema(),
        cloneable: false,
        draggable: false,
      },
      designerLocales: AllLocales.ArrayIndex,
    },
    {
      name: `${name}.MoveUp`,
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === `${name}.MoveUp`,
      designerProps: {
        // allowDrop(parent) {
        //   return parent.props['x-component'] === name
        // },
        // propsSchema: createVoidFieldSchema(),
        // deletable: false,
        cloneable: false,
        draggable: false,
      },
      designerLocales: AllLocales.ArrayMoveUp,
    },
    {
      name: `${name}.MoveDown`,
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === `${name}.MoveDown`,
      designerProps: {
        // allowDrop(parent) {
        //   return parent.props['x-component'] === 'ArrayCards'
        // },
        // propsSchema: createVoidFieldSchema(),
        // deletable: false,
        cloneable: false,
        draggable: false,
      },
      designerLocales: AllLocales.ArrayMoveDown,
    }
  )
}
