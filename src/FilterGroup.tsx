import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

interface FilterGroupProps {
  groupName: string;
  selectedCount: number;
  children?: React.ReactNode;
}

const FilterGroup = ({
  groupName,
  selectedCount,
  children,
}: FilterGroupProps): JSX.Element => {
  const hasAtLeastOneSelectedItem = selectedCount > 0;

  return (
    <div>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-6 text-sm font-medium text-left focus:outline-none focus-visible:text-purple-700 focus-visible:underline">
              <span
                className={`${
                  hasAtLeastOneSelectedItem ? "text-purple-700" : ""
                }`}
              >
                {groupName}{" "}
                {hasAtLeastOneSelectedItem && <span>({selectedCount})</span>}
              </span>
              <ChevronUpIcon
                className={`${
                  open ? "transform rotate-180" : ""
                } w-5 h-5 text-purple-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pb-6 text-gray-500">
              {children}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default FilterGroup;
