import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Col, Row, Table, Form, Button } from 'react-bootstrap';
import MapPage from './MapPage';

const LocalPage = () => {
    const [locals, setLocals] = useState([])
    const [query, setQuery] = useState(['인하대학교'])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [is_end, setIs_end] = useState(false)
    const getLocall = async () => {
        const url = "https://dapi.kakao.com/v2/local/search/keyword.json";
        const config = {
            headers: { "Authorization": "KakaoAK 7acccc029182f882919d32c390912d19" },
            params: { query: query, page: page, size: 5 }

        }
        const result = await axios.get(url, config)
        console.log(result)
        setLocals(result.data.documents)
        setTotal(result.data.meta.pageable_count)
        setIs_end(result.data.meta.is_end)
    }

    useEffect(() => { // 페이지가 렌더링될때 호출
        getLocall()
    }, [page])

    const onSearch = (e) => {
        e.preventDefault();
        getLocall();
    }

    return (

        <Row>
            <Row>
                <Col>
                    <h1 className='text-center my-5'> 지역검색</h1>
                    <Row className='my-2'>
                        <Col md={3} xs={6}>
                            <Form onSubmit={onSearch}>
                                <Form.Control value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder='검색어' />
                            </Form>
                        </Col>
                    </Row>

                </Col>
            </Row>

            <Col>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <td>장소명</td>
                            <td>주소</td>
                            <td>전화번호</td>
                            <td>위치(마녀아님)</td>
                        </tr>
                    </thead>
                    <tbody>
                        {locals.map(locals =>
                            <tr key={locals.id}>
                                <td>{locals.place_name}</td>
                                <td>{locals.address_name}</td>
                                <td>{locals.phone}</td>
                                <td><MapPage locals={locals}/></td>

                            </tr>
                        )}
                    </tbody>
                </Table>
                <div className='text-center'>
                    <Button 
                    disabled={page==1}
                    onClick={()=>setPage(page-1) }>이전</Button>
                    <span className=' mx-3'>{page}</span>
                    <Button 
                    disabled={is_end}
                    onClick={()=>setPage(page+1)}>다음</Button>
                </div>


            </Col>
        </Row>
    )
}


export default LocalPage