import * as React from 'react';
import { connect } from 'react-redux';

import { setEatAction } from '../../redux/action';

class PureEat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 11,
    };
  }

  changeEatRedux = () => {
    this.props.setEatAction(
      `eat redux time ${new Date().getMinutes()}:${new Date().getSeconds()}`
    );
  };

  render() {
    return (
      <div id="cityGuideHomeEat">
        <p>this is eat</p>
        <p>{this.props.eatReduxData}</p>
        <button onClick={this.changeEatRedux}>changeEatRedux</button>
      </div>
    );
  }
}

// redux
const mapStateToProps = state => {
  console.log(state, 29999);
  return {
    eatReduxData: state.home.eatReduxData,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setEatAction: eatData => dispatch(setEatAction(eatData)),
  };
};
const Eat = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureEat);

export default Eat;
