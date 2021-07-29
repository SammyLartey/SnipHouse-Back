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

import { fetchBlogs, addBlog, deleteBlog } from '../../actions/index';

import RPT from 'react-proptypes';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import './blog.scss';

const Blog = ({ blogs, fetchBlogs, addBlog, deleteBlog }) => {
    useEffect(() => {
        fetchBlogs();
    }, []);
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

    const [blogName, setblogName] = useState('');
    const [blogBody, setblogBody] = useState('');
    const [deleteID, setdeleteID] = useState('');
    const [pagination_number, setpagination_number] = useState(1);
    let pagination_division = 6;
    let active = pagination_number;

    let submitHandler = data => {
        addBlog(data);
        document.getElementById('add-blog-form').reset();
        handleaddClose();
    };

    let items = [];
    let divison = Math.ceil(blogs.length / pagination_division);
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

    let blogsPagination = (
        <div className="mt-2 float-right">
            <Pagination size="sm">{items}</Pagination>
        </div>
    );

    let blogLength = blogs.length;

    let blogsHolder = [];
    let limit = pagination_number * pagination_division;
    let counter = limit - pagination_division;

    while (counter < limit) {
        if (counter >= blogLength) {
            break;
        }
        blogsHolder.push(blogs[counter]);
        counter++;
    }

    let blogHolder = blogsHolder.map(blog => (
        <tr key={blog.id}>
            <td>{blog.name}</td>
            <td
                className="view-text"
                onClick={() => {
                    setblogName(blog.name);
                    setblogBody(blog.body);

                    handleViewShow();
                }}>
                view
            </td>
            <td
                className="delete-text"
                onClick={() => {
                    setdeleteID(blog.id);
                    handledeleteShow();
                }}>
                delete
            </td>
        </tr>
    ));

    let viewBlogModal = (
        <Modal show={viewState} onHide={handleViewClose}>
            <Modal.Header closeButton>
                <Modal.Title className="modal-title">{blogName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <span>{blogBody}</span>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );

    let addBlogModal = (
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
                            id="add-blog-form">
                            <Row>
                                <Col xs={12}>
                                    <h5 className="text-center mt-5 f-w-300">
                                        Enter Blog Details
                                    </h5>
                                    <hr />
                                </Col>
                                <Col xs={12}>
                                    <Form.Group controlId="formBasicid">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="title"
                                            name="name"
                                            ref={register({
                                                required: true
                                            })}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col xs={12}>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Body</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows="10"
                                            placeholder="body"
                                            name="body"
                                            ref={register({
                                                required: true
                                            })}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col xs={12}>
                                    <Button
                                        type="submit"
                                        variant="success"
                                        className="add-user-button mb-5">
                                        Add Blog
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

    let deleteBlogModal = (
        <Modal
            show={deleteState}
            onHide={handledeleteClose}
            backdrop="static"
            autofocus={true}
            keyboard={false}>
            <Modal.Header closeButton>
                <div className="text-center pt-3">
                    Do you want to delete blog{' '}
                    <span className="delete-user">{deleteID}</span>
                </div>
            </Modal.Header>

            <div className="text-center mt-3">This Action is permanent</div>
            <div className="text-center mt-3 pb-3 ">
                <Button
                    className="btn btn-danger"
                    onClick={() => {
                        handledeleteClose();
                        deleteBlog(deleteID);
                    }}>
                    Delete
                </Button>
            </div>
        </Modal>
    );

    return (
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
                                            Blogs
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
                            Add New Blog
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
                                                <th>Blog Name</th>

                                                <th>Details</th>
                                            </tr>
                                        </thead>
                                        <tbody>{blogHolder}</tbody>
                                    </Table>
                                    {blogsPagination}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {addBlogModal}
                {viewBlogModal}
                {deleteBlogModal}
            </div>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.admin.loading,
        blogs: state.blog.blogs
    };
};

const mapDispatchtoProps = dispatch => {
    return {
        fetchBlogs: () => {
            dispatch(fetchBlogs());
        },
        addBlog: data => {
            dispatch(addBlog(data));
        },
        deleteBlog: data => {
            dispatch(deleteBlog(data));
        }
    };
};

Blog.propTypes = {
    loading: RPT.bool,
    blogs: RPT.array,
    addBlog: RPT.func,
    deleteBlog: RPT.func,
    fetchBlogs: RPT.func
};

export default connect(mapStateToProps, mapDispatchtoProps)(withRouter(Blog));
