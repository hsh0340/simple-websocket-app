# handshake
## server
```tsx
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8000 });
```
ws 모듈을 이용하여 WebSocket 서버를 생성하고, 8000번 포트에서 listen 한다.

## client
```jsx
const ws = new WebSocket('ws://localhost:8000')
```

client는 new WebSocket() 생성자로 웹서버와 연결한다. 그리고 생성된 WebSocket 인스턴스 객체를 이용해서 여러 이벤트(소켓 연결, 종료, 메시지 수신 등)
을 정의한다.

![스크린샷 2024-04-02 오전 11.10.06.png](images%2F%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-04-02%20%EC%98%A4%EC%A0%84%2011.10.06.png)
처음에는 HTTP GET 요청으로 handshake를 한다. 이후 웹 소켓 통신을 한다.(101 Switching Protocols)
handshake가 일어날 때 client에서 Upgrade: websocket 헤더 등과 함께 랜덤하게 생성된 키를 서버로 보낸다(request header의 Sec-WebSocket-Key). server에서는 토큰을 client로 보낸다(핸드쉐이킹, Sec-WebSocket-Accept).



