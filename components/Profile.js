import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { ComingSoon } from './ComingSoon';
import PageHeader from './PageHeader';
import UserData from './UserData';
import Sidebar from './Sidebar';

class Profile extends Component {
  state = {
    userData: {}
  };

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    const userId = parseInt(params.userId, 10);

    this.props.actions.getUserList().then(() => {
      const userData = this.props.users.find(user => user.id === userId);
      this.setState({ users: this.props.users, userData });
    });
  }

  render() {
    const { match } = this.props;

    return (
      <div className="profile-cont">
        <Sidebar matchUrl={match.url} />
        <div className="main-cont">
          <PageHeader userData={this.state.userData} />
          <Routes>
            <Route path={match.path + '/profile'}>
              <UserData userData={this.state.userData} />
            </Route>
            <Route path={match.path + '/posts'} elements={<ComingSoon/>} />
            <Route path={match.path + '/gallery'} elements={<ComingSoon/>} />
            <Route path={match.path + '/todo'} elements={<ComingSoon/>} />
            {/* <Route path={match.path + '/'}>
              <Profile userData={this.state.userData} />
            </Route> */}
          </Routes>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.users
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);