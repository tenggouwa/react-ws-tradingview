import Loadable from 'react-loadable'
import Loading from '@/components/pageLoading'

// 实现页面组件按需引入
export default function loadableRouter(componentLoad) {
    return Loadable({
        loader: componentLoad,
        loading: Loading,
        delay: 300,
    })
}
