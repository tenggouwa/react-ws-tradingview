import React from 'react'
import { Route } from 'react-router-dom'

// 路由组建配置
export default (route) => {
    const attrs = {
        path: route.path,
        exact: route.exact,
        render: props => <route.component {...props} routes={route.routes} />
    }
    return <Route {...attrs} />
}
