import BottomImg from '@/assets/img/trade/bottom.png';
import CenterImg from '@/assets/img/trade/center.png';
import TopImg from '@/assets/img/trade/top.png';

const ORDER_TYPE = [{
  label: '委托列表',
  value: '0',
}, {
  label: '实时成交',
  value: '1',
}];


const TAB_LIST = [{
  label: CenterImg,
  value: '0'
}, {
  label: BottomImg,
  value: '1'
}, {
  label: TopImg,
  value: '2'
}]

export {
  ORDER_TYPE,
  TAB_LIST
};