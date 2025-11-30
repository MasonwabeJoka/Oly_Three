import React from 'react';

interface SelectedDetailProps {
  initialValue?: any;
}

const SelectedDetail: React.FC<SelectedDetailProps> = ({ initialValue }) => {
  return (
    <div>
      <p>Selected Detail: {initialValue}</p>
    </div>
  );
};

export default SelectedDetail;