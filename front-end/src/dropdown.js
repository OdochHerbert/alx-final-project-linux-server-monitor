import React, { useState } from 'react';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react';

const MyDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CDropdown isOpen={isOpen} onToggle={toggleDropdown}>
      <CDropdownToggle color="primary">
        Dropdown
      </CDropdownToggle>
      <CDropdownMenu>
        <CDropdownItem>Action 1</CDropdownItem>
        <CDropdownItem>Action 2</CDropdownItem>
        <CDropdownItem>Action 3</CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default MyDropdown;
