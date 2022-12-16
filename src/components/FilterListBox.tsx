import { Listbox } from "@headlessui/react";
import { CheckIcon, FunnelIcon } from "@heroicons/react/24/solid";

type Filter = {
  key: string;
  value: string;
};

type FilterListBoxProps = {
  filtered: Filter;
  onChange: React.Dispatch<React.SetStateAction<Filter>>;
  items: Filter[];
};

export function FilterListBox(props: FilterListBoxProps) {
  return (
    <Listbox onChange={props.onChange} value={props.filtered} by="value">
      <div className="relative mt-1 text-sm w-36">
        <Listbox.Button className="relative w-full text-gray-700 cursor-default rounded-lg py-2 pl-3 pr-10 text-left text-sm">
          <span className="block truncate ml-4">{props.filtered.value}</span>
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pr-2">
            <FunnelIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {props.items.map((filter, idx) => (
            <Listbox.Option
              key={idx}
              className={`relative text-sm cursor-default select-none py-2.5 pl-10 pr-4 ${
                filter.value === "Categories"
                  ? ""
                  : "ui-active:bg-blue-100 ui-active:text-blue-600 ui-not-active:text-gray-900 ui-disabled:text-gray-400"
              }`}
              value={filter}
              disabled={filter.value === "Categories"}
            >
              <span
                className={`lock truncate ui-selected:font-medium font-normal ${
                  filter.value === "Categories" && "font-bold"
                }`}
              >
                {filter.value}
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
