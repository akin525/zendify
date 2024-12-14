import { useModalStore } from "@/stores/modal";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";

export function ManageBusinessDropdown({ data }) {
  const { openModal } = useModalStore();

  const handleApproveBusiness = () => {
    openModal({
      action: "approve-business",
      type: "business",
      id: data.id,
      data: data,
    });
  };
  const handleBlockOrUnblockBusiness = () => {
    openModal({
      action: "block-or-unblock-business",
      type: "business",
      id: data.id,
      data: data,
    });
  };
  const handleSendEmail = () => {
    openModal({
      action: "send-email-to-business",
      type: "business",
      id: data.id,
      data: data,
    });
  };
  // const handleRemoveUnusedAccounts = () => {
  //   openModal({
  //     action: "remove-unused-accounts",
  //     type: "business",
  //     id: data.id,
  //     data: data,
  //   });
  // };
  return (
    <div className="text-right ">
      <Menu as="div" className="relative z-[40] inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/80 ">
            Options
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="p-2 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-neutral-700"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm font-semibold`}
                    onClick={handleSendEmail}
                  >
                    Send Email
                  </button>
                )}
              </Menu.Item>
              {/* <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-neutral-700"
                    } group flex w-full items-center rounded-md px-2 py-2 text-left text-sm font-semibold`}
                    onClick={handleRemoveUnusedAccounts}
                  >
                    Remove Unused Accounts
                  </button>
                )}
              </Menu.Item> */}
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm font-semibold`}
                    onClick={handleApproveBusiness}
                  >
                    Approve / Activate
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-red-500 text-white" : "text-red-500 "
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm font-semibold`}
                    onClick={handleBlockOrUnblockBusiness}
                  >
                    Block / Unblock
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
