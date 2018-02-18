import React, { Component } from "react";
import { fccAPIurl } from "../config";
import CamperRow from "./camperRow";

class Leaderboard extends Component {
  constructor() {
    super();
    this.state = {
      // will hold api response
      campersList: [],
      // which api call - all-time or last-thirty days
      active: "all-time",
      arrowSlideInClass: ""
    };
  }

  componentDidMount() {
    this.showAllTime();

    // Add class to arrow for slide-in effect
    this.addClass = setTimeout(() => {
      this.setState({ arrowSlideInClass: "slide-in " });
    }, 800);
  }

  componentWillUnmount() {
    if (this.addClass) {
      clearTimeout(this.addClass);
    }
  }

  showAllTime = () => {
    this.fetchData("alltime").then(response => {
      this.setState(() => ({ campersList: response, active: "all-time" }));
    });
  };

  fetchData = param => fetch(`${fccAPIurl}${param}`).then(res => res.json());

  showThirtyDays = () => {
    this.fetchData("recent").then(response => {
      this.setState(() => ({ campersList: response, active: "last-thirty" }));
    });
  };

  arrowClick = () => {
    return this.state.active === "last-thirty"
      ? this.showAllTime()
      : this.showThirtyDays();
  };

  render() {
    const campersMapped = this.state.campersList.map((camper, index) => {
      return (
        <CamperRow active={this.state.active} camper={camper} index={++index} />
      );
    });

    return (
      <section>
        <h1>Leaderboard</h1>
        <div
          className={
            "arrow " + this.state.arrowSlideInClass + this.state.active
          }
          onClick={this.arrowClick}
        />
        <table>
          <tbody>
            <tr className="table-head">
              <th>Pos.</th>
              <th className="name-head">Name</th>
              <th
                className={
                  this.state.active === "all-time"
                    ? "all-time active"
                    : "all-time not-active"
                }
                onClick={this.showAllTime}
              >
                All Time
              </th>
              <th
                className={
                  this.state.active === "last-thirty"
                    ? "last-thirty active"
                    : "last-thirty not-active"
                }
                onClick={this.showThirtyDays}
              >
                This Month
              </th>
            </tr>
            {campersMapped}
          </tbody>
        </table>
        <div className="signature">
          <p>
            by&nbsp;
            <a href="mailto:graham@upexam.ru" target="_top">
              Graham Kerr
            </a>
          </p>
        </div>
      </section>
    );
  }
}
export default Leaderboard;
