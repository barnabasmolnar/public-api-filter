import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { ActionType, ReducerState } from "./App";
import Filter from "./Filter";

interface MobileFilterProps {
  dispatch: React.Dispatch<ActionType>;
  state: ReducerState;
}

const MobileFilter = ({ state, dispatch }: MobileFilterProps): JSX.Element => (
  <Transition show={state.isMobileFilterOpen}>
    <Dialog
      as="div"
      className="fixed inset-0 z-40 flex lg:hidden"
      onClose={() => dispatch({ type: "TOGGLE_MOBILE_FILTER", payload: false })}
    >
      <Transition.Child
        as={Fragment}
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
      </Transition.Child>
      <Transition.Child
        as={Fragment}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <div className="relative flex flex-col flex-1 w-full max-w-xs bg-white">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute top-0 right-0 pt-2 -mr-12">
              <button
                type="button"
                className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() =>
                  dispatch({ type: "TOGGLE_MOBILE_FILTER", payload: false })
                }
              >
                <span className="sr-only">Close sidebar</span>
                <XIcon className="w-6 h-6 text-white" aria-hidden="true" />
              </button>
            </div>
          </Transition.Child>
          <div className="overflow-y-auto divide-y divide-purple-100">
            <Filter dispatch={dispatch} state={state} />
          </div>
        </div>
      </Transition.Child>
    </Dialog>
  </Transition>
);

export default MobileFilter;
