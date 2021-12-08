import React from "react";
import { FilterMap, SetMapAction, ActionType } from "./App";

interface CheckboxMapProps {
  options: string[];
  m: FilterMap;
  dispatch: React.Dispatch<ActionType>;
  setAction: SetMapAction;
}

const CheckboxMap = ({
  options,
  m,
  dispatch,
  setAction,
}: CheckboxMapProps): JSX.Element => (
  <ul className="space-y-4">
    {options.map(v => (
      <li key={v}>
        <label className="inline-flex items-center text-sm">
          <input
            className="text-purple-600 border-gray-300 rounded shadow-sm focus:border-purple-300 focus:ring focus:ring-offset-0 focus:ring-purple-200 focus:ring-opacity-50"
            type="checkbox"
            value={v}
            checked={m[v]}
            onChange={() =>
              dispatch({ type: setAction, payload: { ...m, [v]: !m[v] } })
            }
          />
          <span className="ml-2">{v}</span>
        </label>
      </li>
    ))}
  </ul>
);

export default CheckboxMap;
