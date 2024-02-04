import HeaderComponent from '@/presentation/components/header/header'
import { ListPropertiesUsecase } from '@/domain/usecases'

type LayoutComponentProps = {
  children: React.ReactNode
  listProperties: ListPropertiesUsecase
}

const LayoutComponent: React.FC<LayoutComponentProps> = ({
  children,
  listProperties
}: LayoutComponentProps) => {
  return (
    <>
      <HeaderComponent listProperties={listProperties} />
      {children}
    </>
  )
}

export default LayoutComponent
