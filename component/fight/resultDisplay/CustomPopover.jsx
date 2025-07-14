import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function CustomPopover({ children, content }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const ref = useRef(null);

  useEffect(() => {
    if (open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8, // 8px en dessous
        left: rect.left + window.scrollX,
      });
    }
  }, [open]);

  return (
    <>
      <div
        ref={ref}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="inline-block cursor-pointer"
      >
        {children}
      </div>

      {open &&
        createPortal(
          <div
            style={{
              position: 'absolute',
              top: position.top,
              left: position.left,
              zIndex: 9999,
              backgroundColor: 'white',
              border: '1px solid #ddd',
              borderRadius: '6px',
              padding: '0.5rem 1rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              width: 256,
            }}
            onMouseEnter={() => setOpen(true)} // Pour ne pas fermer quand on survole le popover
            onMouseLeave={() => setOpen(false)}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
}
