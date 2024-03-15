import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { CiLogin } from 'react-icons/ci'; // Assuming CiLogin is an icon component for logout
import { navigate } from 'react-router-dom'; // Assuming navigate is used for routing

const Sidebar = ({ tab, setTab, side, setSide }) => {
  const tabs = [
    { tab: "dashboard", tabName: "Dashboard" },
    { tab: "documentsList", tabName: "Documents" },
    { tab: "clients", tabName: "Clients", dropdown: ["Client 1", "Client 2", "Client 3"] },
    { tab: "sendRequest", tabName: "Send Request" },
    { tab: "sendDocument", tabName: "Send Document" }
  ];

  const [dropdownOpen, setDropdownOpen] = useState("");

  const toggleDropdown = (tab) => {
    if (dropdownOpen === tab) {
      setDropdownOpen("");
    } else {
      setDropdownOpen(tab);
    }
  };

  return (
    <div className={`sidebar bg-dark justify-content-between  d-flex flex-column shadow ${side ? '' : 'closed'}`}>
      <div className="d-flex flex-column">
        {tabs.map(data => (
          <div key={data.tab} className="dropdown-container">
            <div
              className={`tab mb-2 ${tab === data.tab ? "tab-actived" : ""}`}
              onClick={() => {
                if (data.dropdown) {
                  toggleDropdown(data.tab);
                } else {
                  setTab(data.tab);
                  setDropdownOpen("");
                  setSide(false);
                }
              }}
            >
              <div className="tab-content">
                <span>{data.tabName}</span>
                {data.dropdown && (
                  <FiChevronDown className={`dropdown-arrow ${dropdownOpen === data.tab ? 'open' : ''}`} />
                )}
              </div>
            </div>
            {data.dropdown && dropdownOpen === data.tab && (
              <div className="dropdown-options">
                {data.dropdown.map(option => (
                  <div
                    key={option}
                    className={`dropdown-option ${tab === option ? "tab-actived" : ""}`}
                    onClick={() => {
                      setTab(option);
                      setDropdownOpen("");
                      setSide(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={`tab mb-2 mb-5 `} style={{ backgroundColor: "#b3ecff", border: "2px solid black", borderRadius: "3px" }} onClick={() => { navigate('/') }}>
        <span><CiLogin /></span>
        <span>logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
