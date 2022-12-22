# bucket-list-bingo

## 개요
* 25개의 버킷리스트로 구성된 빙고판을 보여주는 웹 페이지입니다.
* 이 repository에는 서버 코드가 포함되어 있지 않습니다. 
  * 사용하시려면 아래에 적힌 것처럼 서버 구성을 별도로 하셔야 합니다.
* 이 웹 페이지는 **모바일에 적합합니다**.

## 사용법
### .env 파일 작성
* .env_example에 있는 것처럼 .env에 3가지 값이 필요합니다.
* `REACT_APP_USERS={"ID1": "NAME1", "ID2": "NAME2", "ID3": "NAME3"}`
  * 사용자 목록은 key-value 형태로 구성되어야 합니다.
  * key는 API 호출 시 parameter로 사용되고 value는 홈 화면 select에 노출됩니다.
* `REACT_APP_API_URL="http://api-url"`
  * 사용자의 버킷리스트 조회, 버킷리스트 업데이트에 사용될 API 주소입니다.
* `REACT_APP_PASSWORD="password"`
  * 원하는 password를 Util.js에 있는 SHA256 메소드로 변환한 뒤 .env에 적어주세요.
  * GitHub Page 배포를 목적으로 했기 때문에 SHA256을 사용했는데 필요없는 분은 checkPassword 메소드를 수정해서 사용하시면 됩니다.
  
### 서버 구성
#### 유저별 버킷리스트 조회
* Request
```bash
curl -X GET 'http://api-url?user=ID1'
```
* Response
```
[
    {
        "id": "1",
        "num": 1,
        "pos": 0,
        "title": "a",
        "complete": false
    },
    (...)
    {
        "id": "25",
        "num": 25,
        "pos": 24,
        "title": "z",
        "complete": false
    }
]
```
* Response에는 버킷리스트 항목 25개가 포함되어 있어야 합니다.
* 각 항목에는 id, num(1~25 권장), pos(0~24), title, complete가 **모두** 존재해야 합니다.

#### 버킷리스트 항목 수정
* Request
```bash
curl -X POST 'http://api-url' \
--data-raw '{
    "id": "1",
    "num": 1,
    "pos": 0,
    "title": "a",
    "complete": true
}'
```
* Response
```
{
    "id": "1",
    "num": 1,
    "pos": 0,
    "title": "a",
    "complete": true
}
```
* Response에는 버킷리스트의 수정 결과가 돌아오게끔 구성했습니다.
* 복잡한 사정이 있어 API에 `user`가 포함되어 있지 않습니다. 아래 중 편한 방법을 사용하시기 바랍니다.
  1. user별로 항목마다 모두 다른 ID를 사용
  2. API에서 `user`를 입력받게끔 구성

## 참고사항
* 모바일에서 조회하는 것을 목표로 했기 때문에 데스크톱에서는 비율이 깨질 수 있습니다.
* GitHub Page + Notion + AWS 를 기반으로 만들어졌기 때문에 .env나 API가 조금 이상해 보일 수 있습니다.
