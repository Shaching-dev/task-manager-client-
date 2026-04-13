import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* <h3>Home</h3> */}
      <h3>Hello</h3>

      <p>
        h-screen on the sidebar wrapper — without a fixed height the flex
        container grows infinitely and never triggers scroll flex-shrink-0 on
        top/bottom sections — prevents them from being squished when the list is
        long; only the flex-1 overflow-y-auto middle div will scroll Your
        min-h-0 on the scroll wrapper is already correct (it overrides the
        default min-height: auto that blocks flex children from shrinking below
        their content size).
      </p>
    </div>
  );
};

export default Home;
