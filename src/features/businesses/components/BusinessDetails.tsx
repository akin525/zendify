import { currencyFormatter, dateTimeFormatter, formatNumber } from "@/utils";
// import { BusinessData } from "../types/businessData";

export const BusinessDetails = ({ data }) => {
  // console.log(data);
  return (
    <>
      <div className="space-y-8 pb-10 pt-2 dark:text-neutral-200">
        <InformationField name="Business Information">
          <div className="grid rounded-xl bg-white text-base dark:bg-neutral-700 dark:bg-neutral-800 ">
            <DetailsRow data={data?.business?.biz_url} name="URL" />
            <DetailsRow data={data?.business?.biz_email} name="Email" />
            <DetailsRow data={data?.business?.biz_phone} name="Phone" />
            <DetailsRow data={data?.business?.biz_country} name="Country" />
            <DetailsRow data={data?.business?.biz_state} name="State" />
            <DetailsRow data={data?.business?.biz_city} name="City" />
            <DetailsRow data={data?.business?.biz_address} name="Address" />
            <DetailsRow
              data={
                (data?.business?.industry_id &&
                  data?.business_industry &&
                  data?.business_industry[
                    Number(data?.business?.industry_id) - 1
                  ].name) ||
                null
              }
              name="Business Industry"
            />
          </div>
        </InformationField>

        <InformationField name="Merchant Information">
          <div className="grid rounded-xl bg-white text-base dark:bg-neutral-800 ">
            <DetailsRow
              data={data?.business?.merchant?.firstname}
              name="First Name"
            />
            <DetailsRow
              data={data?.business?.merchant?.lastname}
              name="Last Name"
            />
            <DetailsRow data={data?.business?.merchant?.phone} name="Phone" />
            <DetailsRow data={data?.business?.merchant?.email} name="Email" />
            <DetailsRow
              data={data?.business?.merchant?.ref_code}
              name="Referral Code"
            />
            <DetailsRow
              data={data?.business?.merchant?.referral}
              name="Referral"
            />
            <DetailsRow
              data={data?.business?.merchant?.biz_address}
              name="Address"
            />
            <DetailsRow
              data={
                (data?.business?.industry_id &&
                  data?.business_industry &&
                  data?.business_industry[
                    Number(data?.business?.industry_id) - 1
                  ].name) ||
                null
              }
              name="Business Industry"
            />
          </div>
        </InformationField>

        <InformationField name="Account Information">
          <div className="grid rounded-xl bg-white text-base dark:bg-neutral-800 ">
            <DetailsRow data={data?.business?.account} name="Account" />
            <DetailsRow
              data={data?.business?.acc_prefix}
              name="Account Prefix"
            />
            <DetailsRow
              data={data?.business?.profile_completed}
              name="Profile Completed"
            />
            <DetailsRow
              data={data?.business?.kyc_submitted}
              name="KYC Submitted"
            />
            <DetailsRow data={data?.business?.kyc_level} name="KYC Level " />
            <DetailsRow
              data={data?.business?.settlement_day}
              name="Settlement Day"
            />
            <DetailsRow
              data={data?.business?.settlement_type}
              name="Settlement Type"
            />
            <DetailsRow
              data={data?.business?.instant_settlement}
              name="Instant Settlement"
            />
          </div>
        </InformationField>

        <InformationField name="KYC Information">
          <div className="grid rounded-xl bg-white text-base dark:bg-neutral-800 ">
            <DetailsRow data={data?.business?.tin} name="TIN" />
            <DetailsRow data={data?.business?.rcNumber} name="RC Number" />
            <DetailsRow
              data={data?.business?.incorporationDate}
              name="Incoporation Date"
            />
            <DetailsRow data={data?.business?.d_bvn} name="BVN" />
            <DetailsRow data={data?.business?.id_means} name="ID Means " />
            <DetailsRow data={data?.business?.id_holder} name="ID Holder" />
            <DetailsRow data={data?.business?.id_number} name="ID Number" />
            <DetailsRow data={data?.business?.d_bvn2} name="BVN 2" />
            <DetailsRow data={data?.business?.id_means2} name="ID Means 2" />
            <DetailsRow data={data?.business?.id_number2} name="ID Number 2" />
            <DetailsRow data={data?.business?.id_holder2} name="ID Holder 2" />
          </div>
        </InformationField>

        {Array.isArray(data?.account) &&
          data?.account?.map((item, index) => (
            <InformationField name={`Account ${index + 1}`} key={index}>
              <div className="grid rounded-xl bg-white text-base dark:bg-neutral-800 ">
                <DetailsRow data={item?.account_name} name="Account Name" />
                <DetailsRow data={item?.account_number} name="Account Number" />
                <DetailsRow data={item?.bank_name} name="Bank Name" />
              </div>
            </InformationField>
          ))}

        {Array.isArray(data?.wallets) &&
          data?.wallets?.map((item, index) => (
            <InformationField name={`Wallet ${index + 1}`} key={index}>
              <div className="grid rounded-xl bg-white text-base dark:bg-neutral-800 ">
                <DetailsRow
                  data={item?.balance}
                  name="Balance"
                  type="currency"
                />
                <DetailsRow
                  data={item?.pending}
                  name="Pending Balance"
                  type="currency"
                />
                <DetailsRow data={item?.cashback} name="Cashback" />
                <DetailsRow data={item?.wallet_limit} name="Wallet Limit" />
              </div>
            </InformationField>
          ))}

        <FeeInformation data={data} />

        <InformationField name="Notification Information">
          <div className="grid rounded-xl bg-white text-base dark:bg-neutral-800 ">
            <DetailsRow
              data={data?.business?.email_alert}
              name="Email alert"
              type="bool"
            />

            <DetailsRow
              data={data?.business?.customer_email_alert}
              name="Customer email alert"
              type="bool"
            />
          </div>
        </InformationField>

        <InformationField name="Limits Information">
          <div className="grid rounded-xl bg-white text-base dark:bg-neutral-800 ">
            <DetailsRow
              data={data?.business?.payout_limit_per_trans}
              name="Payout Limit per Transaction"
              type="currency"
            />
            <DetailsRow
              data={data?.business?.daily_trans_limit}
              name="Daily Transactions Limit"
              type="currency"
            />
          </div>
        </InformationField>

        <InformationField name="Status Information">
          <div className="grid rounded-xl bg-white text-base dark:bg-neutral-800 ">
            <DetailsRow
              data={data?.business?.collection_status}
              name="Collection Status"
              type="bool"
            />
            <DetailsRow
              data={data?.business?.bills_status}
              name="Bills Status"
              type="bool"
            />
            <DetailsRow
              data={data?.business?.payout_status}
              name="Payout Status"
              type="bool"
            />
          </div>
        </InformationField>

        <InformationField name="Other Information">
          <div className="grid rounded-xl bg-white text-base dark:bg-neutral-800 ">
            <DetailsRow data={data?.business?.note} name="Note" />
            <DetailsRow
              data={data?.business?.created_at}
              name="CREATION DATE"
              type="date"
            />
            <DetailsRow
              data={data?.business?.updated_at}
              name="LAST UPDATE"
              type="date"
            />
          </div>
        </InformationField>
      </div>
    </>
  );
};

