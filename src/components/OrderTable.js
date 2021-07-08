import React, { Component } from "react";
import requireAuth from "./requireAuth";
import { Table, Container, Modal, Button } from "react-bootstrap";
import axios from "axios";
import moment from "moment"
import AddOrderModel from "./AddOrderModel";
import { toast} from 'react-toastify';
import "./HeaderStyle.css";

class OrderTable extends Component {
  state = {
    show: false,
    data: [],
    current:{}
  };
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  fetchOrders = async () => {
    const response = await axios.get("http://localhost:8000/order", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.data)
    this.setState({ data: response.data });
  };

  deleteOrder = async (id) => {
    try{
      await axios.delete(`http://localhost:8000/order/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch(e){
      toast.error("Unable to delete")
    }
   
    this.fetchOrders()
  };

  componentDidMount() {
    this.fetchOrders();
  }

  render() {
    return (
      <React.Fragment>
        <AddOrderModel
          show={this.state.show}
          handleShow={this.handleShow}
          handleClose={this.handleClose}
          fetchOrders={this.fetchOrders}
          current={this.state.current}
        />
        <Container className="marginTop">
          <Button variant="primary" onClick={this.handleShow}>
            Add Order
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Buyer's Name</th>
                <th>Buyer's Phone</th>
                <th>Due Date</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
                <th>Amount</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((val, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{val.buyerName}</td>
                  <td>{val.buyerPhone}</td>
                  <td>{moment(val.dueDate).format("DD-MM-YYYY")}</td>
                  <td>{val.address.city}</td>
                  <td>{val.address.state}</td>
                  <td>{val.address.country}</td>
                  <td>{val.amount}</td>
                  <td><Button variant="secondary" onClick={()=>{this.deleteOrder(val._id)}}>Delete</Button></td>
                  <td><Button variant="primary" onClick={()=>{this.setState({current:val},()=>{
                    this.handleShow()
                  })}}>Edit</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </React.Fragment>
    );
  }
}

export default requireAuth(OrderTable);
