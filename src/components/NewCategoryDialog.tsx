import React from "react";
import { Transition, Dialog } from "@headlessui/react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";

type NewCategoryDialogProps = {
  isOpen: boolean;
  addCategory: (name: string) => void;
};

export function NewCategoryDialog(props: NewCategoryDialogProps) {
  const [categoryName, setCategoryName] = React.useState("");

  return (
    <Transition appear show={props.isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => props.addCategory(categoryName)}
      >
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white/50 backdrop-blur" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full relative max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl border border-gray-300 transition-all">
                <XMarkIcon
                  onClick={() => props.addCategory(categoryName)}
                  className="cursor-pointer w-5 h-5 absolute inline right-2 top-2 text-blue-400"
                />

                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add new category
                </Dialog.Title>

                <form className="mt-4">
                  <input
                    type="text"
                    className="input border border-gray-300 focus:border-gray-300 text-sm py-3"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Name"
                  />
                  {categoryName.length > 3 && (
                    <button
                      className="button mt-4 table m-auto space-x-2"
                      onClick={() => {
                        props.addCategory(categoryName);
                        setCategoryName("");
                      }}
                    >
                      <span>add</span>
                      <PlusIcon className="w-4 h-4 inline" />
                    </button>
                  )}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
