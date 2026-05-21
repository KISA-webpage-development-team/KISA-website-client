import type { CourseCommonInfo, JokboFile, Review, SimpleCourse } from "@/types/course";

export const mockCourses: SimpleCourse[] = [
  { code: "EECS 281", name: "Data Structures and Algorithms", department: "EECS", reviewCount: 3, averageProfessorRating: 4.2 },
  { code: "EECS 376", name: "Foundations of Computer Science", department: "EECS", reviewCount: 2, averageProfessorRating: 3.8 },
  { code: "EECS 388", name: "Introduction to Computer Security", department: "EECS", reviewCount: 1, averageProfessorRating: 4.5 },
  { code: "MATH 116", name: "Calculus II", department: "Mathematics", reviewCount: 4, averageProfessorRating: 3.1 },
  { code: "EECS 482", name: "Introduction to Operating Systems", department: "EECS", reviewCount: 2, averageProfessorRating: 4.0 },
  { code: "STATS 412", name: "Introduction to Probability and Statistics", department: "Statistics", reviewCount: 2, averageProfessorRating: 3.5 },
];

export const mockCourseCommonInfo: Record<string, CourseCommonInfo> = {
  "EECS 281": {
    lectureAttendance: true, lectureRecording: true, groupWork: false, labAttendance: false,
    exam: "중간 1회, 기말 1회 (곡선 적용)", workload: "10~15시간",
    officeHours: "화목 오후 3시~5시, 예약 없이 방문 가능",
  },
  "EECS 376": {
    lectureAttendance: true, lectureRecording: true, groupWork: false, labAttendance: false,
    exam: "중간 1회, 기말 1회", workload: "5~10시간",
    officeHours: "월수 오후 2시~4시",
  },
  "EECS 388": {
    lectureAttendance: false, lectureRecording: true, groupWork: true, labAttendance: false,
    exam: "중간 1회, 기말 1회 (곡선 없음)", workload: "10~15시간",
    officeHours: "화목 오전 11시~1시",
  },
  "MATH 116": {
    lectureAttendance: true, lectureRecording: false, groupWork: false, labAttendance: false,
    exam: "중간 2회, 기말 1회", workload: "5~10시간",
    officeHours: "월수금 오후 1시~2시",
  },
  "EECS 482": {
    lectureAttendance: false, lectureRecording: true, groupWork: false, labAttendance: false,
    exam: "중간 1회, 기말 1회", workload: "15시간 이상",
    officeHours: "월수 오후 4시~6시",
  },
  "STATS 412": {
    lectureAttendance: true, lectureRecording: true, groupWork: false, labAttendance: true,
    exam: "중간 2회, 기말 1회", workload: "5~10시간",
    officeHours: "화목 오후 2시~4시",
  },
};

export const mockReviews: Review[] = [
  {
    reviewid: 1, courseCode: "EECS 281", authorName: "익명", semester: "2024 Winter",
    courseComment: "과제 양이 많지만 배우는 것이 많습니다. 자료구조 기초를 미리 공부하고 오는 것을 추천해요.",
    professors: [{ name: "John Smith", rating: 4, comment: "설명이 명확하고 오피스아워 적극 활용 추천합니다." }],
    likesCount: 5,
  },
  {
    reviewid: 2, courseCode: "EECS 281", authorName: "익명", semester: "2023 Fall",
    courseComment: "프로젝트가 학기 내내 이어지므로 초반부터 꾸준히 관리하는 것이 중요합니다.",
    professors: [{ name: "Jane Doe", rating: 5, comment: "열정적인 강의, 질문에 항상 친절하게 답변해줍니다." }],
    likesCount: 3,
  },
  {
    reviewid: 3, courseCode: "EECS 281", authorName: "익명", semester: "2024 Fall",
    courseComment: "난이도가 높습니다. 스터디 그룹을 적극 활용하세요.",
    professors: [{ name: "John Smith", rating: 4, comment: "강의는 빠르지만 슬라이드가 잘 정리되어 있습니다." }],
    likesCount: 8,
  },
  {
    reviewid: 4, courseCode: "EECS 376", authorName: "익명", semester: "2024 Winter",
    courseComment: "이론 위주 과목입니다. 증명 능력을 키우는 데 도움이 됩니다.",
    professors: [{ name: "Alice Park", rating: 4, comment: "강의가 체계적이고 예제를 많이 사용합니다." }],
    likesCount: 2,
  },
  {
    reviewid: 5, courseCode: "EECS 376", authorName: "익명", semester: "2023 Fall",
    courseComment: "수학적 사고력이 요구됩니다. 미리 이산수학을 공부하면 유리합니다.",
    professors: [{ name: "Bob Kim", rating: 3, comment: "설명이 다소 빠릅니다. 녹화를 꼭 확인하세요." }],
    likesCount: 1,
  },
  {
    reviewid: 6, courseCode: "EECS 388", authorName: "익명", semester: "2024 Winter",
    courseComment: "보안 분야 입문으로 매우 유용합니다. 팀 프로젝트가 많으니 팀원을 잘 구하세요.",
    professors: [{ name: "Carol Lee", rating: 5, comment: "업계 경험이 풍부하고 실무 중심 강의입니다." }],
    likesCount: 6,
  },
  {
    reviewid: 7, courseCode: "MATH 116", authorName: "익명", semester: "2024 Winter",
    courseComment: "기초 수학이지만 절대 쉽지 않습니다. 문제풀이 연습을 많이 하세요.",
    professors: [{ name: "David Choi", rating: 3, comment: "강의 속도가 느려서 이해하기 좋습니다." }],
    likesCount: 4,
  },
  {
    reviewid: 8, courseCode: "MATH 116", authorName: "익명", semester: "2023 Fall",
    courseComment: "웹상에 자료가 많아서 독학도 가능합니다.",
    professors: [{ name: "Emily Wang", rating: 3, comment: "설명은 명확하지만 예제가 부족합니다." }],
    likesCount: 0,
  },
  {
    reviewid: 9, courseCode: "EECS 482", authorName: "익명", semester: "2024 Winter",
    courseComment: "EECS 전공 중 가장 어렵습니다. 프로젝트 데드라인을 꼭 지키세요.",
    professors: [{ name: "Frank Oh", rating: 4, comment: "열정적이지만 강의가 빠릅니다." }],
    likesCount: 9,
  },
  {
    reviewid: 10, courseCode: "STATS 412", authorName: "익명", semester: "2024 Fall",
    courseComment: "확률론 기초를 탄탄히 다질 수 있는 좋은 과목입니다.",
    professors: [{ name: "Grace Yoon", rating: 4, comment: "친절하고 명확한 설명. 오피스아워 강력 추천합니다." }],
    likesCount: 3,
  },
];

export const mockJokboFiles: JokboFile[] = [
  { fileid: 1, courseCode: "EECS 281", fileName: "EECS281_2023Fall_midterm.pdf", uploadedBy: "익명", semester: "2023 Fall", uploadedAt: "2024-01-15" },
  { fileid: 2, courseCode: "EECS 281", fileName: "EECS281_2022Winter_final.pdf", uploadedBy: "익명", semester: "2022 Winter", uploadedAt: "2023-05-10" },
  { fileid: 3, courseCode: "EECS 376", fileName: "EECS376_2023Fall_final.pdf", uploadedBy: "익명", semester: "2023 Fall", uploadedAt: "2024-01-20" },
  { fileid: 4, courseCode: "MATH 116", fileName: "MATH116_2023Winter_midterm1.pdf", uploadedBy: "익명", semester: "2023 Winter", uploadedAt: "2023-06-01" },
];
