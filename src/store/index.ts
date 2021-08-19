import { Action, combineReducers, createStore, Reducer } from '@reduxjs/toolkit'
import { ItemProps } from '../components/atoms/Item'
import { StepProps } from '../components/molecules/Step'

type State = {
  items: ItemProps[];
  steps: StepProps[];
  selectionByScroll: boolean;
  configurator: {
    isLoaded: boolean;
    showIntroModal: boolean;
    isReset: boolean;
  }
}

const initialState: State = {
  items: [],
  steps: [],
  selectionByScroll: true,
  configurator: {
    isLoaded: false,
    showIntroModal: !(localStorage.getItem('showIntro') && localStorage.getItem('showIntro') === "false") || false,
    isReset: false
  }
};

interface ItemsAction extends Action {
  payload: ItemProps;
}

export function itemsReducer(itemsState = initialState.items, action: ItemsAction) {
  if (!action.payload) return itemsState

  const itemIndex = itemsState.findIndex(item =>
    item.name === action.payload.name && item.category === action.payload.category)

  switch (action.type) {
    case 'items/add':
      return itemIndex < 0
        ? [...itemsState, action.payload]
        : itemsState
    case 'items/remove':
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
  const payloadType = typeof action.payload
  const stepTitle = payloadType === 'string' ? action.payload : action.payload?.title || ''

  switch (action.type) {
    case 'steps/set-all':
      return action.payload
    case 'steps/set-enabled':
      if (payloadType === 'undefined') return stepsState
      return stepsState.map(step => ({...step, isEnabled: step.title === stepTitle ? true : step.isEnabled }))
    case 'steps/set-enabled-all':
      const payload = action.payload as any
      return stepsState.map(step => {
        const payloadIndex = payload?.indexOf(step.title) || -1
        return {...step, isEnabled: payloadIndex > -1}
      })
    case 'steps/set-active':
      if (payloadType === 'undefined') return stepsState
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

export function configuratorStateReducer(configuratorState = initialState.configurator, action: Action) {
  switch (action.type) {
    case 'configurator/set-loaded':
      return { ...configuratorState, isLoaded: true }
    case 'configurator/show-intro-modal':
      localStorage.setItem('showIntro', 'true')
      return { ...configuratorState, showIntroModal: true }
    case 'configurator/hide-intro-modal':
      localStorage.setItem('showIntro', 'false')
      return { ...configuratorState, showIntroModal: false }
    default:
      return configuratorState
  }
}

const appReducer = combineReducers({
    items: itemsReducer,
    steps: stepsReducer,
    selectionByScroll: scrollSelectionReducer,
    configurator: configuratorStateReducer,
  }
)

const rootReducer: Reducer = (state: RootState, action: Action) => {
  if (action.type === 'configurator/reset') {
    const { steps, configurator } = state
    state = {
      steps: steps.map((step: any, index: number) => ({ ...step, isActive: index === 0, isEnabled: index === 0})),
      configurator: {
        ...configurator,
        isReset: true
      }
    }
  } else if (state?.configurator?.isReset) {
    state = {
      ...state,
      configurator: {
        ...state.configurator,
        isReset: false
      }
    }
  }
  return appReducer(state, action);

};
export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
}

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

const persistedState = loadState()
const store = createStore(rootReducer, persistedState)

export default store;
export type RootState = ReturnType<typeof store.getState>

store.subscribe(() => {
  saveState({
    items: store.getState().items,
    steps: store.getState().steps,
  });
})

