import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

export const ModalCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 480px;
  width: 90%;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  animation: fadeIn 0.25s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

export const IconBadge = styled.div`
  background: rgba(229, 180, 95, 0.15);
  color: #e5b45f;
  padding: 0.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #203c42;
  margin: 0;
`;

export const Description = styled.p`
  font-size: 0.95rem;
  color: #6b7280;
  line-height: 1.6;
  margin: 0.75rem 0;
`;

export const HighlightBox = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1rem;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #374151;
`;

export const Actions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-direction: column;
`;

export const PrimaryButton = styled.button`
  padding: 0.9rem 1.25rem;
  font-size: 1rem;
  font-weight: 600;
  background: linear-gradient(135deg, #e5b45f 0%, #d4a04a 100%);
  color: white;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  transition: all 0.25s ease;
  box-shadow: 0 6px 16px rgba(229, 180, 95, 0.35);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(229, 180, 95, 0.45);
  }
`;

export const SecondaryButton = styled.button`
  padding: 0.8rem 1.25rem;
  font-size: 0.95rem;
  font-weight: 600;
  background: transparent;
  color: #6b7280;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
`;
