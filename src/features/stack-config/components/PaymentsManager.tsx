import { SectionsWrapper } from '@/shared/components/SectionsWrapper';
import { useStack } from '@/features/stack-config/hooks/useStack';
import { TechButton } from '@/shared/components/TechButton';
import { ClearButton } from '@/shared/components/ClearButton';

export const PaymentsManager = () => {
  const { availableTechs, toggleSelection, selections, clearCategory } = useStack();
  const techs = availableTechs.filter(tech => tech.category === 'payments');
  const selectedId = selections['payments']?.id;

  return (
    <SectionsWrapper title={'Pagamentos'}>
      {techs.map(tech => (
        <TechButton key={tech.id} tech={tech} isSelected={selectedId === tech.id} onToggle={toggleSelection} />
      ))}
      <ClearButton onClick={() => clearCategory('payments')} info={'No payments'} />
    </SectionsWrapper>
  );
};
