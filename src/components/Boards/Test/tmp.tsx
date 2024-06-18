<tbody>
  {announcementPosts?.map(
    (
      {
        postid,
        // email,
        title,
        fullname,
        readCount,
        created,
        isAnnouncement,
        commentsCount,
      },
      idx
    ) => (
      // 번호 | 제목 | 글쓴이 | 작성일 | 조회수
      <tr
        key={postid}
        className={`relative border-b border-gray-200 flex items-center py-2 ${
          isAnnouncement ? "bg-gray-100" : "hover:bg-gray-100"
        }`}
      >
        <td
          className={` ${
            isAnnouncement && ""
          } text-center basis-1/12 flex justify-center min-w-16 `}
        >
          <>
            <AnnouncementIcon />
            <span className="absolute top-0 left-0 h-full w-1 bg-michigan-blue" />
          </>
        </td>
        <td className="text-left flex-1">
          <Link className="hover:underline" href={`/posts/${postid}`}>
            {commentsCount > 0 ? (
              <span className={``}>
                {title}
                <span className="ml-1 text-red-500 font-normal">{`[${commentsCount}]`}</span>
              </span>
            ) : (
              <span className="">{title}</span>
            )}
          </Link>
        </td>

        <td className="text-center basis-1/12 min-w-16">
          {/* <Link href={`/users/${email.split("@")[0]}`}>
          <span>{fullname}</span>{" "}
        </Link> */}
          {fullname}
        </td>
        <td className="text-center basis-[10%] min-w-16">
          {dateFormatter(created)}
        </td>
        <td className="text-center w-16">{readCount}</td>
      </tr>
    )
  )}
  {posts?.map(
    (
      {
        postid,
        // email,
        title,
        fullname,
        readCount,
        created,
        isAnnouncement,
        commentsCount,
      },
      idx
    ) => (
      // 번호 | 제목 | 글쓴이 | 작성일 | 조회수
      <tr
        key={postid}
        className={`relative border-b border-gray-200 flex items-center py-2 ${
          isAnnouncement ? "bg-gray-100" : "hover:bg-gray-100"
        }`}
      >
        <td
          className={` ${
            isAnnouncement && ""
          } text-center basis-1/12 flex justify-center min-w-16 `}
        >
          {isAnnouncement ? (
            <>
              <AnnouncementIcon />
              <td className="absolute top-0 left-0 h-full w-1 bg-michigan-blue" />
            </>
          ) : (
            postStartIdx - idx
          )}
        </td>
        <td className="text-left flex-1">
          <button onClick={navigateToPost(postid)} className="hover:underline">
            {commentsCount > 0 ? (
              <span className={``}>
                {title}
                <span className="ml-1 text-red-500 font-normal ">{`[${commentsCount}]`}</span>
              </span>
            ) : (
              <span className="">{title}</span>
            )}
          </button>
        </td>

        <td className="text-center basis-1/12 min-w-16">
          {/* <Link href={`/users/${email.split("@")[0]}`}>
          <span>{fullname}</span>
        </Link> */}
          {fullname}
        </td>
        <td className="text-center basis-[10%] min-w-16">
          {dateFormatter(created)}
        </td>
        <td className="text-center w-16">{readCount}</td>
      </tr>
    )
  )}
</tbody>;
