import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
  
    projectCards.forEach(card => {
      const links = card.querySelectorAll('.link-hover');
      const overlay = card.querySelector('.tooltip-overlay');
      const tooltipText = overlay.querySelector('p');
  
      links.forEach(link => {
        link.addEventListener('mouseenter', () => {
          const tooltip = link.getAttribute('data-tooltip');
          tooltipText.textContent = tooltip;
          overlay.classList.remove('hidden');
        });
  
        link.addEventListener('mouseleave', () => {
          overlay.classList.add('hidden');
        });
      });
    });
  });
