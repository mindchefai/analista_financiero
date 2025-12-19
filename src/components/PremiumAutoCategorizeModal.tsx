import React from 'react';
import { Sparkles, Lock, ArrowRight } from 'lucide-react';
import {
  Overlay,
  ModalCard,
  Header,
  IconBadge,
  Title,
  Description,
  HighlightBox,
  Actions,
  PrimaryButton,
  SecondaryButton,
} from './PremiumAutoCategorizeModalStyled';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PremiumAutoCategorizeModal: React.FC<Props> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalCard>
        <Header>
          <IconBadge>
            <Sparkles size={20} />
          </IconBadge>
          <Title>Auto-categorización inteligente</Title>
        </Header>

        <Description>
          Clasifica automáticamente <strong>todos los conceptos bancarios</strong> mediante
          un asistente de inteligencia artificial desarrollado por <strong>MindChef</strong>.
        </Description>

        <HighlightBox>
          <Lock size={14} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
          Funcionalidad premium disponible exclusivamente para clientes de MindChef.
        </HighlightBox>

        <Actions>
          <PrimaryButton
            onClick={() => window.open('https://mindchefai.com', '_blank')}
          >
            Ir a MindChef
            <ArrowRight size={18} />
          </PrimaryButton>

          <SecondaryButton onClick={onClose}>
            Cerrar
          </SecondaryButton>
        </Actions>
      </ModalCard>
    </Overlay>
  );
};
