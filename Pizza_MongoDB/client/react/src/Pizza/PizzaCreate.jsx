import { useState } from "react";
import PageHeader from "../header/PageHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PizzaCreate() {
    const [pizza, setPizza] = useState({ name: "", size: "", price: "", category: "" });
    const navigate = useNavigate();

    const txtBoxOnChange = (event) => {
        setPizza({
            ...pizza,
            [event.target.id]: event.target.value
        });
    };

    const createPizza = async () => {
        const baseUrl = "http://localhost:8080";
        try {
            const response = await axios.post(`${baseUrl}/pizzas`, {
                ...pizza,
                size: parseInt(pizza.size),
                price: parseFloat(pizza.price)
            });

            const createdPizza = response.data.pizza;
            setPizza(createdPizza);
            alert(response.data.message);
            navigate("/pizzas");
        } catch (error) {
            alert("Server Error");
        }
    };

    return (
        <>
            <PageHeader />
            <h3><a href="/pizzas" className="btn btn-light">Go Back</a>Add Pizza</h3>
            <div className="container">
                <div className="form-group mb-3">
                    <label htmlFor="name" className="form-label">🍕 Pizza Name:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        placeholder="Enter pizza name"
                        value={pizza.name} 
                        onChange={txtBoxOnChange} 
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="size" className="form-label">📏 Pizza Size (in cm):</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="size" 
                        placeholder="Enter pizza size"
                        value={pizza.size} 
                        onChange={txtBoxOnChange} 
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="price" className="form-label">💰 Pizza Price (in rupees):</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="price" 
                        placeholder="Enter pizza price"
                        value={pizza.price} 
                        onChange={txtBoxOnChange} 
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="category" className="form-label">🍕 Pizza Category:</label>
                    <select 
                        className="form-select" 
                        id="category" 
                        value={pizza.category} 
                        onChange={txtBoxOnChange}
                    >
                        <option value="" disabled>Select category</option>
                        <option value="Fast Delivery">🚚 Fast Delivery</option>
                        <option value="Order Delivery">📦 Order Delivery</option>
                        <option value="Takeaway">🍴 Takeaway</option>
                    </select>
                </div>

                <button className="btn btn-primary" onClick={createPizza}>➕ Create Pizza</button>
            </div>
        </>
    );
}

export default PizzaCreate;
