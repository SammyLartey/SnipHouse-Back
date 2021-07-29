import React, { useEffect, useState } from 'react';
import {
    Row,
    Col,
    Container,
    Button,
    Form,
    Table,
    Card,
    Pagination,
    Modal,
    Accordion
} from 'react-bootstrap';

import { fetchBookings } from '../../actions/index';

import RPT from 'react-proptypes';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import '../Order/order.scss';

const Bookings = ({ booking, fetchBookings, updateOrder }) => {
    useEffect(() => {
        fetchBookings();
        console.log(booking);
    }, []);

    const [show, setShow] = useState(false);
    const [orderView, setorderVIew] = useState({});
    const [number_items, setnumber_items] = useState([]);

    const [pagination_number, setpagination_number] = useState(1);
    let pagination_division = 20;
    let active = pagination_number;

    let items = [];
    let divison = Math.ceil(booking.length / pagination_division);
    for (let number = 1; number <= divison; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === active}
                onClick={() => setpagination_number(number)}>
                {number}
            </Pagination.Item>
        );
    }

    let ordersPagination = (
        <div className="mt-2 float-right">
            <Pagination size="sm">{items}</Pagination>
        </div>
    );

    let orderLength = booking.length;

    let bookingsHolder = [];
    let limit = pagination_number * pagination_division;
    let counter = limit - pagination_division;

    while (counter < limit) {
        if (counter >= orderLength) {
            break;
        }
        bookingsHolder.push(booking[counter]);
        counter++;
    }

    let orderHolder = bookingsHolder.map((booking, index) => (
        <tr key={booking.booking_id}>
            <td>{booking.booking_id}</td>

            <td>{booking.email}</td>
            <td>{booking.first_name}</td>
            <td>{booking.last_name}</td>
            <td>{booking.date}</td>

            <td
                className="view-text"
                onClick={() => {
                    setShow(true);
                    setorderVIew(booking);
                }}>
                view
            </td>
        </tr>
    ));

    let modal = (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title">
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    {orderView.booking_id}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {' '}
                <Container>
                    <Row className="mt-2">
                        <Col>
                            <span className="pre-text">Number : </span>
                            <span className="post-text">
                                {orderView.phone_number}
                            </span>
                        </Col>

                        <Col>
                            <span className="pre-text">Email : </span>
                            <span className="post-text">{orderView.email}</span>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <span className="pre-text">First Name : </span>
                            <span className="post-text">
                                {orderView.first_name}
                            </span>
                        </Col>
                        <Col>
                            <span className="pre-text">Last Name : </span>
                            <span className="post-text">
                                {orderView.last_name}
                            </span>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <span className="pre-text">Address : </span>
                            <span className="post-text">
                                {orderView.address}
                            </span>
                        </Col>
                        <Col>
                            <span className="pre-text">City/Town : </span>
                            <span className="post-text">{orderView.town}</span>
                        </Col>
                    </Row>

                    <Row className="mt-2">
                        <Col>
                            <span className="pre-text">Country : </span>
                            <span className="post-text">
                                {orderView.country}
                            </span>
                        </Col>{' '}
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <span className="pre-text">Booking Date : </span>
                            <span className="post-text">
                                {orderView.date !== undefined
                                    ? orderView.date
                                          .split('T')[0]
                                          .split('-')[2] +
                                      ' ' +
                                      orderView.date
                                          .split('T')[0]
                                          .split('-')[1] +
                                      ' ' +
                                      orderView.date.split('T')[0].split('-')[0]
                                    : null}
                                {/*  {orderView.date.split('T')[0].split('-')[1]}
                                {orderView.date.split('T')[0].split('-')[0]}

                                {orderView.date} */}
                            </span>
                        </Col>{' '}
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <span className="pre-text">Time : </span>
                            <span className="post-text">
                                {orderView.date !== undefined
                                    ? orderView.date.split('T')[1]
                                    : null}
                            </span>
                        </Col>{' '}
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <span className="pre-text">Booking Type : </span>
                            <span className="post-text">
                                {orderView.booking_type}
                            </span>
                        </Col>{' '}
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <span className="pre-text">Booking Reason : </span>
                            <span className="post-text">
                                {orderView.reason}
                            </span>
                        </Col>{' '}
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
    return (
        <>
            <Container>
                <div className="corrector">
                    <Row>
                        <Col
                            xs={{ span: 12 }}
                            sm={{ span: 12 }}
                            md={{ span: 12 }}
                            lg={{ span: 8 }}
                            xl={{ span: 4 }}>
                            <Card>
                                <Card.Body>
                                    <h6 className="mb-4"></h6>
                                    <div className="row d-flex align-items-center">
                                        <div className="col-9">
                                            <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                                Bookings
                                            </h3>
                                        </div>

                                        <div className="col-3 text-right">
                                            <p className="m-b-0"></p>
                                        </div>
                                    </div>
                                    <div
                                        className="progress m-t-30"
                                        style={{ height: '7px' }}>
                                        <div
                                            className="progress-bar progress-c-theme"
                                            role="progressbar"
                                            style={{ width: '100%' }}
                                            aria-valuenow="50"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        {' '}
                        <Col
                            xs={{ span: 12 }}
                            sm={{ span: 12 }}
                            md={{ span: 12 }}
                            lg={{ span: 8 }}
                            xl={{ span: 8 }}>
                            <Card>
                                <Card.Body>
                                    <div className="table-height">
                                        <Table
                                            responsive
                                            striped
                                            bordered
                                            hover
                                            size="sm"
                                            className="">
                                            <thead>
                                                <tr>
                                                    <th>Booking ID</th>

                                                    <th>Email</th>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>{orderHolder}</tbody>
                                        </Table>
                                        {ordersPagination}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>
            {modal}
        </>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.admin.loading,
        booking: state.order.booking
    };
};

const mapDispatchtoProps = dispatch => {
    return {
        fetchBookings: () => {
            dispatch(fetchBookings());
        }
    };
};

Bookings.propTypes = {
    loading: RPT.bool,
    booking: RPT.array
};

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(withRouter(Bookings));
