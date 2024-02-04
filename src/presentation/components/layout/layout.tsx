import HeaderComponent from '@/presentation/components/header/header'
type LayoutComponentProps = {
  children: React.ReactNode
}

const LayoutComponent: React.FC<LayoutComponentProps> = ({
  children
}: LayoutComponentProps) => {
  return (
    <>
      <HeaderComponent />
      {children}
    </>
  )
}

export default LayoutComponent
