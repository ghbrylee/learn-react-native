import React, { useState } from "react";
import { Row, Col, Form, InputGroup, Card, Button } from "react-bootstrap";
import { app } from "../firebaseinit";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link } from "react-router-dom";
const JoinPage = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = form;

  const auth = getAuth(app);

  const onJoin = () => {
    if (!window.confirm("회원으로 등록하실래요?")) return;
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((success) => {
        setLoading(false);
        history.push("/login");
      })
      .catch((error) => {
        setLoading(false);
        alert("에러 : " + error.message);
      });
  };

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return <h1 className="text-center my-5">로딩중...</h1>;
  }

  return (
    <Row className="justify-content-center my-5">
      <Col md={5}>
        <h1 className="text-center">회원등록</h1>
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
            <Button onClick={onJoin} className="w-100">
              회원등록
            </Button>
            <div className="text-end my-2">
              <Link to="/login">로그인</Link>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default JoinPage;
