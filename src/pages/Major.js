import React, { useEffect, useState } from "react";
import { Modal, Button, Pagination, Row, Col, Table, Card, Container } from "react-bootstrap";
import Input from "../components/Input";
import majorService from "./../services/majorService";

import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DebounceInput } from "react-debounce-input";

const Major = () => {
  const [majors, setMajors] = useState([]);
  const [page, setPage] = useState(0);
  const [pageLength, setPageLength] = useState(10);
  const [search, setSearch] = useState("");
  const [pagingItems, setPagingItems] = useState([]);

  const [modalShow, setModalShow] = useState(false);
  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageLength, search]);

  const loadData = () => {
    majorService.getPaging(page, pageLength, search).then((res) => {
      setMajors(res.data);
      // set pagination
      let items = [
        <Pagination.Item key="first" onClick={() => setPage(0)}>
          &laquo;
        </Pagination.Item>,
        <Pagination.Item key="prev" disabled={page === 0} onClick={() => setPage(page - 1)}>
          &lsaquo;
        </Pagination.Item>,
      ];
      for (let i = 0; i < res.pagingInfo.totalPages; i++) {
        items.push(
          <Pagination.Item key={i} active={i === page} onClick={() => setPage(i)}>
            {i + 1}
          </Pagination.Item>
        );
      }
      items.push(
        <Pagination.Item key="next" disabled={page === res.pagingInfo.totalPages - 1} onClick={() => setPage(page + 1)}>
          &rsaquo;
        </Pagination.Item>,
        <Pagination.Item key="last" onClick={() => setPage(res.pagingInfo.totalPages - 1)}>
          &raquo;
        </Pagination.Item>
      );
      setPagingItems(items);
    });
  };

  const handleChangePageLength = (e) => {
    setPage(0);
    setPageLength(e.target.value);
  };

  const handleChangeSearch = (e) => {
    setPage(0);
    setSearch(e.target.value);
  };

  const formik = useFormik({
    initialValues: {
      id: 0,
      name: "",
    },
    validationSchema: Yup.object({
      id: Yup.number().required(),
      name: Yup.string().required("Please enter major name").min(3, "At least 3 characters"),
    }),
    onSubmit: (values) => {
      submitHandler(values);
    },
  });

  const showEdit = (e, id) => {
    if (e) e.preventDefault();
    if (id > 0) {
      majorService.get(id).then((res) => {
        if (res.errorCode === 0) {
          formik.setValues(res.data);
          handleModalShow();
        }
      });
    } else {
      formik.resetForm();
      handleModalShow();
    }
  };

  const submitHandler = (data) => {
    if (data.id > 0) {
      // update
      majorService.update(data.id, data).then((res) => {
        if (res.errorCode === 0) {
          handleModalClose();
          loadData();
          toast.success("Update successful!");
        } else {
          toast.error(res.message);
        }
      });
    } else {
      // add
      majorService.add(data).then((res) => {
        if (res.errorCode === 0) {
          handleModalClose();
          loadData();
          toast.success("Add successful!");
        } else {
          toast.error(res.message);
        }
      });
    }
  };

  const handleDelete = (e, id) => {
    if (e) e.preventDefault();
    // confirm before deleting
    majorService.delete(id).then((res) => {
      if (res.errorCode === 0) {
        loadData();
        toast.warn("Delete Successful");
      } else {
        toast.error("Delete Successful");
      }
    });
  };
  return (
    <>
      <Container className="my-4">
        <Card className="border-primary bt-5">
          <Card.Header>
            <Row>
              <Col>
                <h3 className="card-title">
                  Major <small className="text-muted">list</small>
                </h3>
              </Col>
              <Col sm="auto">
                <Button color="primary" onClick={() => showEdit(null, 0)}>
                  <i className="bi-plus-lg" /> Add
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <div className="mb-2">
              <Row>
                <Col>
                  <Row className="g-1">
                    <label className="col-form-label col-sm-auto">Show</label>
                    <Col sm="auto">
                      <select className="form-select" onChange={handleChangePageLength}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                      </select>
                    </Col>
                    <label className="col-form-label col-sm-auto">entries</label>
                  </Row>
                </Col>
                <Col xs="auto">
                  <DebounceInput
                    value={search}
                    minLength={2}
                    debounceTimeout={300}
                    onChange={handleChangeSearch}
                    placeholder="Enter search key..."
                    className="form-control"
                  />
                </Col>
              </Row>
            </div>
            <Table hover striped bordered responsive className="border-primary">
              <thead>
                <tr className="table-primary border-primary">
                  <th style={{ width: 50 }}>#</th>
                  <th>Major Name</th>
                  <th style={{ width: 80 }} />
                </tr>
              </thead>
              <tbody>
                {majors.map((row, idx) => (
                  <tr key={row.id}>
                    <th className="text-center">{page * pageLength + idx + 1}</th>
                    <td>{row.name}</td>
                    <td className="text-center">
                      <a href="/#" className="me-1" onClick={(e) => showEdit(e, row.id)}>
                        <i className="bi-pencil-square text-primary" />
                      </a>
                      <a href="/#" onClick={(e) => handleDelete(e, row.id)}>
                        <i className="bi-trash text-danger" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination className="mb-0 justify-content-end">{pagingItems}</Pagination>
          </Card.Body>
        </Card>
      </Container>
      <Modal show={modalShow} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{formik.values.id > 0 ? "Edit" : "New"} Major</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Input
              label="Major name"
              id="txtMajor"
              type="text"
              required
              lastRow
              frmField={formik.getFieldProps("name")}
              errMessage={formik.touched.name && formik.errors.name}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" disabled={!formik.dirty || !formik.isValid} onClick={formik.handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Major;
