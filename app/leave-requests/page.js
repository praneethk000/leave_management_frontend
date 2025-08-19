// "use client";

// import { useState, useEffect } from "react";
// import api from "@/utils/api";

// export default function LeaveRequests() {
//     const [requests, setRequests] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const [newRequest, setNewRequest] = useState({
//         employeeId: "",
//         startDate: "",
//         endDate: "",
//         reason: "",
//     });


//     const fetchRequests = async () => {
//         try {
//             const res = await api.get(`/leaveRequest/v1/getAllLeaveRequest`);
//             setRequests(res.data);
//         } catch (err) {
//             console.error("Error fetching leave requests", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchRequests();
//     }, []);

//     // ✅ Apply for leave
//     const handleApply = async (e) => {
//         e.preventDefault();
//         try {
//             const payload = {
//                 employeeId: newRequest.employeeId,
//                 startDate: newRequest.startDate,
//                 endDate: newRequest.endDate,
//                 reason: newRequest.reason,
//                 idempotencyKey: Date.now().toString(), // to avoid duplicates
//             };
//             await api.post("/v1/apply", payload);
//             fetchRequests();
//             setNewRequest({ employeeId: "", startDate: "", endDate: "", reason: "" });
//         } catch (err) {
//             console.error("Error applying for leave", err);
//         }
//     };

//     // ✅ Approve / Reject leave
//     const handleDecision = async (requestId, decision) => {
//         try {
//             await api.put(`/v1/${requestId}/status?status=${decision}`);
//             fetchRequests();
//         } catch (err) {
//             console.error("Error updating leave status", err);
//         }
//     };

//     if (loading) return <div className="p-8">Loading leave requests...</div>;

//     return (
//         <div className="min-h-screen bg-gray-100 p-8">
//             <h2 className="text-2xl font-semibold mb-6 text-gray-800">Leave Requests</h2>

//             {/* Apply Leave Form */}
//             <div className="bg-white shadow-md rounded-lg p-6 mb-8">
//                 <h3 className="text-lg font-semibold mb-4 text-gray-800">Apply for Leave</h3>
//                 <form onSubmit={handleApply} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <input
//                         type="text"
//                         placeholder="Employee ID"
//                         value={newRequest.employeeId}
//                         onChange={(e) => setNewRequest({ ...newRequest, employeeId: e.target.value })}
//                         className="border rounded-lg px-4 py-2"
//                         required
//                     />
//                     <input
//                         type="date"
//                         value={newRequest.startDate}
//                         onChange={(e) => setNewRequest({ ...newRequest, startDate: e.target.value })}
//                         className="border rounded-lg px-4 py-2"
//                         required
//                     />
//                     <input
//                         type="date"
//                         value={newRequest.endDate}
//                         onChange={(e) => setNewRequest({ ...newRequest, endDate: e.target.value })}
//                         className="border rounded-lg px-4 py-2"
//                         required
//                     />
//                     <input
//                         type="text"
//                         placeholder="Reason"
//                         value={newRequest.reason}
//                         onChange={(e) => setNewRequest({ ...newRequest, reason: e.target.value })}
//                         className="border rounded-lg px-4 py-2 md:col-span-2"
//                         required
//                     />
//                     <button
//                         type="submit"
//                         className="col-span-1 md:col-span-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
//                     >
//                         Submit Request
//                     </button>
//                 </form>
//             </div>

//             {/* Manage Requests Table */}
//             <div className="bg-white shadow-md rounded-lg p-6">
//                 <h3 className="text-lg font-semibold mb-4 text-gray-800">Manage Requests</h3>
//                 <table className="w-full text-left border-collapse">
//                     <thead>
//                         <tr className="border-b text-gray-600">
//                             <th className="p-3">Employee</th>
//                             <th className="p-3">Dates</th>
//                             <th className="p-3">Reason</th>
//                             <th className="p-3">Status</th>
//                             <th className="p-3">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {requests.map((req,index) => (
//                             <tr key={req.id} className="border-b hover:bg-gray-50">
//                                 <td className="p-3">{req.name || req.employeeId}</td>
//                                 <td className="p-3">{req.startDate} → {req.endDate}</td>
//                                 <td className="p-3">{req.reason}</td>
//                                 <td className="p-3">
//                                     <span
//                                         className={`px-2 py-1 rounded text-sm ${req.status === "Pending"
//                                             ? "bg-yellow-100 text-yellow-800"
//                                             : req.status === "Approved"
//                                                 ? "bg-green-100 text-green-800"
//                                                 : "bg-red-100 text-red-800"
//                                             }`}
//                                     >
//                                         {req.status}
//                                     </span>
//                                 </td>
//                                 <td className="p-3 space-x-2">
//                                     {req.status === "Pending" && (
//                                         <>
//                                             <button
//                                                 onClick={() => handleDecision(req.id, "Approved")}
//                                                 className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                                             >
//                                                 Approve
//                                             </button>
//                                             <button
//                                                 onClick={() => handleDecision(req.id, "Rejected")}
//                                                 className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                                             >
//                                                 Reject
//                                             </button>
//                                         </>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }



