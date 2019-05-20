import * as React from 'react';
import { connect } from 'react-redux';

import { setListAction } from './redux/action';

class PureList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 11,
    };
  }

  goBack = () => {
    this.props.history.goBack();
  };

  changeHomeRedux = () => {
    this.props.setListAction(
      `home redux time ${new Date().getMinutes()}:${new Date().getSeconds()}`
    );
  };

  render() {
    return (
      <div>
        <p>this is list</p>
        <button onClick={this.goBack}>back</button>
        <p>{this.props.listReduxData}</p>
        <button onClick={this.changeHomeRedux}>changeListRedux</button>
      </div>
    );
  }
}

// redux
const mapStateToProps = state => {
  return {
    listReduxData: state.list.listReduxData,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setListAction: listData => dispatch(setListAction(listData)),
  };
};
const List = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureList);

export default List;
