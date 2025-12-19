// components/UploadScreen.tsx
import React from 'react';
import { Upload, HelpCircle } from 'lucide-react';

interface UploadScreenProps {
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHelpClick: () => void;
}

export const UploadScreen: React.FC<UploadScreenProps> = ({ onFileUpload, onHelpClick }) => (
  <div style={{ 
    textAlign: 'center', 
    padding: '3rem 1.25rem',
    maxWidth: '600px',
    margin: '0 auto',
    minHeight: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    {/* Área de upload principal - estilo ChatGPT */}
    <label 
      style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 2rem',
        border: '2px dashed #d1d5db',
        borderRadius: '1rem',
        backgroundColor: '#fafafa',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        width: '100%',
        maxWidth: '500px',
        minHeight: '300px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f3f4f6';
        e.currentTarget.style.borderColor = '#e5b45f';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#fafafa';
        e.currentTarget.style.borderColor = '#d1d5db';
      }}
    >
      {/* Icono de upload */}
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: '#e5b45f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
        transition: 'transform 0.2s ease'
      }}>
        <Upload size={40} style={{ color: 'white' }} strokeWidth={2} />
      </div>

      {/* Título */}
      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: 600, 
        color: '#203c42',
        margin: '0 0 0.75rem 0'
      }}>
        Sube tu extracto bancario
      </h3>

      {/* Subtítulo */}
      <p style={{ 
        color: '#6b7280',
        fontSize: '0.9375rem',
        lineHeight: '1.5',
        margin: '0 0 1.5rem 0',
        maxWidth: '380px'
      }}>
        Arrastra el archivo aquí o haz clic para seleccionarlo
      </p>

      {/* Formatos aceptados */}
      <p style={{ 
        color: '#9ca3af',
        fontSize: '0.8125rem',
        margin: 0,
        fontWeight: 500
      }}>
        Excel (.xlsx, .xls) o CSV
      </p>

      <input
        type="file"
        accept=".csv,.xlsx,.xls,.txt"
        onChange={onFileUpload}
        style={{ display: 'none' }}
      />
    </label>

    {/* Botón de ayuda - pequeño y discreto */}
    <button
      onClick={onHelpClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#6b7280',
        padding: '0.625rem 1rem',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        fontWeight: 500,
        fontSize: '0.8125rem',
        backgroundColor: 'transparent',
        border: 'none',
        marginTop: '1.5rem',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = '#203c42';
        e.currentTarget.style.backgroundColor = '#f3f4f6';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = '#6b7280';
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      <HelpCircle size={16} />
      ¿Necesitas ayuda?
    </button>
  </div>
);