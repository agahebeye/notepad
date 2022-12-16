import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/24/solid";
import { Listbox } from "@headlessui/react";
import { Category, Note } from "~/types";

type CategoryListProps = {
  items: Category[];
  value: string;
  onChange: (category: string) => void;
};

export function CategoryList(props: CategoryListProps) {
  return (
    <Listbox onChange={props.onChange}>
      <div className="relative mt-1 text-sm w-36">
        <Listbox.Button className="relative w-full text-gray-700 cursor-default rounded-lg py-2 pl-3 pr-10 text-left border-blue-400 border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">{props.value}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {props.items.map((category) => (
            <Listbox.Option
              key={category.id}
              className="relative text-sm cursor-default select-none py-2 pl-10 pr-4 ui-active:bg-blue-100 ui-active:text-blue-600 ui-not-active:text-gray-900 ui-disabled:text-gray-400"
              value={category.name}
              disabled={category.name === "No category"}
            >
              <span className="block truncate ui-selected:font-medium font-normal">
                {category.name}
              </span>
              <span className="hidden absolute inset-y-0 left-0 ui-selected:flex items-center pl-3 text-blue-400">
                <CheckIcon className="h-5 w-5" aria-hidden="true" />
              </span>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
