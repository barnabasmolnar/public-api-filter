import React from "react";
import { XCircleIcon } from "@heroicons/react/outline";
import {
  ActionType,
  ReducerState,
  categories,
  auth,
  https,
  FilterMap,
} from "./App";
import CheckboxMap from "./CheckboxMap";
import FilterGroup from "./FilterGroup";
import * as R from "ramda";

interface FilterProps {
  dispatch: React.Dispatch<ActionType>;
  state: ReducerState;
}

const { values, filter, length, compose } = R;

const countSelected = compose<FilterMap, boolean[], boolean[], number>(
  length,
  filter((el: boolean) => el),
  values
);

const Filter = ({ dispatch, state }: FilterProps): JSX.Element => {
  const csCount = countSelected(state.csMap);
  const authCount = countSelected(state.authMap);
  const httpCount = countSelected(state.httpsMap);

  return (
    <>
      <button
        className="flex items-center p-4 ml-auto text-xs text-purple-700"
        type="button"
        onClick={() => {
          dispatch({ type: "CLEAR_ALL" });
        }}
      >
        <XCircleIcon className="w-4 h-4 mr-1 text-current" aria-hidden="true" />
        Clear all filters
      </button>
      <FilterGroup groupName="Categories" selectedCount={csCount}>
        <CheckboxMap
          options={categories}
          m={state.csMap}
          dispatch={dispatch}
          setAction="SET_CS_MAP"
        />
      </FilterGroup>
      <FilterGroup groupName="Auth" selectedCount={authCount}>
        <CheckboxMap
          options={auth}
          m={state.authMap}
          dispatch={dispatch}
          setAction="SET_AUTH_MAP"
        />
      </FilterGroup>
      <FilterGroup groupName="HTTPS" selectedCount={httpCount}>
        <CheckboxMap
          options={https}
          m={state.httpsMap}
          dispatch={dispatch}
          setAction="SET_HTTPS_MAP"
        />
      </FilterGroup>
    </>
  );
};

export default Filter;
