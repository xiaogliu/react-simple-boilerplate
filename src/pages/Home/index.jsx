import * as React from 'react';
import { connect } from 'react-redux';

import { setHomeAction } from './redux/action';
import Eat from './components/Eat/index';

class PureHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 11,
    };
  }

  changeHomeRedux = () => {
    this.props.setHomeAction(
      `home redux time ${new Date().getMinutes()}:${new Date().getSeconds()}`
    );
  };

  render() {
    return (
      <div id="cityGuideHome">
        <p>this is home</p>
        <p>{this.props.homeReduxData}</p>
        <button onClick={this.changeHomeRedux}>changeHomeRedux</button>
        <Eat />
      </div>
    );
  }
}

// redux
const mapStateToProps = state => {
  console.log(state, 29999);
  return {
    homeReduxData: state.home.homeReduxData,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setHomeAction: homeData => dispatch(setHomeAction(homeData)),
  };
};
const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureHome);

export default Home;
