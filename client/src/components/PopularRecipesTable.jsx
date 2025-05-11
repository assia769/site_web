// frontend/src/components/PopularRecipesTable.jsx
import React from 'react';

const PopularRecipesTable = ({ recipes }) => {
  return (
    <div>
      <h2 style={{ textAlign: 'center', color: '#8b0000', marginBottom: '20px' }}>
        Top 10 des recettes les plus populaires
      </h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#8b0000', color: 'white' }}>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Titre</th>
              <th style={{ padding: '12px', textAlign: 'center', border: '1px solid #ddd' }}>Note moyenne</th>
              <th style={{ padding: '12px', textAlign: 'center', border: '1px solid #ddd' }}>Nombre d'évaluations</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe.id_p} style={{ backgroundColor: 'white' }}>
                <td style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>{recipe.title_p}</td>
                <td style={{ padding: '12px', textAlign: 'center', border: '1px solid #ddd' }}>
                  {recipe.average_rating} / 5
                </td>
                <td style={{ padding: '12px', textAlign: 'center', border: '1px solid #ddd' }}>
                  {recipe.rating_count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PopularRecipesTable;