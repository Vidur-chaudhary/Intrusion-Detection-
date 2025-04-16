import React from 'react';

const PowerBIEmbed = () => {
  return (
    <div style={{ 
      height: '100vh',   // Set the container to take the full height of the viewport
      width: '100vw',    // Set the container to take the full width of the viewport
      margin: '0',       // Remove any default margins
      padding: '0',      // Remove any padding
      display: 'flex',   // Use flexbox to center the iframe
      justifyContent: 'center', // Horizontally center the iframe
      alignItems: 'center',     // Vertically center the iframe
      backgroundColor: '#f4f4f4'  // Optional: Set a background color for the container
    }}>
      <iframe
        title="hci"
        width="100%"       // Make the iframe take up the full width of the container
        height="100%"      // Make the iframe take up the full height of the container
        src="https://app.powerbi.com/view?r=eyJrIjoiYjhiNjRkNDAtYWZmMy00M2E1LWE4ZjMtNTM5YTQwZGE1MWQ0IiwidCI6IjM0YmQ4YmVkLTJhYzEtNDFhZS05ZjA4LTRlMGEzZjExNzA2YyJ9"
        frameBorder="0"
        allowFullScreen="true"
        style={{ border: 'none' }}  // Optional: Remove the border around the iframe
      />
    </div>
  );
};

export default PowerBIEmbed;
