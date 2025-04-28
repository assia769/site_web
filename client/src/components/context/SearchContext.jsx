import { createContext } from 'react';

export const SearchContext = createContext({
  searchTerm: '',
  searchType: 'title', // 'title' or 'discreption'
  setSearchTerm: () => {},
  setSearchType: () => {}
});