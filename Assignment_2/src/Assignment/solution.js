import React, { useEffect, useState } from 'react';

function Travel() {
  const [tickets] = useState([
    "Paris-Skopje", "Zurich-Amsterdam", "Prague-Zurich",
    "Barcelona-Berlin", "Kiev-Prague", "Skopje-Paris",
    "Amsterdam-Barcelona", "Berlin-Kiev", "Berlin-Amsterdam"
  ])

  const [route, setRoute] = useState([]);

  useEffect(() => {
    findRoute();
  },[]);

  const findRoute = () => {
    const graph = {};

    // Create the graph from the ticket data
    tickets.forEach(ticket => {
      const [source, destination] = ticket.split('-');
      if (!graph[source]) {
        graph[source] = [];
      }
      graph[source].push(destination);
    });

    const stack = ['Kiev']; // Assuming your son started in Kiev
    const calculatedRoute = [];

    while (stack.length > 0) {
      const currentCity = stack[stack.length - 1];
      if (graph[currentCity] && graph[currentCity].length > 0) {
        const nextCity = graph[currentCity].pop();
        stack.push(nextCity);
      } else {
        calculatedRoute.push(stack.pop());
      }
    }

    // Reverse the route since we started from Kiev
    calculatedRoute.reverse();

    setRoute(calculatedRoute);
  };

  return (
    <div>
      <h1>Your son's route through Europe:</h1>
      <ul>
        {route.map(city => (
          <li key={city}>{city}</li>
        ))}
      </ul>
    </div>
  );
}

export default Travel;