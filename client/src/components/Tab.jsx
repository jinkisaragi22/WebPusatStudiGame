import React from "react";

export default function Tab(props) {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => props.setPages("next")}
        className={`border bg-blue-400 hover:bg-green-500 rounded-md px-2 py-1 text-center font-semibold ${
          props.pages === "next" ? "bg-blue-500 font-semibold" : ""
        }`}
      >
        Next
      </button>
    </div>
  );
}
