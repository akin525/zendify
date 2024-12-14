/* eslint-disable  @typescript-eslint/no-explicit-any */
import { TransformDataOptions, transformData } from "@/utils";
import React from "react";

interface DisplayObjectProps {
  data: { [key: string]: any };
  options?: TransformDataOptions;
}

export const DisplayObject: React.FC<DisplayObjectProps> = ({
  data,
  options,
}) => {
  const transformedData = transformData(data, options);

  return (
    <div>
      {transformedData.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
};
