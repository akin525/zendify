import { More } from "iconsax-react";

export default function MoreActions({
  isOpen,
  toggleActions,
  //   toggleModal,
  id,
  actions,
}) {
  const handleActionClick = (id) => {
    toggleActions(id);
    // toggleModal(id, actionType);
  };

  return (
    <div>
      <div className="relative w-max">
        <More
          size="32"
          className="cursor-pointer text-primary"
          onClick={() => toggleActions(id)}
        />

        <div
          className={`absolute right-0 top-6 z-[1000] w-32 rounded-xl border bg-white p-2 ${isOpen ? "" : "hidden"}`}
        >
          <ul className="flex flex-col gap-3">
            {actions?.map((action, idx) => (
              <li
                key={idx}
                onClick={() => handleActionClick(action.actionType)}
                className={`cursor-pointer rounded-lg p-2 text-sm font-semibold ${!action?.crucial ? "text-neutral-600" : "text-red-500"} hover:bg-neutral-100`}
              >
                {action.name}
              </li>
            ))}
          </ul>

          {!actions && (
            <p className="h-full text-wrap p-2 text-xs font-semibold text-neutral-600">
              no action
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
