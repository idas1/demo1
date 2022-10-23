import React from "react";
import { useEffect, useState } from "react";
import {Card, Row, Col, Button, Table } from "react-bootstrap";
import majorService from "../services/majorService";
import studentService from './../services/studentsService';
// import Input from './../components/Input';
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { toast } from "react-toastify";

const Product = () => {

//   const handleSubmit = (data) => {
//     if (data.id === 0) {
//       majorService.add(data).then((res) => {
//         if (res.errorCode === 0) {
//           loadData();
//           handleModalClose();
//           toast.success("Add successful");
//         } else toast.error(res.message);
//       });
//     } else {
//       majorService.update(data.id, data).then((res) => {
//         if (res.errorCode === 0) {
//           loadData();
//           handleModalClose();
//           toast.success("Update successful");
//         } else toast.error(res.message);
//       })
//     }
//  };

  // const [modalShow, setShowModal] = useState(false);

  // const handleModalClose = () => setShowModal(false);
  // const handleModalShow = () => setShowModal(true);


  const loadData = (e) => {
    studentService.list().then((res) => {
     setMajors(res.data);
   })
 };

    
  // const handleOpenModal = (e, id) => {
  //   if (e) e.preventDefault();  
  //     if (id > 0) {
  //       majorService.get(id).then((res) => {
  //         formik.setValues(res.data);
  //         handleModalShow();
  //       })
  //     } else {
  //       formik.resetForm();
  //       handleModalShow();
  //     }
  // };

  const handleDelete = (e, id) => {
    e.preventDefault();
    studentService.remove(id).then((res) => {
      if (res.errorCode === 0) {
        loadData();
      }
    });
  }

  
  const [students, setStudents] = useState([]);
  const [majors, setMajors] = useState([]);


//   Calling API
    useEffect(() => {
      studentService.list().then((res) => {
          setStudents(res.data);
        });
        majorService.list().then((res) => setMajors(res.data));
    }, []);


    // Formik

    // const formik = useFormik({
    //   initialValues: {
    //     id: 0,
    //     name:"",
    //   },
    //   validationSchema: Yup.object({
    //     id: Yup.number().required(),
    //     name: Yup.string().required("Required").min(5, ">= 5 characters"),
    //   }),
    //   onSubmit: (values) => {
    //     handleSubmit(values);
    //   }
    // });
  return (
    <>
        <Card className="border-dark bt-5px">
          <Card.Header>
            <Row>
              <Col>
                <h3 className="card-title">Danh Sách Sản Phẩm</h3>
              </Col>
              <Col xs="auto">
                <Button
                  variant="primary"
                >
                  <i className="bi bi-plus-circle"></i> Add
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <div className="row">
              <div className="col">
                <div className="g-1 row">
                  <label className="col-form-label col-sm-auto">Hiển Thị</label>
                  <div className="col-sm-auto">
                    <select className="form-select">
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                    </select>
                  </div>
                  <label className="col-form-label col-sm-auto">Sản Phẩm</label>
                </div>
              </div>
              <div className="col-auto">
                <input
                  placeholder="Tìm Kiếm Sản Phẩm..."
                  className="form-control"
                  type="text"
                />
              </div>
            </div>
            <Table responsive bordered hover className="mb-0 border-primary mt-4">
              <thead className="table-body border-dark">
                <tr className="text-center">
                  <th style={{ width: "8%" }}>
                    ID Sản Phẩm
                  </th>
                  <th style={{ width: "14%" }}>Tên Sản Phẩm</th>
                  <th style={{ width: "8%" }}>Ảnh</th>
                  <th style={{ width: "5%" }}>Số Lượng</th>
                  <th style={{ width: "8%" }}>Tình Trạng</th>
                  <th style={{ width: "10%" }}>Giá Tiền</th>
                  <th style={{ width: "8%" }}>Danh Mục</th>
                  <th style={{ width: "6%" }}>Chức Năng</th>
                </tr>
              </thead>

              
              <tbody className="border-dark">
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
                    <td></td>
                    <td className="text-center">
                      <a href="/#" className="me-1">
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

        
    </>
  );
};

export default Product;
