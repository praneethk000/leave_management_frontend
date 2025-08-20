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
    const [loading, setLoading] = useState(true);


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
        try {
            fetchEmployees();
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }

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

    if (loading) {
        return (
            <div class="loading-container">
                <div class="loadingspinner">
                    <div id="square1"></div>
                    <div id="square2"></div>
                    <div id="square3"></div>
                    <div id="square4"></div>
                    <div id="square5"></div>
                </div>
            </div>
        )
    }

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
