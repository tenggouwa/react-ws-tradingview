import React from 'react';
import { useHistory } from 'react-router-dom';

import './index.scss';


const PersonalHeader = ({ props }) => {
  const history = useHistory();
  if (props.userAuth === 0) {
    history.push('/login')
  }
  const onCancels = () => {
    history.push('/');
  }
  const onPrevious = () => {
    history.go(-1);
  }
  return (
    <div className="handlePerson">
      <div className="handlePerson-cancel">
        <div onClick={onPrevious}>
          <i className="iconfont icon-fanhuijiantou" />
        </div>
        <div onClick={onCancels}>
          <i className="iconfont icon-cancel01" />
        </div>
      </div>
      <div className="handlePerson-top">
        <span>{props.userAuth && props.userAuth.registerAccount}</span>
        <span className="handlePerson-uid">UID: {props.userAuth && props.userAuth.userId}</span>
      </div>
    </div>
  )
}

export default PersonalHeader