import React, { Component } from 'react';
import Request from 'superagent';
import _ from 'lodash';
let showCampers;

class Leaderboard extends Component {
  constructor() {
    super();
    this.state = {

      // will hold api response
      showCampers: {},
      // which api call - all-time or last-thirty days
      active: "all-time",
      arrowSlideInClass: ""
    };
    this.showAllTime = this.showAllTime.bind(this);
    this.showThirtyDays = this.showThirtyDays.bind(this);
  }

  showAllTime() {
    const allTimeURL = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
    Request.get(allTimeURL).then((response) => {
      this.setState({showCampers: response.body, active: "all-time"});
    });
  }

  showThirtyDays() {
    const thisMonthURL = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
    Request.get(thisMonthURL).then((response) => {
      this.setState({showCampers: response.body, active: "last-thirty"});
    });
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

  render() {

    // Switch dataset on arrow click
    let arrowClick = function() {
      return this.state.active === "last-thirty"
        ? this.showAllTime()
        : this.showThirtyDays();
    }

    let camperList = _.map(this.state.showCampers, (camper, index) => {
      return <tr key={index}>
        <td className="position">{++index}</td>

        <td className="image-and-name"><img className="image" src={camper.img} style={{
        width: "44px"
      }} alt={camper.username + "'s profile image'"}/>
          <p className="name">
            <a href={"https://www.freecodecamp.com/" + camper.username}>{camper.username}</a>
          </p>
        </td>
        <td className={this.state.active === "all-time"
          ? "active total"
          : "not-active total"}>{camper.alltime}</td>
        <td className={this.state.active === "last-thirty"
          ? "active recent"
          : "not-active recent"} onClick={this.showThirtyDays}>{camper.recent}</td>
      </tr>
    })

    return (
      <div>
        <h1>Leaderboard</h1>
        <div className={"arrow " + this.state.arrowSlideInClass + this.state.active} onClick={arrowClick.bind(this)}></div>
        <table>
          <tbody>
            <tr className="table-head">
              <th>Pos.</th>
              <th className="name-head">Name</th>
              <th className={this.state.active === "all-time"
                ? "all-time active"
                : "all-time not-active"} onClick={this.showAllTime}>All Time</th>
              <th className={this.state.active === "last-thirty"
                ? "last-thirty active"
                : "last-thirty not-active"} onClick={this.showThirtyDays}>This Month</th>
            </tr>
            {camperList}
          </tbody>
        </table>
        <div className="signature">
          <p>by&nbsp;
            <a href="mailto:graham@upexam.ru" target="_top">Graham Kerr</a>
          </p>
        </div>
      </div>
    );
  }
}
export default Leaderboard;
