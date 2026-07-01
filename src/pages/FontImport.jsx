import React from 'react';

// Importa as fontes e estilos globais das telas de auth.
// Renderizado uma vez no topo de Login e Register.
export function FontImport() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,600&family=Jost:wght@300;400;500&display=swap');
      * { box-sizing: border-box; }
      body { margin: 0; }
      input::placeholder { color: #8a8479; }
      input:focus { border-color: #8b6f4e !important; }
    `}</style>
  );
}

export default FontImport;