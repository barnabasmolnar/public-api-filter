import React, { useState, useEffect, useReducer } from "react";
import * as R from "ramda";
import api from "./api.json";
import Group from "./Group";
import Filter from "./Filter";
import Search from "./Search";

const { groupBy, keys, values, any, includes, toLower, identity } = R;

export const {
  categories,
  rows,
  options: { auth, https },
} = api;

export interface FilterMap {
  [k: string]: boolean;
}

const makeFilterMap = (xs: string[]) =>
  xs.reduce((a: FilterMap, b: string) => {
    a[b] = false;
    return a;
  }, {});

export const defaultCsMap = makeFilterMap(categories);
export const defaultAuthMap = makeFilterMap(auth);
export const defaultHttpsMap = makeFilterMap(https);

const caseInsensitiveIncludes = (target: string, src: string) =>
  includes(toLower(target), toLower(src));

export interface RowItem {
  category: string;
  title: string;
  url: string;
  description: string;
  auth: string;
  https: string;
  cors: string;
}
const renderFiltered = (xs: RowItem[]) => {
  const grouped = groupBy(({ category }) => category, xs);
  const groupKs = keys(grouped);

  return groupKs.map(k => <Group key={k} groupKey={k} group={grouped} />);
};

const filterCheckboxMap = (m: FilterMap, v: string) => {
  const allFalse = !any(identity, values(m));
  return allFalse || m[v];
};

export interface ReducerState {
  csMap: FilterMap;
  authMap: FilterMap;
  httpsMap: FilterMap;
  searchTerm: string;
}

const initialState = {
  csMap: defaultCsMap,
  authMap: defaultAuthMap,
  httpsMap: defaultHttpsMap,
  searchTerm: "",
};

export type SetMapAction = "SET_CS_MAP" | "SET_AUTH_MAP" | "SET_HTTPS_MAP";
export type ActionType =
  | { type: SetMapAction; payload: FilterMap }
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "CLEAR_ALL" };

const reducer = (state: ReducerState, action: ActionType) => {
  switch (action.type) {
    case "SET_CS_MAP":
      return { ...state, csMap: action.payload };
    case "SET_AUTH_MAP":
      return { ...state, authMap: action.payload };
    case "SET_HTTPS_MAP":
      return { ...state, httpsMap: action.payload };
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "CLEAR_ALL":
      return initialState;
  }
};

const App = (): JSX.Element => {
  const [filtered, setFiltered] = useState(rows);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const xs = rows.filter(
      ({ category, title, auth: authOpt, https: httpsOpt }) =>
        filterCheckboxMap(state.csMap, category) &&
        filterCheckboxMap(state.authMap, authOpt) &&
        filterCheckboxMap(state.httpsMap, httpsOpt) &&
        caseInsensitiveIncludes(state.searchTerm, title)
    );

    setFiltered(xs);
  }, [state]);

  return (
    <div className="flex flex-col h-screen">
      <div className="w-full py-4 pl-4 bg-purple-600">
        <h1 className="font-bold text-white">API Filter</h1>
      </div>
      <div className="flex justify-center w-full py-4 pl-4 bg-purple-200 shadow isolate ">
        <Search dispatch={dispatch} state={state} />
      </div>
      <div className="grid h-full grid-cols-4">
        <div className="col-span-1 border-r border-purple-100 divide-y divide-purple-100">
          <Filter dispatch={dispatch} state={state} />
        </div>
        <div className="h-full col-span-3 bg-opacity-40 bg-purple-50">
          <div className="px-4 my-4 space-y-12">{renderFiltered(filtered)}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
