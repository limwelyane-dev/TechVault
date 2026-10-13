import ProductList from "./ProductList";
import Cart from "./Cart";
import MyOrders from "./MyOrders";

function CustomerDashboard() {
  return (
    <div>
      <h2>Customer Dashboard</h2>

      <ProductList />

      <Cart />

      <MyOrders />
    </div>
  );
}

export default CustomerDashboard;