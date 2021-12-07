import React from "react";
import { RowItem } from "./App";

interface Group {
  groupKey: string;
  group: Record<string, RowItem[]>;
}

const Group = ({ groupKey, group }: Group): JSX.Element => (
  <div>
    <h1 className="font-bold">{groupKey}</h1>
    <ul className="divide-y">
      {group[groupKey].map(({ title, url, description }) => (
        <li key={url} className="py-4">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <p className="text-gray-900">{title}</p>
            <p className="text-gray-500">{description}</p>
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default Group;
