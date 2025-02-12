import PageHeader from "../header/PageHeader";

function PizzaCreate() {
    return (
        <>
            <PageHeader/>
            <h3><a className="btn btn-primary" href="/Pizza/list">GoBack</a></h3>
            <div className="container">
                <h3>Add a New Pizza</h3>
                <div className="form-group mb-3">
                    <label htmlFor="pizzaName" className="form-label">Pizza Name</label>
                    <input type="text" className="form-control" id="pizzaName" placeholder="Enter pizza name" />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="pizzaToppings" className="form-label">Toppings</label>
                    <input type="text" className="form-control" id="pizzaToppings" placeholder="Enter toppings" />
                </div>
                <div className="mb-3">
                    <label htmlFor="pizzaPrice" className="form-label">Price</label>
                    <input type="number" className="form-control" id="pizzaPrice" placeholder="Enter price" />
                </div>
                <div className="mb-3">
                    <label htmlFor="pizzaSize" className="form-label" aria-placeholder="Enter Size">Size</label>
                    <select className="form-select" id="pizzaSize">
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="pizzaCategory" className="form-label">Category</label>
                    <select className="form-select" id="pizzaCategory">
                        <option value="Veg">Veg</option>
                        <option value="Non-veg">Non-veg</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Add Pizza</button>
            </div>
        </>
    );
}
export default PizzaCreate