"use client";

import { useState, useEffect } from "react";
import api from "@/utils/api";

export default function LeaveRequests() {
    const [requests, setRequests] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const [newRequest, setNewRequest] = useState({
        employeeId: "",
        startDate: "",
        endDate: "",
        reason: "",
    });

    // ✅ Fetch Leave Requests
    const fetchRequests = async () => {
        try {
            const res = await api.get(`/leaveRequest/v1/getAllLeaveRequest`);
            setRequests(res.data);
            console.log(res.data)
        } catch (err) {
            console.error("Error fetching leave requests", err);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Fetch Employees for dropdown
    const fetchEmployees = async () => {
        try {
            const res = await api.get(`employee/v1/getAllEmployees`);
            setEmployees(res.data);
        } catch (err) {
            console.error("Error fetching employees", err);
        }
    };

    useEffect(() => {
        fetchRequests();
        fetchEmployees();
    }, []);

    const handleApply = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                employeeId: newRequest.employeeId, // still submit employeeId to backend
                startDate: newRequest.startDate,
                endDate: newRequest.endDate,
                reason: newRequest.reason,
                idempotencyKey: Date.now().toString(), // avoid duplicates
            };
            console.log("form submited", payload)
            await api.post(`/leaveRequest/v1/apply`, payload);
            fetchRequests();
            setNewRequest({ employeeId: "", startDate: "", endDate: "", reason: "" });
        } catch (err) {
            console.error("Error applying for leave", err);
        }
    };

    const handleDecision = async (leaveRequestid, decision) => {
        try {
            await api.put(`/leaveRequest/v1/${leaveRequestid}/status?status=${decision}`);
            fetchRequests();

        } catch (err) {
            console.error("Error updating leave status", err);
        }
    };

    if (loading) return <div className="p-8">Loading leave requests...</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Leave Requests</h2>

            {/* Apply Leave Form */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Apply for Leave</h3>
                <form onSubmit={handleApply} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Employee Dropdown */}
                    <select
                        value={newRequest.employeeId}
                        onChange={(e) => setNewRequest({ ...newRequest, employeeId: e.target.value })}
                        className="border rounded-lg px-4 py-2"
                        required
                    >


                        <option value="">Select Employee</option>
                        {employees.map(emp => (
                            <option key={emp.id} value={emp.id}>
                                {emp.name} — {emp.email} ({emp.department})
                            </option>
                        ))}
                    </select>

                    <input
                        type="date"
                        value={newRequest.startDate}
                        onChange={(e) => setNewRequest({ ...newRequest, startDate: e.target.value })}
                        className="border rounded-lg px-4 py-2"
                        required
                    />
                    <input
                        type="date"
                        value={newRequest.endDate}
                        onChange={(e) => setNewRequest({ ...newRequest, endDate: e.target.value })}
                        className="border rounded-lg px-4 py-2"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Reason"
                        value={newRequest.reason}
                        onChange={(e) => setNewRequest({ ...newRequest, reason: e.target.value })}
                        className="border rounded-lg px-4 py-2 md:col-span-2"
                        required
                    />
                    <button
                        type="submit"
                        className="col-span-1 md:col-span-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
                    >
                        Submit Request
                    </button>

                </form>
            </div>

            {/* Manage Requests Table */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Manage Requests</h3>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b text-gray-600">
                            <th className="p-3">Employee</th>
                            <th className="p-3">Dates</th>
                            <th className="p-3">Reason</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => (
                            <tr key={req.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">
                                    {req.name}
                                </td>
                                <td className="p-3">{req.startDate} → {req.endDate}</td>
                                <td className="p-3">{req.reason}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-2 py-1 rounded text-sm ${req.status === "Pending"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : req.status === "Approved"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {req.status}
                                    </span>
                                </td>
                                <td className="p-3 space-x-2">
                                    {req.status === "PENDING" && (
                                        <>
                                            <button
                                                onClick={() => handleDecision(req.leaveRequestid, "Approved")}
                                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleDecision(req.leaveRequestid, "Rejected")}
                                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
