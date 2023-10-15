import React from 'react';

export default function ContentCard(props) {
  const { contentType, description, media } = props.item;

  return (
    <div className="content-card">
      <h2>Content Type: {contentType}</h2>
      <p>Description: {description}</p>
      <div className="media-container">
        {media.map((item, index) => (
          <div key={index} className="media-item">
            {item.type === 'image/jpeg' || item.type === 'image/png' ? (
              <img src={item.data} alt={`Media ${index + 1}`} />
            ) : (
              <div>{item.type}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
