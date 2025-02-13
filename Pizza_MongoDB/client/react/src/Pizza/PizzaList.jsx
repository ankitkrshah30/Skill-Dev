import { useEffect, useState } from "react";
import PageHeader from "../header/PageHeader";
import axios from "axios";

function PizzaList() {
    const [pizzas, setPizzas] = useState([]);
    
    const readAllPizzas = async () => {
    try {
        const baseUrl = "http://localhost:8080";
        const response = await axios.get(`${baseUrl}/pizzas`);
        
        console.log("API Response:", response.data); // ✅ Debugging step
        
        if (Array.isArray(response.data)) {
            setPizzas(response.data); // ✅ Ensure response is an array
        } else {
            console.error("Invalid API response format:", response.data);
            setPizzas([]); // Fallback to empty array
        }
    } catch (error) {
        console.error("Server Error: Unable to fetch pizzas", error);
        alert("Server Error: Unable to fetch pizzas");
        setPizzas([]); // Fallback to empty array
    }
};

    
    const deletePizza = async (id) => {
        if (!confirm("Are you sure to delete this pizza?")) {
            return;
        }
        try {
            const baseUrl = "http://localhost:8080";
            const response = await axios.delete(`${baseUrl}/pizzas/${id}`);
            alert(response.data.message);
            await readAllPizzas();
        } catch (error) {
            alert("Server Error: Unable to delete pizza");
        }
    };
    
    useEffect(() => {
        readAllPizzas();
    }, []);
    
    return (
        <>
            <PageHeader />
            <h3>List of Pizzas</h3>
            <div className="container">
                <table className="table table-warning table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Sl.No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Price</th>
                            <th scope="col">Size</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pizzas.length > 0 ? (
                            pizzas.map((pizza, index) => (
                                <tr key={pizza.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{pizza.name}</td>
                                    <td>{pizza.category}</td>
                                    <td>{pizza.price}</td>
                                    <td>{pizza.size}</td>
                                    <td>
                                        <a href={`/pizzas/view/${pizza.id}`} className="btn btn-success">View</a>
                                        &nbsp;
                                        <a href={`/pizzas/edit/${pizza.id}`} className="btn btn-warning">Edit</a>
                                        &nbsp;
                                        <button className="btn btn-danger" onClick={() => deletePizza(pizza.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="6">No Data Found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default PizzaList;
