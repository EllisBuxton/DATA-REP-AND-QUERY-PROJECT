import { createContext, useReducer } from 'react'

export const MealsContext = createContext()

export const mealsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MEALS':
      return { 
        meals: action.payload 
      }
    case 'CREATE_MEAL':
      return { 
        meals: [action.payload, ...state.meals] 
      }
    default:
      return state
  }
}

export const MealsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mealsReducer, { 
    meals: null
  })
  
  return (
    <MealsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </MealsContext.Provider>
  )
}