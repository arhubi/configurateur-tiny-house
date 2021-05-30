import { Action, configureStore } from "@reduxjs/toolkit";
import { ItemProps } from "../atoms/Item";
import {StepProps} from "../molecules/Step";

type State = {
    items: ItemProps[];
    steps: StepProps[];
}

const initialState: State = {
    items: [],
    steps: [
        { title: "Remorque", required: true },
        { title: "Finition", required: true  },
        { title: "Chauffage" },
        { title: "Isolants" },
        { title: "Mobilier", multiple: true }
    ]
};

interface ItemsAction extends Action {
    payload: ItemProps
}

export function itemsReducer(state = initialState, action: ItemsAction) {
    if (!action.payload) return state

    switch (action.type) {
        case 'items/add':
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        case 'items/remove':
            const itemIndex = state.items.findIndex(item =>
                item.name === action.payload.name && item.category === action.payload.category)
            return itemIndex < 0 ? state : {
                ...state,
                items: [...state.items.slice(0, itemIndex), ...state.items.slice(itemIndex + 1, state.items.length)]
            }
        default:
            return state
    }
}

const store = configureStore<{ items: State; }, ItemsAction>({
    reducer: {
        items: itemsReducer,
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>

