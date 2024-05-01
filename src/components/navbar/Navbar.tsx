import { Navbar as NavBarComponent, NavbarBrand, NavbarContent } from '@nextui-org/react'
import Logo from '@/components/Logo'

export default function Navbar() {
  return (
    <NavBarComponent shouldHideOnScroll className="bg-primary text-primary-foreground w-full">
      <NavbarContent justify="start">
        <NavbarBrand>
          <Logo />
          <span className="text-2xl tracking-wider font-light">MikBooks</span>
        </NavbarBrand>
      </NavbarContent>
    </NavBarComponent>
  )
}
