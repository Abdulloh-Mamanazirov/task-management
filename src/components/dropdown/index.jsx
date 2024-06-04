import { Button } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";

function DropdownItem({ children }) {
  return (
    <div role={"button"} className="bg-white w-full py-1.5 px-2 my-1 hover:bg-gray-50">
      {children}
    </div>
  );
}

function Dropdown({ title, items = [] }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  // Close dropdown when clicked outside
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpen]);

  return (
    <div ref={ref} className="w-fit relative">
      <Button onClick={toggleOpen}>
        {title ?? <span className="fa-solid fa-ellipsis" />}
      </Button>
      {isOpen && (
        <div className="bg-white border w-fit z-10 absolute top-full left-0">
          {items.map((item) => (
            <DropdownItem>{item}</DropdownItem>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
