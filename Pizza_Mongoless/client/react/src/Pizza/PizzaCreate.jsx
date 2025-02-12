import { useState } from 'react';
import PageHeader from "../header/PageHeader";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function PizzaCreate() {
    const [pizza, setPizza] = useState({
        pizzaId: "001",
        pizzaName: "Papperoni Pizza",
        pizzaSize: "16",
        pizzaPrice: "500.0",
        pizzaCategory: "fast delivery"
    });

    const navigate = useNavigate();

    const OnChangeBox = (event) => {
        const newPizza = { ...pizza };
        newPizza[event.target.id] = event.target.value;
        setPizza(newPizza);
    }

    const OnCreate = async (event) => {
        event.preventDefault();  // Prevent form submission and page reload
        try {
            const baseUrl = 'http://127.0.0.1:8080'; // Fixed port number
            const response = await axios.post(`${baseUrl}/pizza`, {
                ...pizza,
                pizzaSize: parseInt(pizza.pizzaSize),
                pizzaPrice: parseFloat(pizza.pizzaPrice)
            });
            const json = response.data;
            setPizza(json.pizza);
            alert(json.message);
            navigate("/pizzas/list");
        } catch (error) {
            alert("Server Error");
        }
    }

    return (
        <>
            <PageHeader PageNumber={2} />
            <h3><a href="/pizzas/list" className="btn btn-light">Go Back</a> New Pizza</h3>
            <div className="container">
                <form onSubmit={OnCreate}>
                    <div className="form-group mb-3">
                        <label htmlFor="pizzaId">🔢 Please Enter ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="pizzaId"
                            name="pizzaId"
                            value={pizza.pizzaId}
                            onChange={OnChangeBox}
                            placeholder="Please Enter ID"
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="pizzaName">🍕 Please Enter Pizza Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="pizzaName"
                            name="pizzaName"
                            value={pizza.pizzaName}
                            onChange={OnChangeBox}
                            placeholder="Pizza Name"
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="pizzaSize">📏 Please Enter Pizza Size (in cm)</label>
                        <input
                            type="number"
                            className="form-control"
                            id="pizzaSize"
                            name="pizzaSize"
                            value={pizza.pizzaSize}
                            onChange={OnChangeBox}
                            placeholder="Size (in cm)"
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="pizzaPrice">💰 Please Enter Pizza Price (in rupees)</label>
                        <input
                            type="number"
                            className="form-control"
                            id="pizzaPrice"
                            name="pizzaPrice"
                            value={pizza.pizzaPrice}
                            onChange={OnChangeBox}
                            placeholder="Price (in rupees)"
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="pizzaCategory">🍕 Pizza Category</label>
                        <select
                            className="form-select"
                            id="pizzaCategory"
                            name="pizzaCategory"
                            value={pizza.pizzaCategory}
                            onChange={OnChangeBox}
                            required
                        >
                            <option value="" disabled>Choose from Category</option>
                            <option value="Fast Delivery">🚚 Fast Delivery</option>
                            <option value="Order Delivery">📦 Order Delivery</option>
                            <option value="Takeaway">🍴 Takeaway</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary">➕ Add Pizza</button>
                </form>
            </div>
        </>
    );
}

export default PizzaCreate;
