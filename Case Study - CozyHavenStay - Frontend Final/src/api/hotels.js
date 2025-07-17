export async function getAllHotels() {
  const token = localStorage.getItem("accessToken");
  const res = await fetch("http://localhost:8080/api/users/hotels", {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function getHotelRooms(hotelId) {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`http://localhost:8080/api/users/hotels/${hotelId}/rooms`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function getAllOwnerHotels() {
  const token = localStorage.getItem("accessToken");
  const res = await fetch("http://localhost:8080/api/hotel-owner/hotels", {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function createHotel(hotelData) {
  const token = localStorage.getItem("accessToken");
  const res = await fetch("http://localhost:8080/api/hotel-owner/hotels", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(hotelData)
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function updateHotel(hotelId, hotelData) {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`http://localhost:8080/api/hotel-owner/hotels/${hotelId}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(hotelData)
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function deleteHotel(hotelId) {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`http://localhost:8080/api/hotel-owner/hotels/${hotelId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.text();
}

export async function getOwnerHotelRooms(hotelId) {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`http://localhost:8080/api/hotel-owner/hotels/${hotelId}/rooms`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function addRoomToHotel(hotelId, roomData) {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`http://localhost:8080/api/hotel-owner/hotels/${hotelId}/rooms`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(roomData)
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function updateRoom(roomId, roomData) {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`http://localhost:8080/api/hotel-owner/rooms/${roomId}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(roomData)
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function deleteRoom(roomId) {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`http://localhost:8080/api/hotel-owner/rooms/${roomId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.text();
}

export async function getHotelBookings(hotelId) {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`http://localhost:8080/api/hotel-owner/hotels/${hotelId}/bookings`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
} 