import React, { useState, useEffect } from 'react';
import { GetAllCountry } from '../API/API';
import { Container, Col, Row, Card, Button, Spinner, Form } from 'react-bootstrap';
import './style.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

function Home() {

    const [allCountry, setallCountry] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(true);

    const [searchText,setSearchText ] = useState('');

    useEffect(() => {
        GetAllCountry().then((data) => {
            if (data) {
                setallCountry(data);
                setLoading(false);
            }
        })
    }, [refresh])


    const handleRefresh = () => {
        setRefresh(!refresh);
        setLoading(true);
    }

    return (
        <div>
            {
                loading ?
                    <div className='div-center' style={{ height: '100vh', width: '100vw' }}>
                        <Spinner animation="grow" variant="primary" style={{ height: '100px', width: '100px' }}>
                            <Spinner animation="border" variant="danger" style={{ height: '100px', width: '100px' }} />
                        </Spinner>
                    </div>
                    :
                    <Container className='box my-4 px-0'>
                        <div className='p-4 bg-primary'>
                            <Row>
                                <Col lg={6} xs={12} className='my-3'>
                                    <h4 className='m-0 text-white'>List All Countries in Asia</h4>
                                </Col>
                                <Col lg={6} xs={12} className='my-3'>
                                    <div className='d-flex'>
                                        <Form.Group controlId="formBasicEmail" style={{width:'85%'}}>
                                            <Form.Control type="text" placeholder="Search Country" value={searchText} 
                                            onChange={(e)=>setSearchText(e.target.value)}/>
                                        </Form.Group>
                                        <Button className='mx-2' variant='danger' onClick={() => handleRefresh()}>Refresh</Button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <hr className='m-0 p-0' />
                        <div className='px-3 mt-4'>
                            <Table>
                                <Thead>
                                    <Tr className='border-bottom'>
                                        <Th className='p-4'>Country</Th>
                                        <Th className='py-4'>Capital</Th>
                                        <Th className='p-4'>Population</Th>
                                        <Th className='px-2 py-4'>Region</Th>
                                        <Th className='p-0'>Sub-Region</Th>
                                        <Th className='p-4'>Languages</Th>
                                        <Th className='p-4'>Borders</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        allCountry.filter((val)=>{
                                            if(searchText==" "){
                                               return val;
                                            }else if(val.name.common.toLowerCase().includes(searchText.toLowerCase())){
                                              return val;
                                            }
                                        })
                                        .map((row, index) => (
                                            <Tr className='border-bottom'>
                                                <Td >
                                                    <img className='my-2' src={row.flags.png}
                                                        style={{ height: '30px', width: '50px' }}></img>
                                                    <p><strong>{row.name.common}</strong></p>
                                                </Td>
                                                <Td>
                                                    {
                                                        row.capital && Object.keys(row.capital).map((oneKey, i) => (
                                                            <span className={i > 0 && 'mx-2'} key={i}>{i > 0 && ","} {row.capital[oneKey]}</span>
                                                        ))
                                                    }
                                                </Td>
                                                <Td className='px-4'>{row.population}</Td>
                                                <Td className='px-4'>{row.region}</Td>
                                                <Td className='px-2'>{row.subregion}</Td>
                                                <Td className='px-4'>
                                                    {
                                                        row.languages && Object.keys(row.languages).map((oneKey, i) => (
                                                            <span className={i > 0 && 'mx-2'} key={i}>{i > 0 && ","} {row.languages[oneKey]}
                                                            </span>
                                                        ))
                                                    }
                                                </Td>
                                                <Td className='px-4'>
                                                    {
                                                        row.borders && Object.keys(row.borders).map((oneKey, i) => (
                                                            <span className={i > 0 && 'mx-1'} key={i}>{i > 0 && ","} {row.borders[oneKey]}</span>
                                                        ))
                                                    }
                                                </Td>
                                            </Tr>

                                        ))
                                    }

                                </Tbody>
                            </Table>
                        </div>
                    </Container>
            }
        </div>
    )
}

export default Home;
