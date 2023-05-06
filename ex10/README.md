# 인하대학교 VR/AR

인하대 VR/AR 리엑트 9주차 강의

## 강의 요약

- 파이어베이스
  [https://console.firebase.google.com/project/fir-c8dd0/settings/general/web:YTk5YWU3YmQtZGJhZi00OTFlLWFiOTQtZWQ3ZjIyYTNiMDE4?hl=ko](https://console.firebase.google.com/project/fir-c8dd0/settings/general/web:YTk5YWU3YmQtZGJhZi00OTFlLWFiOTQtZWQ3ZjIyYTNiMDE4?hl=ko)

- firebase에 값 전달 signInWithEmailAndPassword(auth, email, password)
- 세션 스토리지 사용 get , set ,remove
- 로그인 / 회원가입 기능
- history : router 이용

### `라이브러리 설치`

    yarn firebase

    // Import the functions you need from the SDKs you need
    import { initializeApp } from "firebase/app";
    import { getAnalytics } from "firebase/analytics";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
    apiKey: "AIzaSyACB3aErPiK5G5Hdb_zzjWa873Ow8gRgLY",
    authDomain: "fir-c8dd0.firebaseapp.com",
    projectId: "fir-c8dd0",
    storageBucket: "fir-c8dd0.appspot.com",
    messagingSenderId: "532618739364",
    appId: "1:532618739364:web:490c13810324bed50f3031",
    measurementId: "G-5D4XXB08EE"
    };

    // Initialize Firebase
    export const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

### `파이어 베이스 설정`

- auth에서 사용자 로그인 방식 설정
- user 추가로 사용자 등록

### `파이어 베이스 사용`

    import { getAuth, signInWithEmailAndPassword , createUserWithEmailAndPassword } from "firebase/auth"
    import { app } from "../firebaseinit";

    // firebase init 파일 실행
    const auth = getAuth(app);

    // 로그인
    const onLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((success) => {
        sessionStorage.setItem("email", email);
        setLoading(false);
        history.push("/");
      })
      .catch((error) => {
        alert("에러 : " + error.message);
        setLoading(false);
      });

    };

    //회원가입
    const onJoin = () => {
    if (!window.confirm("회원으로 등록하실래요?")) return;
    createUserWithEmailAndPassword(auth, email, password)
      .then((success) => {
        history.push("/login");
      })
      .catch((error) => {
        alert("에러 : " + error.message);
      });

};

### `세션 스토리지`

- 서버에 세션이라는 곳에 데이터 저장

  sessionStorage.setItem("email", email); // 'email'이라는 변수에 email 변수 저장

  sessionStorage.removeItem("email"); // email 변수 삭제

  sessionStorage.getItem("email") // email 변수 값 불러오기

### `history`

- router에 등록된 링크로 이동 가능

- router page는 등록이 안되어 있으므로 export default withRouter(RouterPage); 로 감싸야됨

  // props로 history 받고
  const RouterPage = ({ history }) =>

  // push로 원하는 경로 이동
  history.push("/");
