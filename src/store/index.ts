import { Action, combineReducers, createStore } from '@reduxjs/toolkit'
import { ItemProps } from '../components/atoms/Item'
import { StepProps } from '../components/molecules/Step'

type State = {
  items: ItemProps[];
  steps: StepProps[];
  selectionByScroll: boolean;
}

const initialState: State = {
  items: [],
  steps: [],
  selectionByScroll: true
};

interface ItemsAction extends Action {
  payload: ItemProps;
}

export function itemsReducer(itemsState = initialState.items, action: ItemsAction) {
  if (!action.payload) return itemsState

  switch (action.type) {
    case 'items/add':
      return [...itemsState, action.payload]
    case 'items/remove':
      const itemIndex = itemsState.findIndex(item =>
        item.name === action.payload.name && item.category === action.payload.category)
      return itemIndex < 0
        ? itemsState
        : [...itemsState.slice(0, itemIndex), ...itemsState.slice(itemIndex + 1, itemsState.length)]
    default:
      return itemsState
  }
}

interface StepAction extends Action {
  payload: StepProps
}

export function stepsReducer(stepsState = initialState.steps, action: StepAction) {
  if (!action.type) return stepsState

  switch (action.type) {
    case 'steps/set-all':
      return action.payload
    case 'steps/set-enabled-all':
      const payload = action.payload as any
      return stepsState.map(step => {
        const payloadIndex = payload?.indexOf(step.title) || -1
        return {...step, isEnabled: payloadIndex > -1}
      })
    case 'steps/set-active':
      const payloadType = typeof action.payload
      if (payloadType === 'undefined') return stepsState
      const stepTitle = payloadType === 'string' ? action.payload : action.payload.title
      return stepsState.map(step => ({...step, isActive: step.title === stepTitle}))
    default:
      return stepsState
  }
}

export function scrollSelectionReducer(scrollLockState = initialState.selectionByScroll, action: Action) {
  switch (action.type) {
    case 'scroll-selection/lock':
      return false
    case 'scroll-selection/unlock':
      return true
    default:
      return scrollLockState
  }
}

const rootReducer = combineReducers(({
    items: itemsReducer,
    steps: stepsReducer,
    selectionByScroll: scrollSelectionReducer,
  }
))

const store = createStore(rootReducer)

export default store;
export type RootState = ReturnType<typeof store.getState>

