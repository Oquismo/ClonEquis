'use client'

import { useState } from 'react';

export function ComposePostButton() {
  const [pending, setPending] = useState(false);

  const handleClick = () => {
    setPending(true);
    // Aquí puedes agregar la lógica para manejar el envío del formulario
    // y luego establecer `setPending(false)` cuando se complete.
  };

  return (
    <button
      disabled={pending}
      type='submit'
      className='bg-sky-500 text-sm disabled:opacity-40 disabled:pointer-events-none font-bold rounded-full px-5 py-2 self-end'
      onClick={handleClick}
    >
      {pending ? 'Posteando...' : 'Postear'}
    </button>
  );
}