import React, { useState, useEffect, useRef } from "react";
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";

const MultiSelectDropdown = ({
    id,
    name,
    label,
    placeholder = "Search Data",
    options = [],
    selectedItems = [],
    onSelectionChange,
    activeTheme = { hoverColor: "#e0f2fe" },
    noDataMessage = "No records found",
    isMandatory,
    searchWithName = ''
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isHovered, setIsHovered] = useState(null);

    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);


    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleCheckboxChange = (e) => {
        const { checked, dataset } = e.target; // Extract the state and metadata
        const itemId = dataset.id; // Extract item ID from the data attribute
        const itemName = dataset.name; // Extract item name from the data attribute


        if (checked) {
            const newItem = { id: itemId, deptName: itemName }; // Create a new item object
            onSelectionChange([...selectedItems, newItem]);
        } else {
            onSelectionChange(selectedItems.filter((selected) => selected.id !== itemId));
        }
    };


    const filteredOptions = options.filter((option) => {
        const searchField = option[searchWithName]; // Dynamically access the property
        return (
            searchField &&
            typeof searchField === "string" &&
            searchField.toLowerCase().includes(searchTerm)
        );
    });


    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    return (
        <div ref={dropdownRef}>

            {/* Input Field */}
            <div className="relative">
                <div
                    className={`inputPeerField ${isMandatory ? "border-b-red-500" : "border-borderColor"
                        } flex justify-between items-center cursor-pointer`}
                    onClick={toggleDropdown}
                >
                    <input
                        type="text"
                        id={id}
                        name={name}
                        value={`${selectedItems?.length !== 0 ? selectedItems?.length : ''} item selected`}
                        readOnly
                        placeholder={placeholder}
                        className={`border-none outline-none`}
                    />
                    <div>
                        {isOpen ? (
                            <RiArrowDropUpLine className="text-xl" />
                        ) : (
                            <RiArrowDropDownLine className="text-xl" />
                        )}
                    </div>
                </div>
                <label
                    htmlFor={id}
                    className={`menuPeerLevel font-semibold ${selectedItems?.length !== 0 ? "-mt-[3px]" : "mt-[10px] text-gray-800"
                        }`}
                >
                    {label}
                </label>
            </div>


            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute border-[1px] mt-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                    {/* Search Input */}
                    <div className="p-2">
                        <input
                            type="search"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full border-[1px] rounded-md px-2 py-1 outline-none"
                        />
                    </div>

                    <ul>
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => {
                                const isChecked = selectedItems.some((item) => item.id === option.id.toString());

                                return (
                                    <li
                                        key={option.id}
                                        className="my-1 px-2 py-1 cursor-pointer flex items-center gap-2"
                                        onMouseEnter={() => setIsHovered(index)}
                                        onMouseLeave={() => setIsHovered(null)}
                                        onClick={() =>
                                            handleCheckboxChange({
                                                target: {
                                                    checked: !isChecked,
                                                    dataset: { id: option.id.toString(), name: option.deptName },
                                                },
                                            })
                                        }
                                        style={{
                                            background:
                                                isHovered === index ? activeTheme?.subMenuColor : "transparent",
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            data-id={option.id.toString()} // Ensure string format
                                            data-name={option.deptName}
                                            checked={isChecked} // Compare as strings
                                            onChange={(e) => handleCheckboxChange(e)} // Handle checkbox change
                                            onClick={(e) => e.stopPropagation()} // Prevent <li> click when clicking checkbox
                                        />
                                        <span>{option.deptName}</span>
                                    </li>
                                );
                            })
                        ) : (
                            <li className="py-4 text-gray-500 text-center">{noDataMessage}</li>
                        )}

                    </ul>

                </div>
            )}
        </div>
    );
};

export default MultiSelectDropdown;
