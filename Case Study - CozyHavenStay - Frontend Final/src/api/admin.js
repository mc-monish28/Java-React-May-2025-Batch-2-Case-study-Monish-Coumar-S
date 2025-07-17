// Admin API functions for dashboard

export async function createHotelOwner(ownerData) {
  // No token required
  const res = await fetch("http://localhost:8080/api/v1/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...ownerData, role: "HOTEL_OWNER" })
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.text();
}

export async function getAllHotelOwners() {
  const token = localStorage.getItem("accessToken");
  const res = await fetch("http://localhost:8080/api/admin/hotel-owners", {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function updateHotelOwner(ownerId, ownerData) {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`http://localhost:8080/api/admin/hotel-owners/${ownerId}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(ownerData)
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function deleteHotelOwner(ownerId) {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`http://localhost:8080/api/admin/hotel-owners/${ownerId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.text();
}

export async function getAllHotels() {
  const token = localStorage.getItem("accessToken");
  const res = await fetch("http://localhost:8080/api/admin/hotels", {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function getHotelsByOwner(ownerId) {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`http://localhost:8080/api/admin/hotel-owners/${ownerId}/hotels`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function deleteHotel(hotelId) {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`http://localhost:8080/api/admin/hotels/${hotelId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.text();
}

export async function getAdminStatistics() {
  const token = localStorage.getItem("accessToken");
  const res = await fetch("http://localhost:8080/api/admin/statistics", {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
} 