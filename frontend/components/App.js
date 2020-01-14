import React from "react";
// import logo from './logo.svg';
import "../css/App.css";
import ReactDOM from "react-dom";
import axios from "axios";
import Add from "./Add";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { selectedMonth: "Jan", selectedYear: "2016", data: [] };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.getData(this, "2016");
  }

  componentsWillReceiveProps(nextProps) {
    console.log("components will receive props - really ?");
    this.getData(this, "2016");
  }

  getData(ev, year) {
    axios.get("/getAll?month=All&year=" + year).then(function(response) {
      ev.setState({ data: response.data });
      ev.setState({ year: parseInt(year) });
      console.log("getData & set state");
    });
    console.log("getData executed");
  }

  render() {
    return (
      <div>
        <Add
          selectedMonth={this.state.selectedMonth}
          selectedYear={this.state.selectedYear}
        />
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="desc-col">Description</th>
              <th className="button-col">Amount</th>
              <th className="button-col">Month</th>
              <th className="button-col">Year</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(function(exp) {
              return (
                <tr>
                  <td className="counterCell"></td>
                  <td className="desc-col">{exp.description}</td>
                  <td className="button-col">{exp.amount}</td>
                  <td className="button-col">{exp.month}</td>
                  <td className="button-col">{exp.year}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
