import React from 'react';

import './index.scss'

export default function Tab ({ dataSource = [], current = '', currentChange = {} }) {
  const handleChangeTab = (current) => {
    currentChange(current);
  }

  return (
    <div className="inviteTab">
      <ul>
        {
          dataSource.map(tabItem => (
            <li
              key={tabItem.value}
              className={current === tabItem.value ? 'active-tab' : ''}
              onClick={() => handleChangeTab(tabItem.value)}
            >
              {tabItem.label}
            </li>
          ))
        }
      </ul>
    </div>
  )
};
