import React, { useState, useEffect } from "react";
import * as R from "ramda";
import { SearchIcon } from "@heroicons/react/solid";
import { XCircleIcon } from "@heroicons/react/outline";
import api from "./api.json";
import FilterGroup from "./FilterGroup";
import Group from "./Group";
import CheckboxMap from "./CheckboxMap";

const { groupBy, keys, values, any, includes, toLower, identity } = R;

const {
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

const defaultCsMap = makeFilterMap(categories);
const defaultAuthMap = makeFilterMap(auth);
const defaultHttpsMap = makeFilterMap(https);

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

const App = (): JSX.Element => {
  const [filtered, setFiltered] = useState(rows);
  const [csMap, setCsMap] = useState(defaultCsMap);
  const [authMap, setAuthMap] = useState(defaultAuthMap);
  const [httpsMap, setHttpsMap] = useState(defaultHttpsMap);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const xs = rows.filter(
      ({ category, title, auth: authOpt, https: httpsOpt }) =>
        filterCheckboxMap(csMap, category) &&
        filterCheckboxMap(authMap, authOpt) &&
        filterCheckboxMap(httpsMap, httpsOpt) &&
        caseInsensitiveIncludes(searchTerm, title)
    );

    setFiltered(xs);
  }, [csMap, searchTerm, authMap, httpsMap]);

  return (
    <div className="flex flex-col h-screen">
      <div className="w-full py-4 pl-4 bg-purple-600">
        <h1 className="font-bold text-white">API Filter</h1>
      </div>
      <div className="flex justify-center w-full py-4 pl-4 bg-purple-200 shadow isolate ">
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            className="block w-full pl-10 placeholder-gray-400 border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            type="search"
            value={searchTerm}
            placeholder="Super Duper API"
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="grid h-full grid-cols-4">
        <div className="col-span-1 border-r border-purple-100 divide-y divide-purple-100">
          <button
            className="flex items-center p-4 ml-auto text-xs text-purple-700"
            type="button"
            onClick={() => {
              setCsMap(defaultCsMap);
              setAuthMap(defaultAuthMap);
              setHttpsMap(defaultHttpsMap);
              setSearchTerm("");
            }}
          >
            <XCircleIcon
              className="w-4 h-4 mr-1 text-current"
              aria-hidden="true"
            />
            Clear all filters
          </button>
          <FilterGroup groupName="Categories">
            <CheckboxMap options={categories} m={csMap} setter={setCsMap} />
          </FilterGroup>
          <FilterGroup groupName="Auth">
            <CheckboxMap options={auth} m={authMap} setter={setAuthMap} />
          </FilterGroup>
          <FilterGroup groupName="HTTPS">
            <CheckboxMap options={https} m={httpsMap} setter={setHttpsMap} />
          </FilterGroup>
        </div>
        <div className="h-full col-span-3 bg-opacity-40 bg-purple-50">
          <div className="px-4 my-4 space-y-12">{renderFiltered(filtered)}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
