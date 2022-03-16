import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const routes = [
  'SpriteAnimations',
  'Parallax',
  'NPCMovements',
  'RectangleCollisions',
  'CircleCollisions',
  'EventBasedAnim',
  'RavenGame',
  'EnemyTypes',
  'StateManagment',
  'FullGame',
];

function App() {
  return (
    <div>
      {/* Header Nav */}
      <div className="p-4 grid grid-cols-2 md:grid-cols-5 text-center text-white gap-2">
        {routes.map((route) => (
          <Link
            key={route}
            className="bg-[#282828] rounded py-2"
            to={route}
          >
            {route}
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export default App;
