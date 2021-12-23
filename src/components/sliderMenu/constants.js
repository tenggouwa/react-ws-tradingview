import OPTONS from '../../reducers/options.js';

const SLIDER_BTN = [
  {
    id: 1,
    btnName: '登录'
  },
  {
    id: 2,
    btnName: '注册'
  }
];

const CONFIG_ROUTER = [
  {
    pid: 1,
    children: [
      {
        pathName: '/community/home',
        name: '社区',
        imgUrl: require('@/assets/img/menu/community-icon.png'),
        key: 1
      },
      {
        pathName: '/property/coinAccount',
        name: '资产',
        imgUrl: require('@/assets/img/menu/amount-icon.png'),
        key: 2
      },
      {
        href: `${OPTONS.appDownLoad}`,
        hrefName: '下载',
        imgUrl: require('@/assets/img/menu/download-icon.png'),
        key: 3
      },
    ]
  },
  {
    pid: 2,
    children: [
      {
        pathName: '/personal',
        name: '身份认证',
        key: 3,
        imgUrl: require('@/assets/img/menu/id-icon.png'),
      },
      {
        name: '基础信息',
        imgUrl: require('@/assets/img/menu/amount-icon.png'),
        key: 0,
        child: [
          {
            childName: '邮箱',
            routerName: '已绑定',
            childId: 1
          }
        ]
      },
      {
        name: '安全密码设置',
        imgUrl: require('@/assets/img/menu/download-icon.png'),
        key: 1,
        child: [
          {
            childName: '登录密码',
            link: '/changelogin',
            routerName: '修改',
            childId: 1
          },
          {
            childName: '资金密码',
            forgetRouterName: '忘记密码',
            forgetLink: '/bindpassword',
            setRouterName: '设置',
            setLink: '/bindpassword',
            updateRouterName: '修改',
            updateLink: '/changepassword',
            childId: 2
          }
        ]
      },
      {
        name: '退出',
        key: 2,
        imgUrl: require('@/assets/img/menu/loginOut-icon.png'),
        pathName: '/',
        symbol: true
      }
    ]
  }
];

export {
  SLIDER_BTN,
  CONFIG_ROUTER
};
