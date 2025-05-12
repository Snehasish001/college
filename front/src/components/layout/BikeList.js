// src/components/Motorcycles/BikeList.js
import { useState, useEffect } from 'react';
import { getData } from '../../Api';
import MotorcycleCard from './MotorcycleCard';

const BikeList = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData('api/get-bike/')             // <-- your endpoint, adjust if needed
      .then(data => {
        setBikes(data);                // assume `data` is an array of bike objects
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);
  if (loading) return <p>Loading bikes…</p>;
  if (error)   return <p>Error: {error}</p>;

  console.log(bikes);
  return (
    <div className="bike-list" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
      {bikes.map(bike => (
        <MotorcycleCard
          key={bike.id}
          id={bike.id}
          image={bike.image1}           // adjust field names to match your API
          name={bike.name}
          year={bike.year || bike.model_year || '—'}
          category={bike.category || '—'}
          displacement={bike.displacement}
          description={bike.description || bike.about || 'No description.'}
          price={bike.price}
          isTrending={bike.is_trending}  // or however you flag trending
          onViewDetails={() => {
            // e.g. navigate to `/bikes/${bike.id}`
            console.log('view details for', bike.id);
          }}
        />
      ))}
    </div>
  );
};

export default BikeList;
