// // app/leave-balances/page.js
// "use client";

// import { useState } from "react";

// export default function LeaveBalances() {
//     // Mock data for UI only
//     const [balances, setBalances] = useState([
//         { id: "1", employeeName: "Alice Johnson", totalDays: 24, usedDays: 5, pendingDays: 2 },
//         { id: "2", employeeName: "Bob Smith", totalDays: 24, usedDays: 10, pendingDays: 1 },
//     ]);

//     const [newBalance, setNewBalance] = useState({
//         employeeId: "",
//         totalDays: 24,
//         usedDays: 0,
//         pendingDays: 0,
//     });

//     const handleInitialize = (e) => {
//         e.preventDefault();
//         // Later: API call
//         setBalances([...balances, { id: Date.now().toString(), employeeName: "New Employee", ...newBalance }]);
//         setNewBalance({ employeeId: "", totalDays: 24, usedDays: 0, pendingDays: 0 });
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 p-8">
//             <h2 className="text-2xl font-semibold mb-6 text-gray-800">Leave Balances</h2>

//             {/* Leave Balances Table */}
//             <div className="bg-white shadow-md rounded-lg p-6 mb-8">
//                 <table className="w-full text-left border-collapse">
//                     <thead>
//                         <tr className="border-b text-gray-600">
//                             <th className="p-3">Employee</th>
//                             <th className="p-3">Total Days</th>
//                             <th className="p-3">Used Days</th>
//                             <th className="p-3">Pending Days</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {balances.map((balance) => (
//                             <tr key={balance.id} className="border-b hover:bg-gray-50">
//                                 <td className="p-3">{balance.employeeName}</td>
//                                 <td className="p-3">{balance.totalDays}</td>
//                                 <td className="p-3">{balance.usedDays}</td>
//                                 <td className="p-3">{balance.pendingDays}</td>
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

export default function LeaveBalances() {
    const [balances, setBalances] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch balances from Spring Boot API
    useEffect(() => {
        async function fetchBalances() {
            try {
                const res = await fetch("http://localhost:8080/web/api/leaveBalance/v1/getAllLeaveBalance");
                const data = await res.json();
                // Transform backend data into UI-friendly format
                const formatted = data.map((b) => ({
                    id: b.employeeId,
                    name: b.name || "Unknown",
                    totalDays: b.totalDays,
                    usedDays: b.usedDays,
                    pendingDays: b.pendingDays,
                }));
                console.log(formatted);

                setBalances(formatted);
            } catch (error) {
                console.error("Error fetching leave balances:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchBalances();
    }, []);

    if (loading) {
        return <div className="p-8">Loading leave balances...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Leave Balances</h2>

            {/* Leave Balances Table */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b text-gray-600">
                            <th className="p-3">Employee</th>
                            <th className="p-3">Total Days</th>
                            <th className="p-3">Used Days</th>
                            <th className="p-3">Pending Days</th>
                        </tr>
                    </thead>
                    <tbody>
                        {balances.map((balance) => (
                            <tr key={balance.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{balance.name}</td>
                                <td className="p-3">{balance.totalDays}</td>
                                <td className="p-3">{balance.usedDays}</td>
                                <td className="p-3">{balance.pendingDays}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
