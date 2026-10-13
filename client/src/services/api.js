const API_URL = "http://localhost:5000/api";

const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,

    headers: {
      "Content-Type": "application/json",
      ...options.headers,

      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const getProducts = () => {
  return apiFetch("/products");
};

export const getAllProductsForAdmin = () =>
  apiFetch("/products/admin/all");

export const createProduct = (product) => {
  console.log("CREATE PRODUCT RECEIVED:", product);

  const body = JSON.stringify(product);

  console.log("JSON SENT TO SERVER:", body);

  return apiFetch("/products", {
    method: "POST",
    body,
  });
};

export const loginUser = async (credentials) => {
  // Login doesn't have a token yet,
  // so we don't use apiFetch here.
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export const registerUser = async (user) => {
  const response = await fetch(
    `${API_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Registration failed"
    );
  }

  return data;
};

export const getProfile = () => {
  return apiFetch("/auth/profile");
};

export const updateProduct = (id, product) => {
  return apiFetch(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });
};

export const deleteProduct = (id) => {
  return apiFetch(`/products/${id}`, {
    method: "DELETE",
  });
};

export const createOrder = (items) => {
  return apiFetch("/orders", {
    method: "POST",
    body: JSON.stringify({
      items,
    }),
  });
};

export const deleteOrder = (id) => {
  return apiFetch(`/orders/${id}`, {
    method: "DELETE",
  });
};

export const getMyOrders = () => {
  return apiFetch("/orders/my-orders");
};

export const getAllOrders = () => {
  return apiFetch("/orders/admin/all");
};

export const updateOrderStatus = (
  orderId,
  status
) => {
  return apiFetch(
    `/orders/admin/${orderId}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({
        status,
      }),
    }
  );
};

export const restoreProduct = (id) =>
  apiFetch(`/products/${id}/restore`, {
    method: "PATCH",
  });

export const getDashboardStats = () =>
  apiFetch("/dashboard/stats");

export const getRecentOrders = () =>
  apiFetch("/orders/admin/recent");

export const uploadProductImage = async (file) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(
    `${API_URL}/upload/product-image`,
    {
      method: "POST",
      headers: {
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Image upload failed"
    );
  }

  return data;
};


export const getProductReviews = async (productId) => {
  return apiFetch(`/reviews/product/${productId}`);
};

export const submitProductReview = async ({
  product_id,
  order_id,
  rating,
  comment,
}) => {
  return apiFetch("/reviews", {
    method: "POST",
    body: JSON.stringify({
      product_id,
      order_id,
      rating,
      comment,
    }),
  });
};
