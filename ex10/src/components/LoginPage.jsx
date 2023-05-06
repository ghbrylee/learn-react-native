import React, { useState } from "react";
import { Row, Col, Form, InputGroup, Card, Button } from "react-bootstrap";
import { app } from "../firebaseinit";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
const LoginPage = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "wlsghsla111@gmail.com",
    password: "123456",
  });
  const { email, password } = form;

  const auth = getAuth(app);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

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

  if (loading) {
    return <h1 className="text-center my-5">로딩중...</h1>;
  }

  return (
    <Row className="justify-content-center my-5">
      <Col md={5}>
        <h1 className="text-center">로그인</h1>
        <Card className="p-3">
          <Form>
            <InputGroup className="my-2">
              <InputGroup.Text>이메일</InputGroup.Text>
              <Form.Control value={email} onChange={onChange} name="email" />
            </InputGroup>
            <InputGroup className="my-2">
              <InputGroup.Text>비밃번호</InputGroup.Text>
              <Form.Control
                type="password"
                value={password}
                onChange={onChange}
                name="password"
              />
            </InputGroup>
            <Button onClick={onLogin} className="w-100">
              로그인
            </Button>
            <div className="text-end my-2">
              <Link to="/join">회원가입</Link>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;
