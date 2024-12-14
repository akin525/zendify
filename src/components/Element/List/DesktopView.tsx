import { currencyFormatter } from "@/utils";
import { useModalStore } from "@/stores/modal";

export const DesktopListView = ({
  data,
  selectedKeys,
  action = "view-data",
  type = null,
}) => {
  const { openModal } = useModalStore();

  const showDataModal = (data) => {
    openModal({ action: action, type: type, data: data, id: data.id });
  };

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return (
    <>
      {data?.map((item, index) => (
        <tr
          key={index}
          title="click to view"
          onClick={() => showDataModal(item)}
        >
          {selectedKeys.map((key, index) => (
            <td key={index}>
              {key === "id" ? (
                <strong className="text-xs">#{item[key]}</strong>
              ) : key === "amount" || key === "totalAmount" || key === "balanceBefore" || key === "balanceAfter" ? (
                <strong>{currencyFormatter(item[key])}</strong>
              ) : key === "status" ? (
                <span
                  className={`
                    ${
                      item[key] === "success"
                        ? " text-emerald-500"
                        : item[key] === "pending"
                          ? " text-yellow-500"
                          : typeof item[key] === "number"
                            ? "text-inherit"
                            : " text-red-500"
                    } w-max rounded-full py-[2px] text-sm font-semibold
                  `}
                >
                  {item[key] == 1
                    ? "True"
                    : item[key] == 0
                      ? "False"
                      : item[key]}
                </span>
              ) : key === "type" ? (
                <span
                  className={`
                    ${
                      item[key] === "credit"
                        ? " text-emerald-500"
                        : item[key] === "debit"
                          ? " text-red-500"
                          : typeof item[key] === "number"
                            ? "text-inherit"
                            : " text-yellow-500"
                    } w-max rounded-full py-[2px] text-sm font-semibold
                  `}
                >
                  {item[key] == 1
                    ? "True"
                    : item[key] == 0
                      ? "False"
                      : item[key]}
                </span>
              ) : (
                item[key]
              )}
            </td>
          ))}
          {/* <td className="flex gap-4"> */}
          {/* <button
              className="rounded-full border border-primary px-3 py-1 font-semibold text-primary transition-all duration-300 ease-in-out hover:bg-primary hover:text-white"
              // onClick={() => toggleModal(values.id, viewAction)}
            >
              View More
            </button> */}

          {/* {!noMenu && (
              <MoreActions
                isOpen={isActionsOpen && selectedItemId === values.id}
                toggleActions={toggleActions}
                // toggleModal={toggleModal}
                id={item.id}
                actions={actions}
              />
            )} */}
          {/* </td> */}
        </tr>
      ))}
    </>
  );
};
