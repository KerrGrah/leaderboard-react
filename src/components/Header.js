import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <a href="https://www.freecodecamp.com/"><img id="logo" alt="freecodecamp logo" src='https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg' /></a>
      </div>
    );
  }
}
export default Header;
