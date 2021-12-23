import React from 'react'
import { Carousel } from 'antd';
import './index.scss'

const CommonBanner = ({ dataSource = [], height }) => {
  const bannerHeight = `${height}px`;
  return (
    <div className="Carousel">
      {
        dataSource.length > 0 ? (
          <Carousel autoplay>
            {
              dataSource.map((item, index) => {
                const style = {
                  with: '100%',
                  height: bannerHeight,
                  background: `url(${item.url}) center center / auto 100% no-repeat`
                }
                return (
                  <div key={index}>
                    <div className="commonBanner-item" style={ style } />  
                  </div>
                )
              })
            }
          </Carousel>
        ) : (
          <div style={{ height: bannerHeight }} /> 
        )
      }
    </div>
  )
}

export default CommonBanner
