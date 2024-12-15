import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import supabase from "../../config/supabaseClient";

const PTList = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPTs = async () => {
      const { data, error } = await supabase
        .from('personal_trainers')
        .select(`
          user_id,
          introduction,
          specialization,
          price_start,
          price_end,
          users: user_id (username, full_name)
        `);

      if (error) {
        console.error('Error fetching personal trainers:', error);
      } else {
        setTrainers(data);
      }

      setLoading(false);
    };

    fetchPTs();
  }, []);

  return (
    <div>
      <h1>Personal Trainers List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {trainers.map((trainer) => (
            <li key={trainer.user_id}>
              <p><strong>Username:</strong> {trainer.users.username}</p>
              <p><strong>Full Name:</strong> {trainer.users.full_name}</p>
              <p><strong>Introduction:</strong> {trainer.introduction}</p>
              <p><strong>Specialization:</strong> {trainer.specialization}</p>
              <p><strong>Price Range:</strong> ${trainer.price_start} - ${trainer.price_end}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PTList;
