import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
// import { Suspense } from "react";
// import { useState } from "react";

// const modules = {
//   toolbar: [
//     // [{ font: [] }],
//     // [{ header: [1, 2, 3, 4, 5, 6, false] }],
//     ["bold", "italic", "underline", "strike"],
//     // [{ color: [] }, { background: [] }],
//     // [{ script: "sub" }, { script: "super" }],
//     // ["blockquote", "code-block"],
//     // [{ list: "ordered" }, { list: "bullet" }],
//     // [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
//     // ["link", "image", "video"],
//     ["clean"],
//   ],
// };

export function TextEditor({ value, setValue }) {
  return (
    <>
      <div className="rounded-lg bg-white p-1 dark:bg-neutral-700 dark:text-neutral-200">
        <ReactQuill
          // modules={modules}
          //   theme="bubble"
          theme="snow"
          placeholder="Start typing..."
          value={value}
          onChange={setValue}
          // required

          // className="text-lg"
        />
      </div>
    </>
  );
}
