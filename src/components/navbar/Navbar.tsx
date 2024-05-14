import { Navbar as NavBarComponent, NavbarBrand, NavbarContent } from '@nextui-org/react'
import Logo from '@/components/Logo'
import User from '@/components/navbar/User'

export default function Navbar() {
  return (
    <NavBarComponent shouldHideOnScroll className="bg-primary text-primary-foreground w-full">
      <NavbarContent justify="start">
        <NavbarBrand>
          <Logo />
          <span className="text-2xl tracking-wider font-light">MikBooks</span>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <User />
      </NavbarContent>
    </NavBarComponent>
  )
}
