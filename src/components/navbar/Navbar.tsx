import { useNavigate } from 'react-router-dom'
import { Navbar as NavBarComponent, NavbarBrand, NavbarContent } from '@nextui-org/react'
import Logo from '@/components/Logo'
import User from './User'
import SearchInput from './SearchInput'

export default function Navbar() {
  const navigate = useNavigate()
  return (
    <NavBarComponent shouldHideOnScroll className="bg-primary text-primary-foreground w-full">
      <NavbarContent justify="start">
        <NavbarBrand className="cursor-pointer" onClick={() => navigate('/')}>
          <Logo />
          <span className="text-2xl tracking-wider font-light">MikBooks</span>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="center">
        <SearchInput />
      </NavbarContent>
      <NavbarContent justify="end">
        <User />
      </NavbarContent>
    </NavBarComponent>
  )
}
