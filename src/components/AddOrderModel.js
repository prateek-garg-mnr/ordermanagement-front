import React, { useEffect } from "react";
import axios from "axios";
import { Modal, Form } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "../actions";
import { toast } from "react-toastify";

function AddOrderModel(props) {
  useEffect(() => {
    if(Object.keys(props.current).length > 0){
      let {city,state,country} = props.current.address
      props.initialize({...props.current,city,state,country});
    }
    console.log(props)
  },[props.current]);
  const onSubmit = async (data) => {
    if (
      !data.amount ||
      !data.dueDate ||
      !data.city ||
      !data.state ||
      !data.country ||
      !data.buyerName ||
      !data.buyerPhone
    ) {
        toast.error("all fields are required")
      return;
    }
    try{
      if(Object.keys(props.current).length>0){

        const response = await axios.patch(`http://localhost:8000/order/${props.current._id}`, data, {
          headers: {
            Authorization: `Bearer ${props.state.auth.authenticated}`,
          },
        });
      } else {
        const response = await axios.post("http://localhost:8000/order", data, {
          headers: {
            Authorization: `Bearer ${props.state.auth.authenticated}`,
          },
        });
      }
       
          props.fetchOrders();
          props.handleClose();
    } catch(e){
        toast.error(e.response.data.error.message);
    }
    
  };
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={props.handleSubmit(onSubmit)}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Due Date
            </label>
            <Field
              className="form-control"
              name="dueDate"
              type="date"
              component="input"
              autoComplete="none"
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              City
            </label>
            <Field
              className="form-control"
              name="city"
              type="text"
              component="input"
              autoComplete="none"
              value='ehll'
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              State
            </label>
            <Field
              className="form-control"
              name="state"
              type="text"
              component="input"
              autoComplete="none"
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Country
            </label>
            <Field
              className="form-control"
              name="country"
              type="text"
              component="input"
              autoComplete="none"
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Amount
            </label>
            <Field
              className="form-control"
              name="amount"
              type="number"
              component="input"
              autoComplete="none"
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Buyer Name
            </label>
            <Field
              className="form-control"
              name="buyerName"
              type="text"
              component="input"
              autoComplete="none"
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Buyer Phone
            </label>
            <Field
              className="form-control"
              name="buyerPhone"
              type="number"
              component="input"
              autoComplete="none"
            />
          </div>
          <Modal.Footer>
            <button className="btn btn-primary">{Object.keys(props.current).length===0?"Add":"Update"}</button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage, state };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "addOrder" })
)(AddOrderModel);
