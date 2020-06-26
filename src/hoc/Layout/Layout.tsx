import React from "react";

interface Props {
  children: React.ReactNode;
}

const Layout = (props: Props) => {
  return (
    <div>
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
