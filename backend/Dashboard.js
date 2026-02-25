import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ type:"income", amount:"", category:"" });

  const fetchData = async () => {
    const { data } = await API.get("/transactions");
    setTransactions(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTransaction = async () => {
    await API.post("/transactions", form);
    fetchData();
  };

  const deleteTransaction = async (id) => {
    await API.delete(`/transactions/${id}`);
    fetchData();
  };

  const income = transactions.filter(t=>t.type==="income")
    .reduce((a,b)=>a+b.amount,0);

  const expense = transactions.filter(t=>t.type==="expense")
    .reduce((a,b)=>a+b.amount,0);

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Income: {income}</h3>
      <h3>Expense: {expense}</h3>
      <h3>Balance: {income-expense}</h3>

      <select onChange={e=>setForm({...form,type:e.target.value})}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input placeholder="Amount" type="number"
        onChange={e=>setForm({...form,amount:Number(e.target.value)})}/>

      <input placeholder="Category"
        onChange={e=>setForm({...form,category:e.target.value})}/>

      <button onClick={addTransaction}>Add</button>

      <ul>
        {transactions.map(t=>(
          <li key={t._id}>
            {t.type} - {t.amount} - {t.category}
            <button onClick={()=>deleteTransaction(t._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}