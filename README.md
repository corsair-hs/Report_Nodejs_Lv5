# Report Lv5

## Issue 1 ) Service -> Controller 리턴값 어케 받아오냐... (해결완료)
``` javascript
// Service의 리턴값
return res.status(200).json({ message: "메세지" });
```
Controller에서 받아오지 못함   
이유? Service에는 res가 없어서 실행 자체가 안됨
## Issue 1 해결방안 )
``` javascript
// Service to Controller
return { num: 401, msg: "메세지" };
// Controller from Service
const { num, msg, err } = await this.usersService.method(x, y, z);
if (num === 200) {
  return res.status(num).json({ message: msg });
} else {
  console.error(err);
  return res.status(num).json({ errorMessage: msg });
}
```
Service에서 객체의 형태로   
num에는 response status 번호를, msg에는 출력하고자 하는 message를 담아서 Controller로 보낸다.   
Controller는 객체로 넘어온 아이를 구조분해할당으로 받아서 num로서 200과 나머지를 분개하여 msg를 출력한다.