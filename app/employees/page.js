// "use client";
// import { useState } from "react";

// export default function EmployeesPage() {
//     // For now, static data. Later we'll fetch from backend.
//     const [employees, setEmployees] = useState([
//         { id: 1, name: "John Doe", email: "john@example.com", role: "Developer" },
//         { id: 2, name: "Jane Smith", email: "jane@example.com", role: "HR" },
//     ]);

//     // Controlled form state
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         role: "",
//     });

//     const handleChange = (e) => {
//         setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Later we’ll call backend. For now just add to state.
//         const newEmployee = {
//             id: employees.length + 1,
//             ...formData,
//         };
//         setEmployees([...employees, newEmployee]);
//         setFormData({ name: "", email: "", role: "" });
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 p-8">
//             <h2 className="text-2xl font-semibold mb-6 text-gray-800">Employees</h2>

//             {/* Employee List */}
//             <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//                 <h3 className="text-lg font-semibold mb-4 text-gray-700">Employee List</h3>
//                 <table className="w-full border-collapse">
//                     <thead>
//                         <tr className="bg-gray-200 text-left">
//                             <th className="p-3">ID</th>
//                             <th className="p-3">Name</th>
//                             <th className="p-3">Email</th>
//                             <th className="p-3">Role</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {employees.map((emp) => (
//                             <tr key={emp.id} className="border-b hover:bg-gray-50">
//                                 <td className="p-3">{emp.id}</td>
//                                 <td className="p-3">{emp.name}</td>
//                                 <td className="p-3">{emp.email}</td>
//                                 <td className="p-3">{emp.role}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Create Employee Form */}
//             <div className="bg-white rounded-lg shadow-md p-6">
//                 <h3 className="text-lg font-semibold mb-4 text-gray-700">Add New Employee</h3>
//                 <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">
//                     <input
//                         type="text"
//                         name="name"
//                         placeholder="Full Name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         className="p-2 border rounded"
//                         required
//                     />
//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="Email Address"
//                         value={formData.email}
//                         onChange={handleChange}
//                         className="p-2 border rounded"
//                         required
//                     />
//                     <input
//                         type="text"
//                         name="role"
//                         placeholder="Role"
//                         value={formData.role}
//                         onChange={handleChange}
//                         className="p-2 border rounded"
//                         required
//                     />
//                     <button
//                         type="submit"
//                         className="col-span-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//                     >
//                         Add Employee
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }





"use client";
import { useEffect, useState } from "react";
import api from "@/utils/api";

export default function EmployeeManagementPage() {
    const [employees, setEmployees] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        department: "",
        joiningDate: "",
    });

    // Fetch all employees on load
    const fetchEmployees = async () => {
        try {
            const res = await api.get("/employee/v1/getAllEmployees");
            setEmployees(res.data);
            console.log("employees", res.data)
        } catch (error) {
            console.error("Error fetching employees", error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    // Handle create employee
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/employee/v1/createEmployee`, form);
            setForm({ name: "", email: "", department: "", joiningDate: "" });

            fetchEmployees();
        } catch (error) {
            console.error("Error creating employee", error);
        }
    };

    // Handle delete employee
    const handleDelete = async (employeeId) => {
        try {
            await api.delete(`/employee/v1/deleteEmployeeById/${employeeId}`);
            console.log("deleteing ", employeeId)
            fetchEmployees();
        } catch (error) {
            console.error("Error deleting employee", error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Employee Management</h1>

            {/* Add Employee Form */}
            <form onSubmit={handleCreate} className="mb-6 space-y-4">
                <input
                    type="text"
                    placeholder="Name"
                    className="border p-2 w-full rounded"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 w-full rounded"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Department"
                    className="border p-2 w-full rounded"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    required
                />
                <input
                    type="date"
                    className="border p-2 w-full rounded"
                    value={form.joiningDate}
                    onChange={(e) => setForm({ ...form, joiningDate: e.target.value })}
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add Employee
                </button>
            </form>

            {/* Employees List */}
            <h2 className="text-lg font-semibold mb-2">Employee List</h2>
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Department</th>
                        <th className="border p-2">Joining Date</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp, index) => (
                        <tr key={emp.employeeId}>
                            <td className="border p-2">{index + 1}</td>
                            <td className="border p-2">{emp.name}</td>
                            <td className="border p-2">{emp.email}</td>
                            <td className="border p-2">{emp.department}</td>
                            <td className="border p-2">
                                {new Date(emp.joiningDate).toLocaleDateString()}
                            </td>
                            <td className="border p-2">
                                <button
                                    onClick={() => handleDelete(emp.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
