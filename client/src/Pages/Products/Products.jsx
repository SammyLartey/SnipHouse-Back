import React, { useEffect, useState } from 'react';
import {
    Row,
    Col,
    Container,
    Button,
    Form,
    Spinner,
    Table,
    Card,
    Pagination,
    Modal
} from 'react-bootstrap';

import { fetchProducts, addProduct, deleteProduct } from '../../actions/index';

import RPT from 'react-proptypes';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import './products.scss';
import ImageUploader from 'react-images-upload';

const Products = ({ products, addProduct, fetchProducts, deleteProduct }) => {
    useEffect(() => {
        fetchProducts();
    }, []);

    const [pictures, setPictures] = useState([]);

    const onDrop = picture => {
        setPictures([...pictures, picture]);
    };

    const { register, handleSubmit } = useForm();
    const [viewState, setviewState] = useState(false);
    const [deleteState, setdeleteState] = useState(false);
    const [addState, setaddState] = useState(false);

    const handleViewShow = () => setviewState(true);
    const handleViewClose = () => setviewState(false);

    const handledeleteShow = () => setdeleteState(true);
    const handledeleteClose = () => setdeleteState(false);
    const handleaddShow = () => setaddState(true);
    const handleaddClose = () => setaddState(false);
    const [product, setproduct] = useState();
    const [name, setname] = useState('');
    const [description, setdescription] = useState('');
    const [price, setprice] = useState();
    const [imageUrl1, setimageUrl1] = useState();
    const [imageUrl2, setimageUrl2] = useState();
    const [imageUrl3, setimageUrl3] = useState();
    const [imageUrl4, setimageUrl4] = useState();
    const [days, setdays] = useState();
    const [deleteID, setdeleteID] = useState('');
    const [pagination_number, setpagination_number] = useState(1);
    let pagination_division = 20;
    let active = pagination_number;

    let submitHandler = data => {
        handleaddClose();
        addProduct(data, pictures[0]);

        setPictures([])

        document.getElementById('add-user-form').reset();
    };

    let items = [];
    let divison = Math.ceil(products.length / pagination_division);
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

    let productPagination = (
        <div className="mt-2 float-right">
            <Pagination size="sm">{items}</Pagination>
        </div>
    );

    let productLength = products.length;

    let productsHolder = [];
    let limit = pagination_number * pagination_division;
    let counter = limit - pagination_division;

    while (counter < limit) {
        if (counter >= productLength) {
            break;
        }
        productsHolder.push(products[counter]);
        counter++;
    }

    let productHolder = productsHolder.map(product => (
        <tr key={product.id}>
            <td>{product.name}</td>
            <td
                className="view-text"
                onClick={() => {
                    setimageUrl1(product.picturea);
                    setname(product.name);
                    setdescription(product.description);
                    setprice(product.price);
                    setdays(product.days);
                    handleViewShow();
                }}>
                view
            </td>
            <td
                className="delete-text"
                onClick={() => {
                    setdeleteID(product.id);
                    handledeleteShow();
                }}>
                delete
            </td>
        </tr>
    ));

    let viewProductModal = (
        <Modal show={viewState} onHide={handleViewClose}>
            <Modal.Header closeButton>
                <Modal.Title className="modal-title">{name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <span className="body-header">description</span>
                    </Row>

                    <Row>
                        <span>{description}</span>
                    </Row>
                    <Row>
                        <span className="body-header">price</span>
                    </Row>

                    <Row>
                        <span>{price}</span>
                    </Row>
                    <Row>
                        <span className="body-header">Days to make</span>
                    </Row>

                    <Row>
                        <span>{days} days</span>
                    </Row>
                    <Row className="mt-3">
                        <img src={imageUrl1} alt="" className="product-image" />
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );

    let deleteProductModal = (
        <Modal
            show={deleteState}
            onHide={handledeleteClose}
            backdrop="static"
            autofocus={true}
            keyboard={false}>
            <Modal.Header closeButton>
                <div className="text-center pt-3">
                    Do you want to delete product{' '}
                    <span className="delete-user">{deleteID}</span>
                </div>
            </Modal.Header>

            <div className="text-center mt-3">This Action is permanent</div>
            <div className="text-center mt-3 pb-3 ">
                <Button
                    className="btn btn-danger"
                    onClick={() => {
                        handledeleteClose();
                        deleteProduct(deleteID);
                    }}>
                    Delete
                </Button>
            </div>
        </Modal>
    );
    let addProductModal = (
        <Modal
            show={addState}
            onHide={handleaddClose}
            backdrop="static"
            autofocus={true}
            keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Enter Product Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className="">
                        <Form
                            autocomplete="off"
                            encType="multipart/form-data"
                            key={1}
                            onSubmit={handleSubmit(submitHandler)}
                            id="add-user-form">
                            <Row>
                                <Col xs={12}>
                                    <h5 className="text-center mt-5 f-w-300">
                                        Enter Product Details
                                    </h5>
                                    <hr />
                                </Col>
                                <Col xs={12}>
                                    <Form.Group controlId="formBasicid">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="name"
                                            name="name"
                                            ref={register({
                                                required: true
                                            })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Group controlId="formBasicid1">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="category_id"
                                            ref={register({
                                                required: true
                                            })}>
                                            <option>Wedding</option>
                                            <option>Corporate</option>
                                            <option>Ready to Wear</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Group controlId="formBasicid1">
                                        <Form.Label>Sub-Category</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="subcategory"
                                            ref={register({
                                                required: true
                                            })}>
                                            <option>...</option>
                                            <option>Bride Traditional</option>
                                            <option>Bride Reception</option>
                                            <option>Bride Court Gown</option>
                                            <option>Wedding Guest</option>
                                            <option>Bridesmaid</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Group controlId="formBasicid1">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="description"
                                            name="description"
                                            ref={register({
                                                required: true
                                            })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Group controlId="formBasicid2">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="price"
                                            name="price"
                                            ref={register({
                                                required: true
                                            })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Group controlId="formBasicid2">
                                        <Form.Label>Days to make</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="days"
                                            name="days"
                                            ref={register({
                                                required: true
                                            })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Group controlId="formBasicid2">
                                        <Form.Label>
                                            Select 4 product images
                                        </Form.Label>
                                        {/* <Form.Control
                                            type="file"
                                            name="file"
                                            multiple
                                            placeholder="select an image"
                                            ref={register({
                                                required: true
                                            })}
                                        /> */}

                                        <ImageUploader
                                            withPreview={true}
                                            label="Max file size: 500kb, accepted: jpg and png"
                                            withIcon={true}
                                            onChange={onDrop}
                                            imgExtension={['.jpg', '.png']}
                                            maxFileSize={500000}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Button
                                        type="submit"
                                        variant="success"
                                        className="add-user-button mb-5">
                                        Add Product
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
    );

    return (
        <Container fluid>
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
                                            Products
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
                    <Col xs={11} sm={11} md={8} lg={4} xl={4} className="mb-3">
                        <button
                            className="btn btn-success button-down-2"
                            id="add-user-button"
                            onClick={() => {
                                handleaddShow();
                            }}>
                            Add New Product
                        </button>
                    </Col>
                </Row>
                <Row>
                    {' '}
                    <Col
                        xs={{ span: 12 }}
                        sm={{ span: 12 }}
                        md={{ span: 12 }}
                        lg={{ span: 6 }}
                        xl={{ span: 6 }}>
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
                                                <th>Product Name</th>

                                                <th>Details</th>
                                            </tr>
                                        </thead>
                                        <tbody>{productHolder}</tbody>
                                    </Table>
                                    {productPagination}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {viewProductModal}
                {deleteProductModal}
                {addProductModal}
            </div>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.admin.loading,
        products: state.product.products
    };
};

const mapDispatchtoProps = dispatch => {
    return {
        addProduct: (data, pictures) => {
            dispatch(addProduct(data, pictures));
        },
        fetchProducts: () => {
            dispatch(fetchProducts());
        },
        deleteProduct: data => {
            dispatch(deleteProduct(data));
        }
    };
};

Products.propTypes = {
    loading: RPT.bool,
    products: RPT.array,
    addProduct: RPT.func,
    fetchProducts: RPT.func
};

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(withRouter(Products));
