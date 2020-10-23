import axios from 'axios';

/**
 * axios 인스턴스 생성
 * 또 다른 API 서버를 만들어 사용할 때 유용.
 *
 */

 const client = axios.create();

 /* 
    글로벌 설정 예시

    //API 주소를 다른 곳으로 사용
    client.defaults.baseURL = 'https://external-api-server.com/'

    //헤더 설정
    client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';

    //인터셉터 설정
    
 */