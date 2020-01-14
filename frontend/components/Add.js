import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import { BrowserRouter, Link } from "react-router-dom";
var querystring = require("querystring");
Modal.setAppElement("#root");

class Add extends React.Component {
  constructor() {
    super();
    this.state = {
      description: "",
      amount: "",
      month: "",
      year: "",
      serverMessage: "",
      isModalOpen: false
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.insertNewExpense = this.insertNewExpense.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({
      isModalOpen: false,
      description: "",
      amount: "",
      month: "Jan",
      year: "2020",
      serverMessage: ""
    });
  }

  componentDidMount() {
    this.setState({
      month: this.props.selectedMonth
    });
    this.setState({
      year: this.props.selectedYear
    });
  }

  handleSelectChange(e) {
    if (e.target.name === "month") {
      this.setState({
        month: e.target.value
      });
    }
    if (e.target.name === "year") {
      this.setState({
        year: e.target.value
      });
    }
  }

  onClick(e) {
    this.insertNewExpense(this);
  }

  insertNewExpense(e) {
    axios
      .post(
        "/insert",
        querystring.stringify({
          description: e.state.description,
          amount: e.state.amount,
          month: e.state.month,
          year: e.state.year
        }),
        { headers: { "Content-type": "application/x-www-form-urlencoded" } }
      )
      .then(function(response) {
        e.setState({ serverMessage: response.data });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  handleTextChange(e) {
    if (e.target.name === "description") {
      this.setState({
        description: e.target.value
      });
    }
    if (e.target.name === "amount") {
      this.setState({
        amount: e.target.value
      });
    }
  }

  render() {
    if (this.state.serverMessage == "") {
      return (
        <div>
          <Button bsstyle="success" bssize="small" onClick={this.openModal}>
            <span className="glyphicon glyphicon-plus margin20"></span>
          </Button>
          <Modal
            isOpen={this.state.isModalOpen}
            onRequestClose={this.closeModal}
            contentLabel="Add Expense"
            className="modal"
          >
            <BrowserRouter>
              <Link
                to={{ pathname: "/", search: "" }}
                style={{ textDecoration: "none" }}
              >
                <Button
                  bsstyle="danger"
                  bssize="mini"
                  onClick={this.closeModal}
                >
                  <span className="closebtn glyphicon glyphicon-remove"></span>
                </Button>
              </Link>
            </BrowserRouter>
            <br />
            <fieldset>
              <label htmlFor="descripton">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={this.state.description}
                onChange={this.handleTextChange}
              ></input>

              <label htmlFor="amount">Amount:</label>
              <input
                type="text"
                id="amount"
                name="amount"
                value={this.state.amount}
                onChange={this.handleTextChange}
              ></input>

              <label htmlFor="month">Month:</label>
              <select
                id="month"
                name="month"
                value={this.state.month}
                onChange={this.handleSelectChange}
              >
                <option value="Jan" id="Jan">
                  January
                </option>
                <option value="Feb" id="Feb">
                  Febrary
                </option>
                <option value="Mar" id="Mar">
                  March
                </option>
                <option value="Apr" id="Apr">
                  April
                </option>
                <option value="May" id="May">
                  May
                </option>
                <option value="Jun" id="Jun">
                  June
                </option>
                <option value="Jul" id="Jul">
                  July
                </option>
                <option value="Aug" id="Aug">
                  August
                </option>
                <option value="Sep" id="Sep">
                  September
                </option>
                <option value="Oct" id="Oct">
                  October
                </option>
                <option value="Nov" id="Nov">
                  November
                </option>
                <option value="Dec" id="Dec">
                  December
                </option>
              </select>

              <label htmlFor="year">Year:</label>
              <select
                id="year"
                name="year"
                value={this.state.year}
                onChange={this.handleSelectChange}
              >
                <option value="2016" id="16">
                  2016
                </option>
                <option value="2017" id="17">
                  2017
                </option>
                <option value="2018" id="18">
                  2018
                </option>
                <option value="2019" id="19">
                  2019
                </option>
                <option value="2020" id="20">
                  2020
                </option>
                <option value="2021" id="21">
                  2021
                </option>
                <option value="2022" id="22">
                  2022
                </option>
                <option value="2023" id="23">
                  2023
                </option>
              </select>
            </fieldset>
            <br />
            <div className="button-center">
              <Button bsstyle="success" bssize="small" onClick={this.onClick}>
                Add New Expense
              </Button>
            </div>
          </Modal>
        </div>
      );
    } else {
      return (
        <div>
          <Button bsstyle="success" bssize="small" onClick={this.openModal}>
            <span className="glyphicon glyphicon-plus margin20"></span>
          </Button>
          <Modal
            isOpen={this.state.isModalOpen}
            onRequestClose={this.closeModal}
            contentLabel="Add Expense"
            className="modal"
          >
            <div className="button-center">
              <h3>{this.state.serverMessage}</h3>
              <BrowserRouter>
                <Link
                  to={{ pathname: "/", search: "" }}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    bsstyle="success"
                    bssize="mini"
                    onClick={this.closeModal}
                  >
                    Close the Dialog
                  </Button>
                </Link>
              </BrowserRouter>
            </div>
          </Modal>
        </div>
      );
    }
  }
} //class ends

export default Add;
