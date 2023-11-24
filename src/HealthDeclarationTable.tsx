import React from 'react';

interface HealthDeclarationTableProps {
  data: {
    name: string;
    temperature: string;
    symptoms: string[];
    contactWithCovid: boolean;
  }[];
}

const HealthDeclarationTable: React.FC<HealthDeclarationTableProps> = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Temperature</th>
          <th>Symptoms</th>
          <th>Contact with Covid</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry, index) => (
          <tr key={index}>
            <td>{entry.name}</td>
            <td>{entry.temperature}</td>
            <td>{entry.symptoms.join(', ')}</td>
            <td>{entry.contactWithCovid ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HealthDeclarationTable;
