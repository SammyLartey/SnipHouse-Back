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

import { fetchOrders, updateOrder } from '../../actions/index';

import RPT from 'react-proptypes';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import './order.scss';

const Order = ({ orders, fetchOrders, updateOrder }) => {
    useEffect(() => {
        fetchOrders();
    }, []);

    const [show, setShow] = useState(false);
    const [orderView, setorderVIew] = useState({});
    const [number_items, setnumber_items] = useState([]);

    const [pagination_number, setpagination_number] = useState(1);
    let pagination_division = 20;
    let active = pagination_number;

    let items = [];
    let divison = Math.ceil(orders.length / pagination_division);
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

    let orderLength = orders.length;

    let ordersHolder = [];
    let limit = pagination_number * pagination_division;
    let counter = limit - pagination_division;

    while (counter < limit) {
        if (counter >= orderLength) {
            break;
        }
        ordersHolder.push(orders[counter]);
        counter++;
    }

    let orderHolder = ordersHolder.map((order, index) => (
        <tr key={order.order_id}>
            <td>{order.order_id}</td>
            <td>{order.order_items.length.toString()}</td>
            <td>{order.buyer_number}</td>
            <td className="delivery-date">{order.delivery_date}</td>
            {!order.completed ? (
                <td className="delete-text">No</td>
            ) : (
                <td className="delivery-date">Yes</td>
            )}
            <td
                className="view-text"
                onClick={() => {
                    setShow(true);
                    setorderVIew(order);
                    setnumber_items(order.order_items);
                }}>
                view
            </td>
            <td className="delete-text" onClick={() => {}}>
                delete
            </td>
        </tr>
    ));

    let itemsBar = number_items.map((items, index) => (
        <Accordion className="mt-5" key={items.product.product_id}>
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Item {index + 1}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Container>
                            <h3>Measurements(cm)</h3>
                            {items.type === 1 ? (
                                <Row className="mt-2">
                                    <Col>
                                        {' '}
                                        <span className="pre-text">
                                            Size :{' '}
                                        </span>
                                        <span className="post-text">
                                            {items.size}
                                        </span>
                                    </Col>
                                </Row>
                            ) : (
                                <>
                                    <Row>
                                        {' '}
                                        <Col>
                                            {' '}
                                            <span className="pre-text">
                                                Across back :{' '}
                                            </span>
                                            <span className="post-text">
                                                {items.size.across_back}
                                            </span>
                                        </Col>
                                        <Col>
                                            {' '}
                                            <span className="pre-text">
                                                Shoulder :{' '}
                                            </span>
                                            <span className="post-text">
                                                {items.size.shoulder}
                                            </span>
                                        </Col>
                                        <Col>
                                            {' '}
                                            <span className="pre-text">
                                                High bust :{' '}
                                            </span>
                                            <span className="post-text">
                                                {items.size.high_bust}
                                            </span>
                                        </Col>
                                        <Col>
                                            {' '}
                                            <span className="pre-text">
                                                Bust :{' '}
                                            </span>
                                            <span className="post-text">
                                                {items.size.bust}
                                            </span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        {' '}
                                        <Col>
                                            {' '}
                                            <span className="pre-text">
                                                Shoulder to nipple :{' '}
                                            </span>
                                            <span className="post-text">
                                                {items.size.shoulder_to_nipple}
                                            </span>
                                        </Col>
                                        <Col>
                                            {' '}
                                            <span className="pre-text">
                                                Shoulder to waist :{' '}
                                            </span>
                                            <span className="post-text">
                                                {items.size.shoulder_to_waist}
                                            </span>
                                        </Col>
                                        <Col>
                                            {' '}
                                            <span className="pre-text">
                                                Around shoulder :{' '}
                                            </span>
                                            <span className="post-text">
                                                {items.size.around_shoulder}
                                            </span>
                                        </Col>
                                        <Col>
                                            {' '}
                                            <span className="pre-text">
                                                Shoulder to underbust :{' '}
                                            </span>
                                            <span className="post-text">
                                                {
                                                    items.size
                                                        .shoulder_to_underbust
                                                }
                                            </span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {' '}
                                            <span className="pre-text">
                                                Innermost waist :{' '}
                                            </span>
                                            <span className="post-text">
                                                {items.size.innermost_waist}
                                            </span>
                                        </Col>
                                        <Col>
                                            {' '}
                                            <span className="pre-text">
                                                Hip :{' '}
                                            </span>
                                            <span className="post-text">
                                                {items.size.hip}
                                            </span>
                                        </Col>
                                        <Col>
                                            {' '}
                                            <span className="pre-text">
                                                Shoulder to knee :{' '}
                                            </span>
                                            <span className="post-text">
                                                {items.size.shoulder_to_knee}
                                            </span>
                                        </Col>
                                        <Col>
                                            {' '}
                                            <span className="pre-text">
                                                Dress Length :{' '}
                                            </span>
                                            <span className="post-text">
                                                {items.size.dress_length}
                                            </span>
                                        </Col>
                                    </Row>
                                    <Row className="mb-5">
                                        {' '}
                                        <Col>
                                            {' '}
                                            <span className="pre-text">
                                                Around arm :{' '}
                                            </span>
                                            <span className="post-text">
                                                {items.size.around_arm}
                                            </span>
                                        </Col>{' '}
                                        <Col>
                                            {' '}
                                            <span className="pre-text">
                                                Armhole :{' '}
                                            </span>
                                            <span className="post-text">
                                                {items.size.armhole}
                                            </span>
                                        </Col>{' '}
                                        <Col>
                                            {' '}
                                            <span className="pre-text">
                                                Nipple to nipple :{' '}
                                            </span>
                                            <span className="post-text">
                                                {items.size.nipple_to_nipple}
                                            </span>
                                        </Col>
                                        <Col>
                                            {' '}
                                            <span className="pre-text">
                                                Extra :{' '}
                                            </span>
                                            <span className="post-text">0</span>
                                        </Col>
                                    </Row>
                                </>
                            )}

                            <Row className="mt-2">
                                <Col>
                                    <span className="pre-text">
                                        Name of dress :
                                    </span>
                                    <span className="post-text">
                                        {items.product.name}
                                    </span>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col>
                                    <span className="pre-text">
                                        Category :{' '}
                                    </span>
                                    <span className="post-text">
                                        {items.product.category}
                                    </span>
                                </Col>
                                <Col>
                                    {' '}
                                    <span className="pre-text">
                                        Price(GHS) :{' '}
                                    </span>
                                    <span className="post-text">
                                        {items.product.price}
                                    </span>
                                </Col>
                                <Col>
                                    {' '}
                                    <span className="pre-text">Days : </span>
                                    <span className="post-text">
                                        {items.product.days}
                                    </span>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col lg={3}>
                                    <img
                                        src={items.product.picturea}
                                        alt=""
                                        className="dress-image"
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    ));
    let modal = (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title">
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    {orderView.order_id}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {' '}
                <Container>
                    <Row className="mt-2">
                        <Col>
                            <span className="pre-text">
                                Payment Reference :{' '}
                            </span>
                            <span className="post-text">
                                {orderView.payment_reference}
                            </span>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <span className="pre-text">Cost (GHC) : </span>
                            <span className="post-text">
                                {orderView.payment_amount}
                            </span>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <span className="pre-text">Delivery Type : </span>
                            <span className="post-text">
                                {orderView.delivery_type}
                            </span>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <span className="pre-text">
                                Delivery Cost (GHC) :{' '}
                            </span>
                            <span className="post-text">
                                {orderView.delivery_cost}
                            </span>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <span className="pre-text">
                                Buyer First Name :{' '}
                            </span>
                            <span className="post-text">
                                {orderView.buyer_first_name}
                            </span>
                        </Col>
                        <Col>
                            <span className="pre-text">Buyer Last Name : </span>
                            <span className="post-text">
                                {orderView.buyer_last_name}
                            </span>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <span className="pre-text">Buyer Address : </span>
                            <span className="post-text">
                                {orderView.buyer_address}
                            </span>
                        </Col>
                        <Col>
                            <span className="pre-text">Buyer City/Town : </span>
                            <span className="post-text">
                                {orderView.buyer_town}
                            </span>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <span className="pre-text">Buyer Country : </span>
                            <span className="post-text">
                                {orderView.buyer_country}
                            </span>
                        </Col>
                        <Col>
                            <span className="pre-text">Buyer Email : </span>
                            <span className="post-text">
                                {orderView.buyer_email}
                            </span>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        {' '}
                        <Col>
                            <span className="pre-text">Buyer Number : </span>
                            <span className="post-text">
                                {orderView.buyer_number}
                            </span>
                        </Col>
                        <Col>
                            <span className="pre-text">Buyer Zip : </span>
                            <span className="post-text">
                                {orderView.buyer_zip}
                            </span>
                        </Col>
                    </Row>
                </Container>
                {itemsBar}
                <Row>
                    {!orderView.completed ? (
                        <Button
                            variant="success"
                            className="m-5"
                            onClick={() => {
                                updateOrder(orderView.order_id);
                                setShow(false);
                            }}>
                            Mark as done
                        </Button>
                    ) : (
                        <Button
                            variant="danger"
                            className="m-5"
                            onClick={() => {
                                updateOrder(orderView.order_id);
                                setShow(false);
                            }}>
                            UnMark as done
                        </Button>
                    )}
                </Row>
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
                                                Orders
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
                                                    <th>Order ID</th>

                                                    <th>Number of items</th>
                                                    <th>Buyer Number</th>
                                                    <th>Delivery date</th>
                                                    <th>Completed</th>
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
        orders: state.order.orders
    };
};

const mapDispatchtoProps = dispatch => {
    return {
        fetchOrders: () => {
            dispatch(fetchOrders());
        },
        updateOrder: data => {
            dispatch(updateOrder(data));
        }
    };
};

Order.propTypes = {
    loading: RPT.bool,
    orders: RPT.array,

    fetchOrders: RPT.func,
    updateOrder: RPT.func
};

export default connect(mapStateToProps, mapDispatchtoProps)(withRouter(Order));
