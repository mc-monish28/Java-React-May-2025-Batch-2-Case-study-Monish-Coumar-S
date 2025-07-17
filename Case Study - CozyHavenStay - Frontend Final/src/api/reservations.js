export async function createReservation({ roomId, checkInDate, checkOutDate }) {
  const token = localStorage.getItem("accessToken");
  const url = `http://localhost:8080/api/users/reservations?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
} 