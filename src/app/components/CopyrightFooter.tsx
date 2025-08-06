import React from "react";

function CopyrightFooter() {
  return (
    <div className="footer sm:footer-horizontal footer-center  p-4">
      <aside>
        <p>Copyright © {new Date().getFullYear()} - All right reserved.</p>
      </aside>
    </div>
  );
}

export default CopyrightFooter;
