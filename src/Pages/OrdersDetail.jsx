import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const OrdersDetail = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `http://localhost:5546/api/order/orders_detail/${id}`
        );
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [id]);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className="max-w-3xl mx-auto mt-15 px-5 font-[sans-serif]">
      <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800">
        Order History
      </h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <>
          <div className="flex flex-col gap-6">
            {currentOrders.map((order) => (
              <div
                key={order._id}
                className="bg-gray-100 rounded-lg p-4 shadow-md"
              >
                {/* Status Header */}
                <div className="border-b border-gray-200 pb-3 mb-3">
                  {order.status === "Cancelled" ? (
                    <div className="flex items-center gap-2 text-red-500">
                      <span className="text-xl">✖</span>
                      <div>
                        <strong className="text-red-500 block">
                          Cancelled
                        </strong>
                        <p className="text-sm text-gray-600">
                          on{" "}
                          {order.updatedAt
                            ? new Date(order.updatedAt).toDateString()
                            : "N/A"}{" "}
                          as per your request
                        </p>
                      </div>
                    </div>
                  ) : order.status === "Pending" ? (
                    <div className="flex items-center gap-2 text-amber-500">
                      <span className="text-xl">⏳</span>
                      <div>
                        <strong className="text-amber-500 block">
                          Pending
                        </strong>
                        <p className="text-sm text-gray-600">
                          Order placed on{" "}
                          {new Date(order.orderDate).toDateString()}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-green-500">
                      <span className="text-xl">✔</span>
                      <div>
                        <strong className="text-green-500 block">
                          Delivered
                        </strong>
                        <p className="text-sm text-gray-600">
                          on{" "}
                          {order.updatedAt
                            ? new Date(order.updatedAt).toDateString()
                            : new Date(order.orderDate).toDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Order Summary */}
                <div className="mb-3">
                  <p>
                    <strong>Order ID:</strong> {order.orderId}
                  </p>
                  <p>
                    <strong>Total Amount:</strong> ₹{order.totalAmount}
                  </p>
                </div>

                {/* Order Items */}
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-gray-200 p-3 rounded-md mt-2"
                  >
                    <img
                      src={`http://localhost:5546${item.image}`}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 ml-4">
                      <strong className="block text-gray-800">
                        {item.brand || item.name}
                      </strong>
                      <p className="text-sm text-gray-600">
                        {item.description || "Product details not available"}
                      </p>
                      {item.size && (
                        <p className="text-sm text-gray-600">
                          Size: {item.size}
                        </p>
                      )}
                      {item.quantity && (
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      )}
                    </div>
                    <span className="text-2xl text-gray-700 ml-2">›</span>
                  </div>
                ))}

                {/* Optional Review Footer */}
                {order.status === "Delivered" && (
                  <div className="mt-3 border-t border-gray-200 pt-3">
                    <p className="text-sm text-gray-700">
                      Rate & Review to <strong>earn credits</strong>
                    </p>
                    <div className="text-gray-400 text-xl mt-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <span key={i}>☆</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className={`px-4 py-2 rounded font-medium text-white ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              Prev
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className={`px-4 py-2 rounded font-medium text-white ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersDetail;
