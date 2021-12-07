import React from "react";
import { FilterMap } from "./App";

interface CheckboxMapProps {
  options: string[];
  m: FilterMap;
  setter: React.Dispatch<React.SetStateAction<FilterMap>>;
}

const CheckboxMap = ({ options, m, setter }: CheckboxMapProps): JSX.Element => (
  <ul className="space-y-4">
    {options.map(v => (
      <li key={v}>
        <label className="inline-flex items-center text-sm">
          <input
            className="text-purple-600 border-gray-300 rounded shadow-sm focus:border-purple-300 focus:ring focus:ring-offset-0 focus:ring-purple-200 focus:ring-opacity-50"
            type="checkbox"
            value={v}
            checked={m[v]}
            onChange={() => setter({ ...m, [v]: !m[v] })}
          />
          <span className="ml-2">{v}</span>
        </label>
      </li>
    ))}
  </ul>
);

export default CheckboxMap;
