/*
 * @Author: tzy
 * @Date: 2022/9/5 上午9:52
 * @LastEditTime: 2023-12-25 17:58:43
 * @LastEditors: 朱晨光
 * @Description: 包装antd sider
 */
import type { SiderProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
// import classnames from 'classnames';
import React, { useRef } from 'react';

import s from './index.module.less';

export interface MemLayoutSiderProps extends SiderProps {
  /** 最小宽度，默认200 */
  minWidth?: number;
  /** 最大宽度，默认500 */
  maxWidth?: number;
  /** split mouse down */
  onSplitMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** split mouse move */
  onSplitMouseMove?: (event: MouseEvent) => void;
  /** split mouse up */
  onSplitMouseUp?: (event: MouseEvent) => void;
}

const MemSider: React.FC<MemLayoutSiderProps> = (props) => {
  const {
    children,
    className,
    maxWidth = 500,
    minWidth = 200,
    onSplitMouseDown,
    onSplitMouseMove,
    onSplitMouseUp,
    ...rests
  } = props;

  const siderRef = useRef<HTMLDivElement>(null);

  /**
   * 鼠标落下
   * @param event
   */
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    // 起始X
    const { clientX } = event;
    // 起始宽
    const width = siderRef.current?.style.width || '';
    // mouse down回调
    onSplitMouseDown?.(event);

    /**
     * 鼠标移动
     * @param ev
     */
    const handleMouseMove = (ev: MouseEvent) => {
      const { current } = siderRef;
      if (current) {
        // x方向偏移量
        const offsetClientX = ev.clientX - clientX;
        // 计算后的宽度
        const calcWidth = parseInt(width) + offsetClientX;

        // 不在区间内，返回
        if (calcWidth < minWidth || calcWidth > maxWidth) {
          return;
        }

        // px宽度
        const widthPx = `${calcWidth}px`;
        current.style.width = widthPx;
        current.style.maxWidth = widthPx;
        current.style.minWidth = widthPx;
        current.style.flex = `0 0 ${widthPx}`;
      }
      // mouse move回调
      onSplitMouseMove?.(ev);
    };

    /**
     * 鼠标抬起
     */
    const handleMouseUp = (ev: MouseEvent) => {
      // mouse up回调
      onSplitMouseUp?.(ev);

      document.removeEventListener('mousemove', handleMouseMove, true);
      document.removeEventListener('mouseup', handleMouseUp, true);
    };

    document.addEventListener('mousemove', handleMouseMove, true);
    document.addEventListener('mouseup', handleMouseUp, true);
  };

  return (
    <Sider className={`${s.memSider} ${className}`} {...rests} ref={siderRef}>
      {children}
      <div className={s.split} onMouseDown={handleMouseDown} />
    </Sider>
  );
};

export default MemSider;
