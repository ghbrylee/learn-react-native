import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import Book from "./Book";

const BookPage = () => {
  const ref_query = useRef(null);
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [is_end, setIs_end] = useState(false);
  const [query, setQuery] = useState("리액트");

  const getBooks = async () => {
    const url = "https://dapi.kakao.com/v3/search/book?target=title";
    const config = {
      headers: { Authorization: "KakaoAK 05bf6a4174ba99f6a464661436e060f7" },
      params: { query: query, size: 8, page: page },
    };

    setLoading(true);
    const result = await axios.get(url, config);
    setLoading(false);
    setBooks(result.data.documents);
    setTotal(result.data.meta.pageable_count);
    setIs_end(result.data.meta.is_end);
    setLoading(false);
    console.log(result);

    ref_query.current.focus();
  };

  useEffect(() => {
    getBooks();
  }, [page]);

  if (loading) return <h1 className="text-center my-5">로딩중....</h1>;

  const onSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    getBooks();
  };

  return (
    <Row className="my-5 mx=2">
      <Row>
        <Col className="mb-2" md={3}>
          <Form onSubmit={onSubmit}>
            <Form.Control
              ref={ref_query}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="검색어"
            />
          </Form>
        </Col>
        {/* <Col>검색 수 : {total}건</Col> */}
      </Row>
      <hr />
      <Col>
        <h1 className="text-center">도서검색</h1>

        <Row>
          {books.map((book) => (
            <Col className="my-2" md={3} xs={6} key={book.isbn}>
              <Card>
                <Card.Body>
                  <img
                    src={
                      book.thumbnail
                        ? book.thumbnail
                        : "https://via.placeholder.com/120x170/"
                    }
                    alt=""
                  />
                  <div className="ellipsis">{book.title}</div>

                  <Book book={book} />
                </Card.Body>
              </Card>
            </Col>
          ))}
          <div className="text-center my-3">
            <Button
              disabled={page === 1 ? true : false}
              onClick={() => setPage(page - 1)}
              className="btn-sm"
            >
              이전
            </Button>
            <span className="px-3">{page}</span>
            <Button
              disabled={is_end && true}
              onClick={() => setPage(page + 1)}
              className="btn-sm"
            >
              다음
            </Button>
          </div>
        </Row>
      </Col>
    </Row>
  );
};

export default BookPage;
