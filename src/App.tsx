import React, { useState, useEffect } from "react";
import * as R from "ramda";
import api from "./api.json";

const { groupBy, keys, values, any, includes, toLower, identity } = R;

const {
  categories,
  rows,
  options: { auth, https },
} = api;

interface FilterMap {
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

interface RowItem {
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

  return groupKs.map(k => (
    <div key={k}>
      <h1>{k}</h1>
      <ul className="ml-4">
        {grouped[k].map(({ title, url }) => (
          <li key={url}>{title}</li>
        ))}
      </ul>
    </div>
  ));
};

const renderCheckboxMap = (
  options: string[],
  m: FilterMap,
  setter: React.Dispatch<React.SetStateAction<FilterMap>>
) => (
  <ul>
    {options.map(v => (
      <li key={v}>
        <label>
          <input
            type="checkbox"
            value={v}
            checked={m[v]}
            onChange={() => setter({ ...m, [v]: !m[v] })}
          />
          {v}
        </label>
      </li>
    ))}
  </ul>
);

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
    <div>
      <button
        type="button"
        onClick={() => {
          setCsMap(defaultCsMap);
          setAuthMap(defaultAuthMap);
          setHttpsMap(defaultHttpsMap);
          setSearchTerm("");
        }}
      >
        clear all
      </button>
      <div>
        <input
          className="border"
          type="search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-3 my-12">
        {renderCheckboxMap(auth, authMap, setAuthMap)}
        {renderCheckboxMap(https, httpsMap, setHttpsMap)}
        {renderCheckboxMap(categories, csMap, setCsMap)}
      </div>
      <div className="bg-gray-200">{renderFiltered(filtered)}</div>
    </div>
  );
};

export default App;
