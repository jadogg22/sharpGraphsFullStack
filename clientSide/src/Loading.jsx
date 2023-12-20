import React from 'react';
import { Spin } from 'antd'; // You can use your preferred loading animation library

const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Spin size="large" />
  </div>
);

export default Loading;
