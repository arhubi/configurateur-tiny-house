import {Action, combineReducers, createStore} from "@reduxjs/toolkit"
import { ItemProps } from "../atoms/Item"
import { StepProps } from "../molecules/Step"

type State = {
    items: ItemProps[];
    steps: StepProps[];
}

const initialState: State = {
    items: [],
    steps: []
};

interface ItemsAction extends Action {
    payload: ItemProps
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
    if (!action.payload) return stepsState

    switch (action.type) {
        case 'steps/set-all':
            return action.payload
        case 'steps/set-enabled-all':
            const payload = action.payload as any
            return stepsState.map(step => {
                const payloadIndex = payload.indexOf(step.title)
                return payloadIndex > - 1
                    ? { ...step, isEnabled: true}
                    : { ...step, isEnabled: false}
            })
        case 'steps/set-active':
            const payloadType = typeof action.payload
            const stepTitle = payloadType === 'string' ? action.payload : action.payload.title
            return stepsState.map(step => ({ ...step, isActive: step.title === stepTitle }))
        default:
            return stepsState
    }
}

const rootReducer = combineReducers(({
        items: itemsReducer,
        steps: stepsReducer
    }
))

const store = createStore(rootReducer)

export default store;
export type RootState = ReturnType<typeof store.getState>

