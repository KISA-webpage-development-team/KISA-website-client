// comments의 생성 시간을 위한 oo시간전, oo일전, oo년전을 반환하는 함수
export function timeForToday(value) {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금 전";
  if (betweenTime < 60) {
    return `${betweenTime}분 전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간 전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일 전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년 전`;
}

// post의 작성 날짜를 오늘이면 시간을, 오늘이 아니면 날짜를 반환하는 함수
export function dateFormatter(date) {
  const today = new Date();
  const target = new Date(date);

  if (
    today.getFullYear() === target.getFullYear() &&
    today.getMonth() === target.getMonth() &&
    today.getDate() === target.getDate()
  ) {
    return target.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } else {
    let currentYear = new Date().getFullYear();
    let year = target.getFullYear();
    let month = ("0" + (target.getMonth() + 1)).slice(-2); // Months are 0-based in JavaScript
    let day = ("0" + target.getDate()).slice(-2);

    return `${year}.${month}.${day}`;
  }
}

// input: Thu, 11 Apr 2024 18:46:43 GMT
// output: 2024.04.11 18:46
export function fullDateFormatter(date) {
  const target = new Date(date);

  let year = target.getFullYear();
  let month = ("0" + (target.getMonth() + 1)).slice(-2); // Months are 0-based in JavaScript
  let day = ("0" + target.getDate()).slice(-2);
  let hour = ("0" + target.getHours()).slice(-2);
  let minute = ("0" + target.getMinutes()).slice(-2);

  return `${year}.${month}.${day} ${hour}:${minute}`;
}
