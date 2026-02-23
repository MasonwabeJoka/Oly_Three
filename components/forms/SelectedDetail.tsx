import React from "react";

interface SelectedDetailProps {
  initialValue?: any;
  detail?: string;
  description?: string;
  example?: string | string[];
  register?: any;
  setValue?: any;
  errors?: any;
  handleSubmit?: any;
  handleChange?: any;
  handleBlur?: any;
}

const SelectedDetail: React.FC<SelectedDetailProps> = ({ initialValue }) => {
  return (
    <div>
      <p>Selected Detail: {initialValue}</p>
    </div>
  );
};

export default SelectedDetail;
