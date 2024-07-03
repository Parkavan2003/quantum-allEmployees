import { useEffect, useState, useRef } from "react";
import avatar from "../assets/avatar.webp";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { TiUserAdd } from "react-icons/ti";
import { IoFilter } from "react-icons/io5";

const AllEmployee = () => {
  const [employees, setEmployees] = useState([
    {
      details: {
        date: "2024-07-01T00:00:00.000Z",
        check_in: "2024-07-01T09:00:00.000Z",
        check_out: "2024-07-01T17:00:00.000Z",
        status: "Present",
      },
      _id: "668295ddbedd06068bda6b60",
      name: "suresh",
      employee_ID: "20240704",
      role: "Back-end",
      status: "Active",
      team: "Design",
      birthdate: "1990-01-01T00:00:00.000Z",
      gender: "Female",
      maritalStatus: "Single",
      nationality: "Indian",
      email: "kaviya@example.com",
      personalEmail: "kaviya.personal@example.com",
      currentAddress: "123 Main St, City, State, Zip",
      emergencyContactNumber: "+1234567890",
      phoneNumber: "+9876543210",
      secondaryPhoneNumber: "+1122334455",
      permanentAddress: "456 Elm St, City, State, Zip",
      hireDate: "2020-01-01T00:00:00.000Z",
      manager: "kaviya",
      __v: 0,
      photoUpload:
        "C:\\Users\\ADMIN\\Desktop\\node\\qsis_dashboard\\server\\emp-management-backend\\src\\uploads\\1719834101420.webp",
    },
    {
      details: {
        date: "2024-07-01T00:00:00.000Z",
        check_in: "2024-07-01T09:00:00.000Z",
        check_out: "2024-07-01T17:00:00.000Z",
        status: "Present",
      },
      _id: "668295ddbedd06068bda6b60",
      name: "kaviya",
      employee_ID: "20240705",
      role: "Front-end",
      status: "Inactive",
      team: "Testing",
      birthdate: "1990-01-01T00:00:00.000Z",
      gender: "Female",
      maritalStatus: "Single",
      nationality: "Indian",
      email: "kaviya@example.com",
      personalEmail: "kaviya.personal@example.com",
      currentAddress: "123 Main St, City, State, Zip",
      emergencyContactNumber: "+1234567890",
      phoneNumber: "+9876543210",
      secondaryPhoneNumber: "+1122334455",
      permanentAddress: "456 Elm St, City, State, Zip",
      hireDate: "2020-01-01T00:00:00.000Z",
      manager: "kaviya",
      __v: 0,
      photoUpload:
        "C:\\Users\\ADMIN\\Desktop\\node\\qsis_dashboard\\server\\emp-management-backend\\src\\uploads\\1719834101420.webp",
    },
  ]);
  const [showCreate, setShowCreate] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const [selectedEmployees, setSelectedEmployees] = useState(null);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [filterValue, setFilterValue] = useState("");
  const [EmployeeName, setEmployeeName] = useState("");
  const [EmployeeID, setEmployeeID] = useState("");
  const [EmployeeRole, setEmployeeRole] = useState("");
  const [EmployeeStatus, setEmployeeStatus] = useState("");
  const [EmployeeTeam, setEmployeeTeam] = useState("");

  const menu = useRef(null);

  const statusBodyTemplate = (rowData) => {
    return (
      <span
        className={`px-3 py-1 rounded-full font-semibold ${
          rowData.status === "Active"
            ? "bg-green-100 text-green-700 border border-green-400"
            : "bg-red-100 text-red-700 border border-red-400"
        }`}
      >
        {rowData.status}
      </span>
    );
  };

  const teamsBodyTemplate = (rowData) => {
    return (
      <div>
        {rowData.team.split(',').map((team, index) => (
          <span
            key={index}
            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-1 inline-block"
          >
            {team}
          </span>
        ))}
      </div>
    );
  };

  const nameBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2">
        <img src={avatar} alt={rowData.name} className="h-7 w-7 rounded-full" />
        <div>
          <div>{rowData.name}</div>
          <div className="text-gray-500 text-sm">{rowData.email}</div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/employees");
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        const data = response.data;
        setEmployees(data);
        setFilteredEmployees(data);
      } catch (error) {
        console.error("Fetch AllEmployees error:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEmployee = {
      name: EmployeeName,
      employee_ID: EmployeeID,
      role: EmployeeRole,
      status: EmployeeStatus,
      team: EmployeeTeam,
    };

    try {
      const result = await axios.post("http://localhost:3001/employees", newEmployee);
      setEmployees([...employees, result.data]);
      setFilteredEmployees([...employees, result.data]);
      setShowCreate(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const filterMenu = [
    {
      label: 'Role',
      items: [
        {
          label: 'Designer',
          command: () => filterEmployees('role', 'Designer')
        },
        {
          label: 'Back-End',
          command: () => filterEmployees('role', 'Back-End')
        },
        {
          label: 'Front-End',
          command: () => filterEmployees('role', 'Front-End')
        },
      ]
    },
    {
      label: 'Status',
      items: [
        {
          label: 'Active',
          command: () => filterEmployees('status', 'Active')
        },
        {
          label: 'Inactive',
          command: () => filterEmployees('status', 'Inactive')
        },
      ]
    },
    {
      label: 'Teams',
      items: [
        {
          label: 'Engineering',
          command: () => filterEmployees('team', 'Engineering')
        },
        {
          label: 'Design',
          command: () => filterEmployees('team', 'Design')
        },
        {
          label: 'Testing',
          command: () => filterEmployees('team', 'Testing')
        },
      ]
    }
  ];

  const filterEmployees = (field, value) => {
    const filtered = employees.filter(employee => {
      if (field === 'team') {
        return employee.team.includes(value);
      }
      return employee[field] === value;
    });
    setFilteredEmployees(filtered);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterValue(value);
    filterByInput(value);
  };

  const filterByInput = (value) => {
    const filtered = employees.filter(employee => {
      return (
        employee.name.toLowerCase().includes(value.toLowerCase()) ||
        employee.employee_ID.includes(value)
      );
    });
    setFilteredEmployees(filtered);
  };

  return (
    <div className="mt-0 mb-10">
      <h2 className="text-2xl font-bold text-center">List of All Employees</h2>
      <div className="flex flex-col items-center justify-center">
        <div className="flex justify-between my-10 px-5 py-3 rounded-lg w-full">
          <h4 className="flex items-center font-semibold">Employees</h4>

          {showCreate && (
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
              <div className="bg-white px-4 py-6 rounded-md w-full md:w-1/2 relative z-10">
                <form
                  className="w-full md:w-9/12 mx-auto mb-4 md:mb-0"
                  onSubmit={handleSubmit}
                >
                  <div className="text-center">
                    <h1 className="text-3xl font-semibold">
                      Create New Employee
                    </h1>
                  </div>

                  <div className="flex flex-col py-2">
                    <label htmlFor="EmployeeName" className="py-2 font-medium">
                      Employee Name
                    </label>
                    <input
                      className="border border-slate-400 rounded px-2 py-2 outline-none"
                      type="text"
                      id="EmployeeName"
                      name="EmployeeName"
                      placeholder="Enter the Employee Name"
                      required
                      onChange={(e) => setEmployeeName(e.target.value)}
                      value={EmployeeName}
                    />
                  </div>

                  <div className="flex flex-col py-2">
                    <label htmlFor="EmployeeID" className="py-2 font-medium">
                      Employee ID
                    </label>
                    <input
                      className="border border-slate-400 rounded px-2 py-2 outline-none"
                      value={EmployeeID}
                      name="EmployeeID"
                      id="EmployeeID"
                      placeholder="Enter the Unique Employee ID"
                      onChange={(e) => setEmployeeID(e.target.value)}
                    ></input>
                  </div>

                  <div className="flex flex-col py-2">
                                        <label className="py-2 font-medium" htmlFor="role">
                      Role
                    </label>
                    <select
                      className="border border-slate-400 rounded px-2 py-2 outline-none"
                      name="role"
                      id="role"
                      required
                      value={EmployeeRole}
                      onChange={(e) => setEmployeeRole(e.target.value)}
                    >
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="UI/UX">UI/UX</option>
                    </select>
                  </div>

                  <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">Status</label>
                    <select
                      className="border border-slate-400 rounded-md px-2 py-2 outline-none"
                      required
                      value={EmployeeStatus}
                      onChange={(e) => setEmployeeStatus(e.target.value)}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="flex flex-col py-2 mb-2">
                    <label className="py-2 font-medium">Team</label>
                    <input
                      className="border border-slate-400 rounded-md px-2 py-2 outline-none"
                      type="text"
                      placeholder="Enter teams, separated by commas"
                      required
                      value={EmployeeTeam}
                      onChange={(e) => setEmployeeTeam(e.target.value)}
                    />
                  </div>

                  <div className="text-center flex w-full items-center justify-between gap-10">
                    <button
                      className="text-center bg-blue-600 rounded text-white px-4 py-2 w-2/3"
                      type="submit"
                    >
                      Create Employee
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 transition duration-300 text-white px-4 py-2 rounded w-2/3 font-medium"
                      onClick={() => setShowCreate(!showCreate)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="flex gap-5 items-center">
            <Button
              label="Export"
              className="p-button-outlined border border-black rounded px-4"
            />
            <input
              type="text"
              className="border border-slate-400 rounded px-2 py-2 outline-none"
              placeholder="Filter by Name or ID"
              value={filterValue}
              onChange={handleFilterChange}
            />
            <Menu model={filterMenu} popup ref={menu} />
            <Button
              className="border border-black rounded px-4"
              onClick={(event) => menu.current.toggle(event)}
            >
              <IoFilter className="mr-2" />
              Filter
            </Button>

            <Button
              className="bg-blue-600 p-2 rounded text-white"
              onClick={() => setShowCreate(!showCreate)}
            >
              <TiUserAdd className="mr-1 text-xl" />
              New Employee
            </Button>
          </div>
        </div>

        <div className="card w-full border border-black mb-10 h-full">
          <DataTable
            value={filteredEmployees}
            selection={selectedEmployees}
            onSelectionChange={(e) => setSelectedEmployees(e.value)}
            dataKey="employee_ID"
            tableStyle={{ minWidth: "50rem" }}
            paginator
            rows={10}
            rowsPerPageOptions={[15, 20, 25]}
            paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries "
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "3rem" }}
            ></Column>
            <Column field="name" header="Name" body={nameBodyTemplate}></Column>
            <Column field="employee_ID" header="Employee ID"></Column>
            <Column field="role" header="Role"></Column>
            <Column
              field="status"
              header="Status"
              body={statusBodyTemplate}
            ></Column>
            <Column
              field="team"
              header="Teams"
              body={teamsBodyTemplate}
            ></Column>
          </DataTable>
        </div>
      </div>

      <style jsx>{`
        .p-datatable thead th {
          border-bottom: 1px solid black;
          padding: 10px;
        }
        .p-datatable-tbody > tr {
          border-bottom: 1px solid black;
          padding: 10px;
        }
        .p-datatable-tbody > tr > td {
          padding: 10px;
        }
        .p-datatable-tbody > tr.p-highlight {
          background-color: #ccc;
        }
        .p-checkbox-box {
          width: 100%;
          height: 100%;
        }
        .p-checkbox-box:checked {
          background-color: blue;
        }
        .p-menu {
          z-index: 1000;
        }
        .p-menu .p-menuitem-link {
          padding: 0.5rem 1rem;
        }
        .p-menu .p-menuitem-text {
          font-size: 1rem;
        }
        .p-menu .p-submenu-icon {
          font-size: 1rem;
        }
        .p-menu .p-menuitem {
          position: relative;
        }
        .p-menu .p-menuitem .p-submenu-icon::before {
          content: '\\25B6'; /* Right arrow */
          display: inline-block;
          margin-left: 0.5rem;
        }
        .p-menu .p-menuitem:hover .p-menuitem-text::after {
          content: '';
          display: block;
          position: absolute;
          right: -1.5rem;
          width: 1rem;
          height: 1rem;
          background: #ccc;
          z-index: 1000;
        }
        .p-menu .p-submenu-list {
          position: absolute;
          left: 100%;
          top: 0;
          display: none;
          margin-top: -0.5rem;
        }
        .p-menu .p-menuitem:hover .p-submenu-list {
          display: block;
          background: white;
          border: 1px solid #ccc;
        }
            .p-menu {
          z-index: 1000;
          background-color: #F5F7F8;
          padding:10px;
          border-radius:10px;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        }
        .p-menuitem-link {
          padding: 0.5rem 2.5rem;
        }
        .p-menuitem-link:hover{
          background-color: #EEEEEE;
        }
      `}</style>
    </div>
  );
};

export default AllEmployee;

