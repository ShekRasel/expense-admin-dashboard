'use client'
import React, { useEffect, useState } from "react";

function Allexpense() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const authToken = localStorage.getItem("authTokenAdmin"); // Get the token from local storage

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch("http://localhost:3000/expense/admin/getallexpense", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // Add token in the header
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data); // Log the data for debugging
          setExpenses(data || []); // Set the whole response as expenses
        } else {
          console.error("Failed to fetch expenses");
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [authToken]);

  return (
    <div className="p-4 border">
      <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">All Expenses</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading expenses...</p>
      ) : expenses.length === 0 ? (
        <p className="text-center text-gray-500">No expenses found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border text-left">#</th>
                <th className="px-4 py-2 border text-left">Expense ID</th>
                <th className="px-4 py-2 border text-left">User ID</th>
                <th className="px-4 py-2 border text-right">Total Goal (৳)</th>
                <th className="px-4 py-2 border text-left">Category</th>
                <th className="px-4 py-2 border text-right">Amount (৳)</th>
                <th className="px-4 py-2 border text-right">Total Spending (৳)</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                // Looping through expense categories inside `data`
                Object.entries(expense.data).map(([category, amount]) => (
                  <tr key={expense.expenseId + category} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border text-left text-gray-700">{index + 1}</td>
                    <td className="px-4 py-2 border text-left text-gray-700">{expense.expenseId}</td>
                    <td className="px-4 py-2 border text-left text-gray-700">{expense.userId}</td>
                    <td className="px-4 py-2 border text-right text-gray-700">
                      {expense.totalExpenseGoal.toLocaleString("en-US")}
                    </td>
                    <td className="px-4 py-2 border text-left text-gray-700">{category}</td>
                    <td className="px-4 py-2 border text-right text-gray-700">
                      {amount.toLocaleString("en-US")}
                    </td>
                    <td className="px-4 py-2 border text-right text-gray-700">
                      {expense.totalSpending.toLocaleString("en-US")}
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Allexpense;
