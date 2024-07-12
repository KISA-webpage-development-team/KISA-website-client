import { UserProfileDetail } from "./types";

type UserProfileDetailsProps = {
  detailList: UserProfileDetail[];
};

export function UserProfileDetails({ detailList }: UserProfileDetailsProps) {
  return (
    <ul
      className="flex flex-col mx-auto md:mx-0 
  justify-center gap-2 md:min-w-72"
    >
      {detailList.map(
        ({ icon, text, onClick }, index) =>
          text && (
            <li
              key={`user_detail_${index}`}
              className="flex items-center gap-4"
            >
              {icon}
              {onClick ? (
                <a
                  className="text-sm md:text-lg hover:underline"
                  href="#"
                  onClick={onClick}
                >
                  {text}
                </a>
              ) : (
                <span className="text-sm md:text-lg">{text}</span>
              )}
            </li>
          )
      )}
    </ul>
  );
}
