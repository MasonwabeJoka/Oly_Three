'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

const SouthAfricaData = () => {
  const [southAfricaTree, setSouthAfricaTree] = useState({});

  useEffect(() => {
    const fetchSouthAfricaData = async () => {
      try {
        const query = await fetch('query.txt');
        const queryText = await query.text();

        const response = await axios.post('http://overpass-api.de/api/interpreter', queryText);
        const data = response.data;

        const southAfricaTree = buildTree(data.elements);
        setSouthAfricaTree(southAfricaTree);
      } catch (error) {
        console.error('Error fetching South Africa data:', error);
      }
    };

    fetchSouthAfricaData();
  }, []);

  const buildTree = (features) => {
    const tree = {};

    features.forEach((feature) => {
      if (feature.properties.admin_level === '4') {
        tree.provinces = [feature.properties.name];
      } else if (feature.properties.admin_level === '6') {
        if (!tree.municipalities) {
          tree.municipalities = [];
        }
        tree.municipalities.push(feature.properties.name);
      } else if (feature.properties.admin_level === '8') {
        if (!tree['cities_towns_townships']) {
          tree['cities_towns_townships'] = [];
        }
        tree['cities_towns_townships'].push(feature.properties.name);
      }
    });
  

     tree;
  };

  return (
    <div>
      <h2>South Africa Administrative Boundaries</h2>
      <pre>{JSON.stringify(southAfricaTree, null, 2)}</pre>
    </div>
  );
};

export default SouthAfricaData;