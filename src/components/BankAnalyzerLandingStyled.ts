// BankAnalyzerLandingStyled.ts
import styled, { keyframes } from 'styled-components';

// Animaciones
export const float = keyframes`
  0% {
    transform: translateY(-100px) rotate(0deg);
    opacity: 0;
  }
  5% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.4;
  }
  95% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(100vh) rotate(180deg);
    opacity: 0;
  }
`;

export const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Contenedores principales
export const PageContainer = styled.div`
  min-height: 100vh;
  background: #203c42;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  position: relative;
  overflow: hidden;
`;

export const ContentBox = styled.div<{ maxWidth?: string }>`
  max-width: ${(props: { maxWidth?: string }) => props.maxWidth || '500px'};
  width: 100%;
  background: white;
  border-radius: 1rem;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`;

export const InitialScreenContainer = styled.div`
  max-width: 500px;
  width: 100%;
  text-align: center;
  color: white;
  position: relative;
  z-index: 1;
`;

// Header y Títulos
export const LogoContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const Logo = styled.img`
  height: 64px;
  width: auto;
`;

export const MainTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  margin: 0;
  color: white;
`;

export const Title = styled.h2`
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  color: #203c42;
  margin-bottom: 0.5rem;
  text-align: center;
`;

export const Subtitle = styled.p<{ white?: boolean }>`
  font-size: clamp(0.875rem, 2vw, 1rem);
  color: ${(props: { white?: boolean }) => props.white ? 'white' : '#6b7280'};
  margin-bottom: ${(props: { white?: boolean }) => props.white ? '3rem' : '2rem'};
  text-align: center;
  opacity: ${(props: { white?: boolean }) => props.white ? 0.7 : 1};
`;

export const Tagline = styled.p`
  font-size: clamp(1.125rem, 3vw, 1.5rem);
  margin-bottom: 1rem;
  opacity: 0.9;
  color: white;
`;

// Botones
export const PrimaryButton = styled.button<{ disabled?: boolean }>`
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  background: ${(props: { disabled?: boolean }) => props.disabled ? '#9ca3af' : '#e5b45f'};
  color: white;
  border: none;
  border-radius: 0.75rem;
  cursor: ${(props: { disabled?: boolean }) => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(229, 180, 95, 0.3);
  width: 100%;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(229, 180, 95, 0.4);
  }
`;

export const SecondaryButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  width: 100%;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

export const SubmitButton = styled.button<{ disabled?: boolean }>`
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  background: ${(props: { disabled?: boolean }) => props.disabled ? '#9ca3af' : 'linear-gradient(135deg, #e5b45f 0%, #d4a04a 100%)'};
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: ${(props: { disabled?: boolean }) => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
`;

export const LinkButton = styled.button`
  background: none;
  border: none;
  color: #e5b45f;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  font-size: inherit;
  padding: 0;

  &:hover {
    color: #d4a04a;
  }
`;

export const CopyButton = styled.button<{ copied?: boolean }>`
  padding: 0.5rem;
  background: ${(props: { copied?: boolean }) => props.copied ? '#10b981' : '#e5b45f'};
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

// Formularios
export const Form = styled.form`
  display: flex;
  flex-direction: 'column';
  gap: 1.5rem;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  z-index: 1;
  display: flex;
  align-items: center;
`;

export const Input = styled.input<{ hasIcon?: boolean }>`
  width: 100%;
  padding: ${(props: { hasIcon?: boolean }) => props.hasIcon ? '0.875rem 1rem 0.875rem 3rem' : '0.875rem 1rem'};
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &:focus {
    border-color: #e5b45f;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const PasswordInput = styled(Input)`
  padding-right: 3rem;
`;

export const TogglePasswordButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  padding: 0;
  z-index: 1;
  display: flex;
  align-items: center;

  &:hover {
    color: #6b7280;
  }
`;

// Alertas y Mensajes
export const ErrorBox = styled.div`
  padding: 1rem;
  background: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  color: #b91c1c;
  font-size: 0.875rem;
  line-height: 1.4;
`;

export const SuccessBox = styled.div`
  padding: 1.5rem;
  background: #d1fae5;
  border: 2px solid #10b981;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
`;

export const SuccessTitle = styled.div`
  color: #065f46;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const PasswordBox = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

export const PasswordLabel = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

export const PasswordDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: space-between;
`;

export const PasswordCode = styled.code`
  font-size: 1.125rem;
  font-weight: 700;
  color: #203c42;
  font-family: monospace;
  letter-spacing: 0.05em;
  word-break: break-all;
`;

export const WarningText = styled.div`
  font-size: 0.75rem;
  color: #065f46;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

export const PhoneErrorText = styled.div`
  font-size: 0.75rem;
  color: #dc2626;
  margin-top: 0.375rem;
`;

// Layout
export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FooterText = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
`;

// Iconos flotantes
interface FloatingIconProps {
  left: number;
  delay: number;
  duration: number;
}

export const FloatingIconWrapper = styled.div<FloatingIconProps>`
  position: absolute;
  left: ${(props: FloatingIconProps) => props.left}%;
  opacity: 0;
  animation: ${float} ${(props: FloatingIconProps) => props.duration}s ease-in-out infinite;
  animation-delay: ${(props: FloatingIconProps) => props.delay}s;
  top: -100px;
  pointer-events: none;
  color: rgba(229, 180, 95, 0.4);
  filter: drop-shadow(0 2px 8px rgba(229, 180, 95, 0.3));
`;

// Loading spinner
export const LoadingIcon = styled.div`
  animation: ${spin} 1s linear infinite;
  display: flex;
  align-items: center;
`;

// Estilos globales para PhoneInput
export const PhoneInputStyles = styled.div`
  .phone-input-custom .PhoneInputInput {
    width: 100%;
    padding: 0.875rem 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 0.5rem;
    font-size: 1rem;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s;
  }
  
  .phone-input-custom .PhoneInputInput:focus {
    border-color: #e5b45f;
  }
  
  .phone-input-custom .PhoneInputCountrySelect {
    margin-right: 0.5rem;
    padding: 0.5rem;
    border: 2px solid #e5e7eb;
    border-radius: 0.5rem;
    font-size: 1rem;
    outline: none;
    cursor: pointer;
    transition: border-color 0.2s;
  }
  
  .phone-input-custom .PhoneInputCountrySelect:focus {
    border-color: #e5b45f;
  }
  
  .phone-input-custom .PhoneInputCountryIcon {
    width: 1.5rem;
    height: 1.5rem;
  }
`;