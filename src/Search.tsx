import React from "react";
import { SearchIcon } from "@heroicons/react/solid";
import { ActionType, ReducerState } from "./App";

interface SearchProps {
  dispatch: React.Dispatch<ActionType>;
  state: ReducerState;
}

const Search = ({ dispatch, state }: SearchProps): JSX.Element => (
  <div className="relative mt-1 rounded-md shadow-sm">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <SearchIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
    </div>
    <input
      className="block w-full pl-10 placeholder-gray-400 border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
      type="search"
      value={state.searchTerm}
      placeholder="Super Duper API"
      onChange={e =>
        dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value })
      }
    />
  </div>
);

export default Search;
