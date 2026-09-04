import React, {createContext, useContext} from 'react';

const RecipePlaygroundContext = createContext(null);

export function RecipePlaygroundProvider({value, children}) {
  return <RecipePlaygroundContext.Provider value={value}>{children}</RecipePlaygroundContext.Provider>;
}

export function useRecipePlayground() {
  return useContext(RecipePlaygroundContext);
}
