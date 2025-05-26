import React, { useEffect, useState } from 'react';
import { getCountryData, getStateData, getCityData } from '../../API/Dropdown API/DropdownAPI'
function Dropdowns() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    handleCountry();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      handleState(selectedCountry)
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      handleCity(selectedState)
    }
  }, [selectedState]);

  const handleCountry = async () => {
    const res = await getCountryData();
    console.log(res, "This is country data")
    setCountries(res.data);
  }

  const handleState = async (country_id) => {
    const res = await getStateData(country_id);
    setStates(res.data);
    setCities([]);
    setSelectedState(null);
  }

  const handleCity = async (state_id) => {
    const res = await getCityData(state_id);
    setCities(res.data);
  }

  return (
    <div>
      <h3>Select Country, State, and City</h3>
      <select onChange={(e) => setSelectedCountry(e.target.value)} defaultValue="">
        <option value="" disabled>Select Country</option>
        {countries.map(country => (
          <option key={country.id} value={country.id}>{country.name}</option>
        ))}
      </select>

      <select onChange={(e) => setSelectedState(e.target.value)} disabled={!states.length} defaultValue="">
        <option value="" disabled>Select State</option>
        {states.map(state => (
          <option key={state.id} value={state.id}>{state.name}</option>
        ))}
      </select>

      <select disabled={!cities.length} defaultValue="">
        <option value="" disabled>Select City</option>
        {cities.map(city => (
          <option key={city.id} value={city.id}>{city.name}</option>
        ))}
      </select>
    </div>
  );
}

export default Dropdowns;
