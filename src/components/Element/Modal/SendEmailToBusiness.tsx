import { useState } from "react";
import { TextEditor } from "../TextEditor";
import { useModalStore } from "@/stores/modal";
import { sendEmailToBusiness } from "@/features/businesses/api/businessActions";

export function SendEmailToBusiness() {
  const [value, setValue] = useState("");
  const [subject, setSubject] = useState("");
  const { data } = useModalStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  // const [preview, setPreview] = useState(false);

  //   console.log(value)

  const handleSendEmail = () => {
    const payload = {
      subject,
      message: value,
    };

    if (import.meta.env.VITE_ENV === "development") {
      // console.log("testing", payload);
      setLoading(false);
      setSuccess("Test: Sent Successfully!");
      return null;
    } else {
      sendEmailToBusiness(data.id, payload)
        .then((res) => {
          setLoading(false);
          if (res.success) {
            setSuccess(res?.message || "Sent Successfully!");
          } else {
            setSuccess("An error occured while sending email!");
          }
        })
        .catch((error) => setSuccess(error?.message));
    }
  };

  return (
    <>
      <div className="relative">
        <h3 className="mb-4 text-center text-sm font-semibold uppercase text-neutral-500">
          Send Email to Business
        </h3>

        {success ? (
          <>
            <p className="py-4 text-center font-semibold text-red-500">
              {success}
            </p>
          </>
        ) : loading ? (
          <p className="animate-pulse py-4 text-center text-sm font-semibold text-red-500">
            Please wait...
          </p>
        ) : (
          <div className="space-y-4 dark:text-neutral-200">
            <input
              type="text"
              className="h-12 w-full rounded-lg border px-4 font-semibold outline-none focus:border-primary"
              placeholder="Subject"
              value={subject}
              required
              onChange={(e) => setSubject(e.target.value)}
            />

            <div className="max-h-[320px] overflow-y-auto rounded-xl px-1 scrollbar-thin">
              <TextEditor value={value} setValue={setValue} />
            </div>

            <button
              type="submit"
              onClick={handleSendEmail}
              className="mt-4 min-h-10 w-full rounded-lg  bg-primary px-4 py-1 text-sm  font-semibold text-white transition duration-150 hover:scale-105"
            >
              {loading ? "Please wait..." : "Send Email"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
