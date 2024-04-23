import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./customTextEditor.css";
import "quill-mention";

var Font = Quill.import("formats/font");
// We do not add Aref Ruqaa since it is the default
Font.whitelist = ["arial", "roboto", "raleway", "montserrat", "lato", "rubik"];
Quill.register(Font, true);

var Size = Quill.import("formats/size");
Size.whitelist = [
  "9px",
  "10px",
  "11px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "22px",
  "24px",
  "26px",
  "28px",
];
Quill.register(Size, true);

const Parchment = Quill.import("parchment");
const boxAttributor = new Parchment.Attributor.Class("box", "line", {
  scope: Parchment.Scope.INLINE,
  whitelist: ["solid", "double", "dotted"],
});
Quill.register(boxAttributor);

const atValues = [
  { id: 0, value: "barcode" },
  { id: 1, value: "customername" },
  { id: 2, value: "licensenumber" },
  { id: 3, value: "netweight" },
  { id: 4, value: "packageid" },
  { id: 5, value: "price" },
  { id: 6, value: "productname" },
  { id: 7, value: "supplierid" },
];

const CustomToolbar = () => (
  <div id="toolbar">
    <button className="ql-bold" />
    <button className="ql-underline" />
    <select className="ql-font">
      {Font.whitelist.map((font, index) => (
        <option value={font} selected={!index} key={index}>
          {font[0].toUpperCase() + font.substr(1)}
        </option>
      ))}
    </select>
    <select className="ql-size">
      {Size.whitelist.map((size, index) => (
        <option value={size} selected={size.includes("12")} key={index}>
          {size}
        </option>
      ))}
    </select>
    <button className="ql-align" value="" />
    <button className="ql-align" value="center" />
    <button className="ql-align" value="right" />
  </div>
);

CustomTextEditor.modules = {
  toolbar: {
    container: "#toolbar",
  },
  mention: {
    allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
    mentionDenotationChars: ["@", "#"],
    source: function (searchTerm, renderList, mentionChar) {
      if (searchTerm.length === 0) {
        renderList(atValues, searchTerm);
      } else {
        const matches = [];
        for (let i = 0; i < atValues.length; i++)
          if (
            ~atValues[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
          )
            matches.push(atValues[i]);
        renderList(matches, searchTerm);
      }
    },
  },
};

CustomTextEditor.formats = [
  "bold",
  "underline",
  "font",
  "size",
  "align",
  "mention",
];

export default function CustomTextEditor({ placeholder, value, setValue }) {
  return (
    <div className="h-full">
      <CustomToolbar />
      <ReactQuill
        placeholder={placeholder}
        theme="snow"
        modules={CustomTextEditor.modules}
        formats={CustomTextEditor.formats}
        value={value}
        onChange={setValue}
        style={{ height: "calc(90vh)", overflowY: "auto" }}
      />
    </div>
  );
}
