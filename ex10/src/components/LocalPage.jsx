import React, { useEffect, useState } from "react";
import { Row, Col, Table, Form, Button } from "react-bootstrap";
import axios from "axios";
import MapPage from "./MapPage";

const LocalPage = () => {
  const [locals, setLocals] = useState([]);
  const [query, setQurey] = useState("인하대학교");
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [is_end, setIs_end] = useState(false);

  const getLocal = async () => {
    const url = "https://dapi.kakao.com/v2/local/search/keyword.json";
    const config = {
      headers: { Authorization: "KakaoAK 1516d2c502f56b88f702da4d62d772a5" },
      params: { query: query, size: 5, page: page },
    };
    setLoading(true);
    const result = await axios.get(url, config);
    setLoading(false);
    console.log(result);
    setLocals(result.data.documents);
    setTotal(result.data.meta.pageable_count);
    setIs_end(result.data.meta.is_end);
  };

  const onSearch = (e) => {
    e.preventDefault();
    getLocal();
  };

  useEffect(() => {
    getLocal();
  }, [page]);

  if (loading) return <h1 className="text-center my-5">로딩중....</h1>;

  return (
    <Row>
      <Col>
        <h1 className="text-center my-5">지역검색</h1>
        <Row className="my-2">
          <Col md={3} xs={6}>
            <Form onSubmit={onSearch}>
              <Form.Control
                placeholder="검색어"
                value={query}
                onChange={(e) => setQurey(e.target.value)}
              />
            </Form>
          </Col>
          <Col>검색수 : {total} 건</Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <td>장소명</td>
              <td>주소</td>
              <td>전화</td>
              <td>위치</td>
            </tr>
          </thead>
          <tbody>
            {locals.map((local) => (
              <tr key={local.id}>
                <td>{local.place_name}</td>
                <td>{local.address_name}</td>
                <td>{local.phone}</td>
                <td>
                  <MapPage local={local} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="text-center my-2">
          <Button
            disabled={page === 1 ? true : false}
            onClick={() => setPage(page - 1)}
          >
            이전
          </Button>
          <span className="mx-3">{page}</span>
          <Button disabled={is_end} onClick={() => setPage(page + 1)}>
            다음
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default LocalPage;
