import React, { useState, useEffect } from "react";
import {
  getListingsRequest,
  deleteListingByIdRequest,
} from "../api/listing.js";

function Apuntes() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await getListingsRequest();
      setListings(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching listings");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteListingByIdRequest(id);
      setListings(listings.filter((listing) => listing._id !== id));
    } catch (error) {
      setError("Error deleting listing");
    }
  };

  return (
    <div>
      <h1 className="text-black">Apuntes</h1>
      {error && <p>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Curso</th>
              <th>Semestre</th>
              <th>Precio</th>
              <th>Referencia del Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr key={listing._id}>
                <td>{listing.name}</td>
                <td>{listing.course}</td>
                <td>{listing.semester}</td>
                <td>{listing.price}</td>
                <td>{listing.userRef}</td>
                <td>
                  <button onClick={() => handleDelete(listing._id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Apuntes;
