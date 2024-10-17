import React from "react";

export default function CheckBoxes({
  isBoardAnnouncement,
  isAnnouncement,
  setIsAnnouncement,
  announcementTag,
  setAnnouncementTag,
  customTag,
  setCustomTag,
}) {
  // if board is not announcement board
  if (!isBoardAnnouncement) {
    return (
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={isAnnouncement}
          onChange={(e) => setIsAnnouncement(e.currentTarget.checked)}
        />
        <label className="ml-2" htmlFor="announcement">
          공지사항
        </label>
      </div>
    );
  }
  return <></>;

  // if board is announcement board
  // return different tag list with an extra custom tag input

  // NOTE: Disable tag
  // return (
  //   <div className="flex items-center gap-4">
  //     {getTagListForAnnouncement().map((tag) => (
  //       <div key={tag.type} className="flex items-center gap-1 ">
  //         <input
  //           value={tag.type}
  //           type="checkbox"
  //           checked={announcementTag === tag.type}
  //           onChange={(e) => {
  //             setAnnouncementTag(e.currentTarget.value);
  //           }}
  //         />
  //         <label htmlFor="announcement">
  //           {tag.type === "" ? (
  //             <input
  //               type="text"
  //               placeholder="커스텀"
  //               value={customTag}
  //               onChange={(e) => setCustomTag(e.currentTarget.value)}
  //               className="w-20 border h-5 border-black rounded-md p-1"
  //             />
  //           ) : (
  //             tag.name
  //           )}
  //         </label>
  //       </div>
  //     ))}
  //   </div>
  // );
}
