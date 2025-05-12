import { useState, useEffect } from 'react';
import { getData } from '../../Api';
import '../styles/Compare.css';

const Compare = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBikes, setSelectedBikes] = useState([null, null, null, null]);
  const [activeTab, setActiveTab] = useState('overview');

  const handleBikeSelect = (index, bike) => {
    const newSelectedBikes = [...selectedBikes];
    newSelectedBikes[index] = bike;
    setSelectedBikes(newSelectedBikes);
  };

  const handleClearSelection = (index) => {
    const newSelectedBikes = [...selectedBikes];
    newSelectedBikes[index] = null;
    setSelectedBikes(newSelectedBikes);
  };

  const specificationCategories = {
    overview: {
      title: 'Overview',
      specs: [
        { label: 'Brand', key: 'brand' },
        { label: 'Price', key: 'price', format: (value) => `₹${parseInt(value).toLocaleString()}` },
        { label: 'Displacement', key: 'displacement', unit: 'cc' },
        { label: 'Max Power', key: 'max_power', unit: 'bhp' },
        { label: 'Max Torque', key: 'max_torque', unit: 'Nm' },
        { label: 'Top Speed', key: 'top_speed', unit: 'km/h' },
        { label: 'Mileage', key: 'mileage_owner_reported', unit: 'km/L' },
        { label: 'Fuel Tank Capacity', key: 'fuel_tank_capacity', unit: 'L' },
        { label: 'Kerb Weight', key: 'weight', unit: 'kg' }
      ]
    },
    engine: {
      title: 'Engine & Transmission',
      specs: [
        { label: 'Cooling System', key: 'cooling_system' },
        { label: 'Cylinders', key: 'cylinders' },
        { label: 'Transmission', key: 'transmission' },
        { label: 'Gear Shifting Pattern', key: 'gear_shifting_pattern' }
      ]
    },

    brakes: {
      title: 'Brakes & Suspension',
      specs: [
        { label: 'Braking System', key: 'braking_system' },
        { label: 'Front Brake Type', key: 'front_brake_type' },
        { label: 'Rear Brake Type', key: 'rear_brake_type' },
      ]
    },
    wheels: {
      title: 'Wheels & Tyres',
      specs: [
        { label: 'Wheel Type', key: 'wheel_type' },
        { label: 'Tyre Type', key: 'tyre_type' },
        { label: 'Radial Tyres', key: 'radial_tyres', format: (value) => value ? 'Yes' : 'No' }
      ]
    }
  };

  const renderBikeSelector = (index) => (
    <div className="bike-selector">
      <select
        value={selectedBikes[index]?.id || ''}
        onChange={(e) => {
          const selectedBike = bikes.find(bike => bike.id === parseInt(e.target.value));
          handleBikeSelect(index, selectedBike);
        }}
        aria-label={`Select motorcycle ${index + 1}`}
      >
        <option value="">Select a motorcycle</option>
        {bikes.map(bike => (
          <option key={bike.id} value={bike.id}>{bike.name}</option>
        ))}
      </select>
      {selectedBikes[index] && (
        <button 
          className="clear-selection" 
          onClick={() => handleClearSelection(index)}
          aria-label="Clear selection"
        >
          ×
        </button>
      )}
    </div>
  );

  const formatSpecValue = (bike, spec) => {
    if (!bike) return '-';
    if (spec.format) return spec.format(bike);
    const value = bike[spec.key];
    if (value === null || value === undefined) return '-';
    return spec.unit ? `${value} ${spec.unit}` : value;
  };

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        setLoading(true);
        const res = await getData('api/get-bike/');
        console.log('Fetched bikes:', res);
        setBikes(res);
      } catch (err) {
        console.error('Error fetching bikes:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBikes();
  }, []);

  const renderComparisonTable = () => {
    const activeBikes = selectedBikes.filter(bike => bike !== null);
    if (activeBikes.length < 2) {
      return (
        <div className="comparison-placeholder">
          <div className="placeholder-content">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#d1d5db" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
            </svg>
            <h3>Select at least 2 motorcycles to compare</h3>
            <p>Use the dropdown menus above to choose motorcycles for comparison</p>
          </div>
        </div>
      );
    }

    return (
      <div className="comparison-section">
        <div className="category-tabs">
          {Object.entries(specificationCategories).map(([key, category]) => (
            <button
              key={key}
              className={`category-tab ${activeTab === key ? 'active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              {category.title}
            </button>
          ))}
        </div>

        <div className="comparison-table-container">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Specification</th>
                {activeBikes.map((bike, index) => (
                  <th key={index}>
                    <div className="bike-header">
                      <img 
                        src={bike.image1 ? `${process.env.REACT_APP_API_URL}${bike.image1}` : ''} 
                        alt={bike.name} 
                        className="bike-thumbnail" 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/120x80?text=No+Image';
                        }}
                      />
                      <h3>{bike.name}</h3>
                      <p className="bike-price">₹{parseInt(bike.price).toLocaleString()}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specificationCategories[activeTab].specs.map((spec, specIndex) => (
                <tr key={specIndex} className="spec-row">
                  <td className="spec-label">{spec.label}</td>
                  {activeBikes.map((bike, bikeIndex) => {
                    const value = formatSpecValue(bike, spec);
                    const isDifferent = activeBikes.some(otherBike => 
                      formatSpecValue(otherBike, spec) !== value
                    );
                    return (
                      <td 
                        key={bikeIndex} 
                        className={`spec-value ${isDifferent ? 'spec-difference' : ''}`}
                      >
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="difference-summary">
          <h3>Key Differences</h3>
          <ul>
            {specificationCategories[activeTab].specs.map((spec, specIndex) => {
              const values = activeBikes.map(bike => formatSpecValue(bike, spec));
              const uniqueValues = [...new Set(values.filter(v => v !== '-'))];
              if (uniqueValues.length > 1) {
                return (
                  <li key={specIndex} className="difference-item">
                    <strong>{spec.label}:</strong> {uniqueValues.join(' vs ')}
                  </li>
                );
              }
              return null;
            }).filter(Boolean)}
          </ul>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading motorcycles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!bikes || bikes.length === 0) {
    return (
      <div className="error-container">
        <div className="error-message">No motorcycles available for comparison.</div>
      </div>
    );
  }

  return (
    <div className="compare-container">
      <div className="compare-header">
        <h1>Compare Motorcycles</h1>
        <p className="subtitle">Select up to 4 motorcycles to compare their specifications</p>
      </div>

      <div className="bike-selectors">
        {[0, 1, 2, 3].map(index => renderBikeSelector(index))}
      </div>

      {renderComparisonTable()}
    </div>
  );
};

export default Compare;