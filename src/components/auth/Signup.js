import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { toast } from "react-toastify";
import { Container, Button } from "react-bootstrap";

class Signup extends Component {
  onSubmit = formProps => {
    this.props.signup(formProps, () => {
      this.props.history.push('/feature');
    });
  };

  componentDidMount(){
    if(this.props.state.auth.authenticated){
      this.props.history.push("/feature")
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (<Container >
      <form onSubmit={handleSubmit(this.onSubmit)}>

      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">
          Name
        </label>
        <Field
          className="form-control"
          name="name"
          type="text"
          component="input"
          autoComplete="none"
        />
      </div>

      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">
          email
        </label>
        <Field
          className="form-control"
          name="email"
          type="email"
          component="input"
          autoComplete="none"
        />
      </div>

      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">
          Country
        </label>
        <Field
          className="form-control"
          name="password"
          type="password"
          component="input"
          autoComplete="none"
        />
      </div>
      <div>{this.props.errorMessage}</div>
      <button className="primary">Submit</button>
    </form></Container>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage,state };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signup' })
)(Signup);
