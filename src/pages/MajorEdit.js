import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import Input from "./../components/Input";
import majorService from "./../services/majorService";

const MajorEdit = () => {
  const [major, setMajor] = useState({ id: 0, name: "" });
  const [message, setMessage] = useState("");
  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (param.id > 0) {
      majorService.get(param.id).then((res) => {
        if (res.errorCode === 0) setMajor(res.data);
      });
    }
  }, [param.id]);

  const backHandler = () => {
    navigate("/major");
  };

  const changeEventHandler = (e) => {
    const newMajor = { ...major };
    newMajor[e.target.name] = e.target.value;
    setMajor(newMajor);
  };

  const submitHandler = () => {
    if (major.id > 0) {
      // update
      majorService.update(major.id, major).then((res) => {
        if (res.errorCode === 0) {
          navigate("/major");
        } else {
          setMessage(res.message);
        }
      });
    } else {
      // add
      majorService.add(major).then((res) => {
        if (res.errorCode === 0) {
          navigate("/major");
        } else {
          setMessage(res.message);
        }
      });
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card border-primary bt-5">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <h3 className="card-title">
                    Major <small className="text-muted">{major.id > 0 ? "Edit" : "New"}</small>
                  </h3>
                </div>
              </div>
            </div>
            <div className="card-body">
              <p className="text-danger text-center">{message}</p>
              <form>
                <Input
                  label="Major name"
                  id="txtMajor"
                  onChange={changeEventHandler}
                  name="name"
                  defaultValue={major.name}
                />
              </form>
            </div>
            <div className="card-footer text-center">
              <CustomButton onClick={backHandler} color="secondary" className="me-1">
                Back
              </CustomButton>
              <CustomButton onClick={submitHandler} color="primary">
                Save
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MajorEdit;
