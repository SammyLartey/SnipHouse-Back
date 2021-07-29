import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Pagination, Form } from 'react-bootstrap';

import Aux from '../../hoc/_Aux';
import DEMO from '../../store/constant';
import BarDiscreteChart from '../Charts/Nvd3Chart/BarDiscreteChart';
import RPT from 'react-proptypes';
import { withRouter } from 'react-router-dom';
import { fetchProducts, fetchOrders } from '../../actions/admin_actions';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
let moment = require('moment');

const Dashboard = ({
    totalUsers,
    totalUsersInfo,
    fetchProducts,
    totalProducts,
    fetchOrders,
    orderLength,
    order
}) => {
    useEffect(() => {
        fetchProducts();
    }, []);
    useEffect(() => {
        fetchOrders();
    }, []);
    const [pagination_number, setpagination_number] = useState(1);
    let pagination_division = 5;
    let active = pagination_number;

    let items = [];
    let divison = Math.ceil(totalUsersInfo.length / pagination_division);
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

    const Userpagination = (
        <div className="mt-2 float-right mr-4">
            <Pagination size="sm">{items}</Pagination>
        </div>
    );

    let users_length = totalUsersInfo.length;

    let users_holder = [];
    let limit = pagination_number * pagination_division;
    let counter = limit - pagination_division;

    while (counter < limit) {
        if (counter >= users_length) {
            break;
        }
        users_holder.push(totalUsersInfo[counter]);
        counter++;
    }
    let recent_users = [];
    let counter2 = users_length - 1;
    let small_counter = 0;
    let users_holder2 = totalUsersInfo;
    while (counter2 > 0) {
        if (counter2 >= users_length) {
            break;
        }
        if (small_counter >= 5) {
            break;
        }

        recent_users.push(users_holder2[counter2]);
        counter2--;
        small_counter++;
    }

    const appUserTable = recent_users.map(total => (
        <tr className="unread">
            <td>
                <img
                    className="rounded-circle"
                    style={{ width: '40px' }}
                    src={avatar2}
                    alt="activity-user"
                />
            </td>
            <td>
                <h6>
                    {total.first_name} {total.last_name}
                </h6>
                {/* <h6 className="mb-1">{total.email}</h6>
                <p className="m-0">
                    
                </p> */}
            </td>
            <td>
                <h6 className="text-muted">
                    <i className="fa fa-circle text-c-green f-10 m-r-15" />
                    {total.date_created}
                </h6>
            </td>
            <td>
                {/* <a
                    href={DEMO.BLANK_LINK}
                    className="label theme-bg2 text-white f-12">
                    Reject
                </a>
                <a
                    href={DEMO.BLANK_LINK}
                    className="label theme-bg text-white f-12">
                    Approve
                </a> */}
                <p>{total.location}</p>
            </td>
        </tr>
    ));

    return (
        <Aux>
            <Row>
                <Col md={6} xl={4}>
                    <Card>
                        <Card.Body>
                            <h5 className="mb-1">Total Number of Orders</h5>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                                    <h2 className="f-w-300 d-flex align-items-center m-b-0">
                                        <i className="feather icon-arrow-up text-c-green f-30 m-r-5" />{' '}
                                        {orderLength}
                                    </h2>
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

                <Col md={6} xl={4}>
                    <Card className="card-event">
                        <Card.Body>
                            <div className="row align-items-center justify-content-center">
                                <div className="col">
                                    <h5 className="m-0">
                                        Total Number of Products
                                    </h5>
                                </div>
                            </div>
                            <h2 className="mt-2 f-w-300">{totalProducts}</h2>
                            <h6 className="text-muted mt-3 mb-0">
                                {moment().format('MMMM Do YYYY')}
                            </h6>
                            <i className="fa fa-angellist text-c-purple f-50" />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={12} xl={12}>
                    <Card className="Recent-Users">
                        <Card.Header>
                            <Card.Title as="h5">Recent</Card.Title>
                        </Card.Header>
                        <Card.Body className="px-0 py-2">
                            <div>
                                <Table responsive hover>
                                    <tbody>{appUserTable}</tbody>
                                </Table>
                            </div>

                            {/* {Userpagination} */}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.admin.loading,
        users: state.admin.users,
        username: state.admin.username,
        totalUsers: state.admin.totalUsers,
        totalProducts: state.product.number_products,
        orderLength: state.order.orderLength,
        totalUsersInfo: state.admin.users,
        orders: state.order.orders
    };
};

const mapDispatchtoProps = dispatch => {
    return {
        fetchProducts: () => {
            dispatch(fetchProducts());
        },
        fetchOrders: () => {
            dispatch(fetchOrders());
        }
    };
};

Dashboard.propTypes = {
    history: RPT.object,
    totalUsers: RPT.string,
    fetchProducts: RPT.func,
    fetchOrders: RPT.func,
    totalUsersInfo: RPT.array,
    orderLength: RPT.any,
    orders: RPT.array
};

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(withRouter(Dashboard));
