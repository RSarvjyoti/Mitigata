import React, { useEffect, useState } from "react";
import { data as userData } from "../../db";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const AllUsers = () => {
  const [data, setData] = useState(userData);
  const [filteredData, setFilteredData] = useState(userData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    applyFilters();
  }, [searchTerm, statusFilter, startDate, endDate]);

  // Apply Filters
  const applyFilters = () => {
    let filtered = userData;

    if (searchTerm) {
      filtered = filtered.filter((user) =>
        user.about.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((user) => user.about.status === statusFilter);
    }

    if (startDate && endDate) {
      filtered = filtered.filter(
        (user) =>
          new Date(user.details.date) >= new Date(startDate) &&
          new Date(user.details.date) <= new Date(endDate)
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  // Reset Filters
  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setStartDate("");
    setEndDate("");
    setFilteredData(userData);
    setCurrentPage(1);
  };

  // Sorting Function
  const handleSort = (column) => {
    const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(order);

    const sortedData = [...filteredData].sort((a, b) => {
      const valueA = a.about[column] || a.details[column];
      const valueB = b.about[column] || b.details[column];

      if (typeof valueA === "string") {
        return order === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        return order === "asc" ? valueA - valueB : valueB - valueA;
      }
    });

    setFilteredData(sortedData);
  };

  // Pagination
  const totalPages = Math.ceil(filteredData.length / usersPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  // Update User Status
  const updateStatus = (id, newStatus) => {
    const updatedData = data.map((user) =>
      user.id === id ? { ...user, about: { ...user.about, status: newStatus } } : user
    );
    setData(updatedData);
    setFilteredData(updatedData);
  };

  // Calculate Percentage of Inactive & Blocked Users
  const inactiveBlockedUsers = data.filter(
    (user) => user.about.status === "INACTIVE" || user.about.status === "BLOCKED"
  ).length;
  const inactiveBlockedPercentage = ((inactiveBlockedUsers / data.length) * 100).toFixed(2);

  return (
    <div>
      {/* Filters Section */}
      <div>
        <input
          type="text"
          placeholder="Search Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Status</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
          <option value="BLOCKED">BLOCKED</option>
          <option value="INVITED">INVITED</option>
        </select>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button onClick={resetFilters}>Clear Filters</button>
      </div>
      <h4>Inactive & Blocked Users: {inactiveBlockedPercentage}%</h4>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>
              Name <BiMenuAltLeft />
            </th>
            <th onClick={() => handleSort("email")}>
              Email <BiMenuAltLeft />
            </th>
            <th onClick={() => handleSort("date")}>
              Start Date <BiMenuAltLeft />
            </th>
            <th onClick={() => handleSort("invitedBy")}>
              Invited By <BiMenuAltLeft />
            </th>
            <th onClick={() => handleSort("status")}>
              Status <BiMenuAltLeft />
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map(({ id, about, details }) => (
            <tr key={id}>
              <td>{about.name}</td>
              <td>{about.email}</td>
              <td>{details.date}</td>
              <td>{details.invitedBy}</td>
              <td>
                <button>{about.status}</button>
              </td>
              <td>
                <select onChange={(e) => updateStatus(id, e.target.value)}>
                  <option value="">Change Status</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                  <option value="BLOCKED">BLOCKED</option>
                  <option value="INVITED">INVITED</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div>
        <button onClick={handlePrev} disabled={currentPage === 1}>
          <IoIosArrowBack />
        </button>
        <h5>
          {currentPage} / {totalPages}
        </h5>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default AllUsers;