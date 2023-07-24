import React from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import FindingIndexComponent from "./FindingIndexComponent";
import GosooComponent from "./GosooComponent";

export default function FindingComponent() {
  return (
    <div id="finding">
      <Routes>
      <Route path="" element={<FindingIndexComponent />} />
              <Route path="/:id" element={<GosooComponent />} />
              </Routes>
      <Outlet/>
    </div>
  );
}