export const DetailsRow = ({
  data,
  name = "",
  type,
}: {
  data: string | number;
  name: string;
  type?: "number" | "currency" | "date" | "percent" | "bool" | null | undefined;
}) => {
  if (data) {
    // data = data === 1 ? "True" : data === 0 ? "False" : data;
    return (
      <div className="flex gap-2 text-wrap border-b px-6 py-2 dark:border-neutral-700">
        <p className="min-w-[100px] shrink-0">
          <strong className="text-xs uppercase text-neutral-600 dark:text-neutral-300">
            {name}:
          </strong>{" "}
        </p>
        <p className="font-semibold">
          {type === "date"
            ? dateTimeFormatter(String(data))
            : type === "number"
              ? formatNumber(Number(data))
              : type === "percent"
                ? `${formatNumber(Number(data))} %`
                : type === "currency"
                  ? currencyFormatter(Number(data))
                  : type === "bool"
                    ? Number(data) === 1
                      ? "True"
                      : "False"
                    : data}
        </p>{" "}
      </div>
    );
  }

  return null;
};

export const InformationField = ({ children, name }) => {
  return (
    <div className="space-y-2">
      <h1 className="text-base font-semibold text-neutral-600 dark:text-white ">
        {name}
      </h1>

      <div className="h-max w-full overflow-hidden rounded-xl bg-white dark:bg-neutral-800">
        {children}
      </div>
    </div>
  );
};

const FeeInformation = ({ data }) => {
  return (
    <div className="space-y-2">
      <h1 className="text-base font-semibold text-neutral-600 ">
        Fee Information
      </h1>

      <div className="grid rounded-xl bg-white text-base dark:bg-neutral-800 ">
        <DetailsRow
          data={data?.business?.collection_fee}
          name="Collection fee"
          type="currency"
        />
        <DetailsRow
          data={data?.business?.collection_cent}
          name="Collection cent"
          type="percent"
        />
        <DetailsRow
          data={data?.business?.collection_cent_cap}
          name="Collection cent cap"
          type="currency"
        />
        <DetailsRow
          data={data?.business?.checkout_fee_type}
          name="Checkout fee type"
        />
        <DetailsRow
          data={data?.business?.checkout_flat}
          name="Checkout flat"
          type="currency"
        />
        <DetailsRow
          data={data?.business?.checkout_cent}
          name="Checkout cent"
          type="percent"
        />
        <DetailsRow
          data={data?.business?.checkout_cent_cap}
          name="Checkout cent cap"
          type="currency"
        />
        <DetailsRow
          data={data?.business?.net_cent}
          name="net cent"
          type="percent"
        />
        <DetailsRow
          data={data?.business?.net_cent_cap}
          name="Net cent cap"
          type="currency"
        />
        <DetailsRow data={data?.business?.net_fee_type} name="Net fee type" />
        <DetailsRow
          data={data?.business?.net_flat_fee}
          name="Net Flat fee"
          type="currency"
          // type="percent"
        />
        <DetailsRow data={data?.business?.sh_fee_type} name="sh fee type" />
        <DetailsRow
          data={data?.business?.sh_flat_fee}
          name="sh flat fee"
          type="currency"
        />
        <DetailsRow
          data={data?.business?.sh_cent}
          name="sh cent"
          type="percent"
        />
        <DetailsRow
          data={data?.business?.sh_cent_cap}
          name="sh cent cap"
          type="percent"
        />
        <DetailsRow data={data?.business?.feeBearer} name="Fee bearer" />
        <DetailsRow
          data={data?.business?.payout_fee}
          name="payout fee"
          type="currency"
        />
        <DetailsRow
          data={data?.business?.split_payment_fee}
          name="split payment fee"
          type="currency"
        />
        <DetailsRow
          data={data?.business?.bvn_fee}
          name="bvn fee"
          type="currency"
        />
      </div>
    </div>
  );
};
