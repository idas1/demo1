import { useEffect, useState } from "react";
import { Modal, Button, Container, Card, Row, Col, Table } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import Input from "./../components/Input";
import { useRef } from "react";
import Utils from "../helpers/utils";
import api from "../services/api";
import Select from "../components/Select";
import majorService from "../services/majorService";
import studentService from './../services/studentsService';

const Student = () => {
  const defaultImgUrl = "https://restfulapi.dnd-group.net/public/photo-icon.png";
  const [students, setStudents] = useState([]);
  const [majors, setMajors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [imagePreview, setImagePreview] = useState(defaultImgUrl);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const formik = useFormik({
    initialValues: {
      id: 0,
      stuId: "",
      firstName: "",
      lastName: "",
      gender: null,
      phone: "",
      email: "",
      majorId: 0,
      avatar: undefined,
    },
    validationSchema: Yup.object({
      id: Yup.number().required(),
      stuId: Yup.string().required("Required").min(5, "At least 5 characters"),
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      gender: Yup.number().required("Please select gender"),
      phone: Yup.string()
        .required("Required")
        .matches(/^(\d{10,11})$/, "Phone number is invalid"),
      email: Yup.string().email("Email is invalid!"),
      majorId: Yup.number().required("Required").min(1, "Required"),
    }),
    onSubmit: (values) => {
      handleSave(values);
    },
  });

  const handleOpenModal = (e, id) => {
    e.preventDefault();
    if (id > 0) {
      const avatarReq = studentService.getAvatar(id);
      const studentReq = studentService.get(id);
      api.promise([avatarReq, studentReq]).then(
        api.spread((...res) => {
          if (res[0].size > 0) {
            setImagePreview(URL.createObjectURL(res[0]));
            setShowDownload(true);
          } else {
            setImagePreview(defaultImgUrl);
            setShowDownload(false);
          }
          formik.setValues(res[1].data);
          handleModalShow();
        })
      );
    } else {
      formik.resetForm();
      setImagePreview(defaultImgUrl);
      setShowDownload(false);
      handleModalShow();
    }
  };

  useEffect(() => {
    studentService.list().then((res) => {
      setStudents(res.data);
    });
    majorService.list().then((res) => setMajors(res.data));
  }, []);

  const loadData = () => {
    studentService.list().then((res) => {
      setStudents(res.data);
    });
  };

  const handleSave = (data) => {
    if (data.id === 0) {
      studentService.add(data).then((res) => {
        if (res.errorCode === 0) {
          loadData();
          handleModalClose();
          toast.success("Add successful!");
        } else {
          toast.error(res.message);
        }
      });
    } else {
      studentService.update(data.id, data).then((res) => {
        if (res.errorCode === 0) {
          loadData();
          handleModalClose();
          toast.success("Update successful!");
        } else {
          toast.error(res.message);
        }
      });
    }
  };

  const inputFileRef = useRef();
  const handleChangeImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      formik.setFieldValue("avatar", e.target.files[0]);
    }
  };

  const downloadFile = () => {
    studentService.downloadAvatar(formik.values.id).then((res) => {
      if (res.size > 0) {
        Utils.downloadFile(`${formik.values.stuId}.zip`, res);
      } else {
        toast.warn("No avatar to download");
      }
    });
  };

    const handleDelete = (e, id) => {
      e.preventDefault();
    studentService.delete(id).then((res) => {
      if (res.errorCode === 0) {
        loadData();
        toast.warning("A student has been deleted!");
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <>
      <Container className="mt-4">
        <Card className="border-primary bt-5px">
          <Card.Header>
            <Row>
              <Col>
                <h3 className="card-title">
                  Student <small className="text-muted">list</small>
                </h3>
              </Col>
              <Col xs="auto">
                <Button variant="primary" onClick={(e) => handleOpenModal(e, 0)}>
                  <i className="fas fa-plus"></i> Add
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Table responsive bordered hover className="mb-0 border-primary">
              <thead className="table-primary border-primary">
                <tr>
                  <th style={{ width: "50px" }} className="text-center">
                    #
                  </th>
                  <th>Student Id</th>
                  <th>Fullname</th>
                  <th>Gender</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th style={{ width: "80px" }} className="text-center"></th>
                </tr>
              </thead>
              <tbody>
                {students.map((row, idx) => (
                  <tr key={row.id}>
                    <th className="text-center">{idx + 1}</th>
                    <td>{row.stuId}</td>
                    <td>
                      {row.lastName} {row.firstName}
                    </td>
                    <td className="text-center">
                      <i
                        className={`${row.gender ? "bi-gender-male text-success" : "bi-gender-female text-warning"}`}
                      ></i>
                    </td>
                    <td>{row.phone}</td>
                    <td>{row.email}</td>
                    <td className="text-center">
                      <a href="/#" className="me-1" onClick={(e) => handleOpenModal(e, row.id)}>
                        <i className="bi-pencil-square text-primary"></i>
                      </a>
                      <a href="/#" onClick={(e) => handleDelete(e, row.id)}>
                        <i className="bi-trash text-danger"></i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>

      {/* <!-- Modal --> */}
      <Modal show={showModal} onHide={handleModalClose} backdrop="static" size="lg" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{formik.values.id > 0 ? "Update" : "New"} Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm="4" className="text-center">
              <img src={imagePreview} alt="" className="img-thumbnail rounded-circle border-primary d-block" />
              <input ref={inputFileRef} type="file" accept="image/*" className="d-none" onChange={handleChangeImage} />
              <div className="mt-3">
                <Button variant="primary" size="sm" onClick={() => inputFileRef.current.click()}>
                  Change
                </Button>
                <Button variant="warning" hidden={!showDownload} size="sm" className="ms-1" onClick={downloadFile}>
                  Download
                </Button>
              </div>
            </Col>
            <Col sm>
              <Input
                type="text"
                id="txtId"
                label="Student Id"
                inputSize={6}
                maxLength="30"
                required
                frmField={formik.getFieldProps("stuId")}
                err={formik.touched.stuId && formik.errors.stuId}
                errMessage={formik.errors.stuId}
              />
              <div className="row mb-3">
                <label htmlFor="txtLastName" className="col-sm-3 col-form-label required">
                  Full name
                </label>
                <div className="col-sm col-lg-6">
                  <input
                    type="text"
                    className={`form-control ${formik.touched.lastName && formik.errors.lastName ? "is-invalid" : ""}`}
                    id="txtLastName"
                    placeholder="Last name"
                    {...formik.getFieldProps("lastName")}
                  />
                  <div className="invalid-feedback">{formik.errors.lastName}</div>
                </div>
                <div className="col-sm">
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.firstName && formik.errors.firstName ? "is-invalid" : ""
                    }`}
                    id="txtFirstName"
                    placeholder="First name"
                    {...formik.getFieldProps("firstName")}
                  />
                  <div className="invalid-feedback">{formik.errors.firstName}</div>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="radMale" className="col-sm-3 col-form-label required">
                  Gender
                </label>
                <div className="col-sm">
                  <div className="col-form-label">
                    <div className="form-check form-check-inline">
                      <input
                        className={`form-check-input ${formik.errors.gender ? "is-invalid" : ""}`}
                        type="radio"
                        name="gender"
                        id="radMale"
                        onChange={() => formik.setFieldValue("gender", 1)}
                        checked={formik.values.gender === 1}
                      />
                      <label className="form-check-label" htmlFor="radMale">
                        Male
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className={`form-check-input ${formik.errors.gender ? "is-invalid" : ""}`}
                        type="radio"
                        id="radFeMale"
                        name="gender"
                        onChange={() => formik.setFieldValue("gender", 0)}
                        checked={formik.values.gender === 0}
                      />
                      <label className="form-check-label" htmlFor="radFeMale">
                        Female
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <Input
                type="tel"
                id="txtPhone"
                label="Phone"
                inputSize={6}
                required
                autoComplete="off"
                maxLength="20"
                frmField={formik.getFieldProps("phone")}
                err={formik.touched.phone && formik.errors.phone}
                errMessage={formik.errors.phone}
              />
              <Input
                type="email"
                id="txtEmail"
                label="Email"
                autoComplete="off"
                frmField={formik.getFieldProps("email")}
                err={formik.touched.email && formik.errors.email}
                errMessage={formik.errors.email}
              />
              <Select
                id="drpMajor"
                label="Major"
                values={majors}
                inputSize={6}
                required
                lastRow
                frmField={formik.getFieldProps("majorId")}
                err={formik.touched.majorId && formik.errors.majorId}
                errMessage={formik.errors.majorId}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit} disabled={!formik.dirty || !formik.isValid}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Student;
