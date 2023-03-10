import { useMemo } from "react";
import { v4 as uuiv4 } from "uuid";

export const Button = ({ type, children }) => {
  const id = useMemo(() => uuiv4(), []);

  return <button type={type}>{children}</button>;
};
