# 리팩토링 + 익명화

## 리팩토링

- features 폴더로 컴포넌트들의 점진적 이동
- 모든 third-party 코드들은 lib 폴더에서만 가져와 쓰도록
- 타입 스크립트 적용을 위해 모든 type들을 체계화

### types 폴더

- [ ] apis 폴더의 모든 api 응답 타입 추가
-

## 자유 노트

- 백엔드 요청사항: `/users/${email}/posts/` 에서 text를 넘겨주지 말아라. 유저 페이지에 보여지는거라 불필요한 정보는 제거해야
  그리고, commentsCount를 넘겨줘야한다.
  그리고 email을 넘겨주지 말아라.
  예시:

```json
{
  "postid": 12,
  "title": "이름좀 바꿔주세요....",
  "created": "Tue, 23 Apr 2024 22:38:13 GMT",
  "fullname": "권성모",
  "type": "community",
  "readCount": 106,
  "isAnnouncement": false,
  "commentsCount": 7
}
```

- 프론트 나중 수정사항: getUserPosts 리턴 타입을 SimplePost로 변경해야함
- 프론트 나중 수정사항: API call의 리턴값을 { success: boolean, message: string } 으로 변경하는것이 굉장히 좋아보임
  하지만 이는 시간이 걸릴 것으로 보이니 후순위로 미룸. 지금은 그대로 return 시키고, Return type을 추가하지 않음
