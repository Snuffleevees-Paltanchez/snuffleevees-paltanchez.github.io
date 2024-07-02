import { LogInIcon, LogOutIcon, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  Avatar,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react'
import { useUserSession } from '@/hooks/useUserSession'

export default function User() {
  const navigate = useNavigate()
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useUserSession()
  if (isLoading) return null
  else if (!isAuthenticated)
    return (
      <Button
        startContent={<LogInIcon size={24} />}
        color="primary"
        onClick={() => loginWithRedirect()}
      >
        Login
      </Button>
    )
  return (
    <div className="flex justify-center items-center">
      <Dropdown>
        <DropdownTrigger>
          <Button color="primary">
            <Avatar src={user?.picture} alt={user?.name} size="sm" />
            <span className="ml-2 text-xs">{user?.email}</span>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            key="admin"
            startContent={<ShieldCheck size={24} />}
            onClick={() => navigate('/admin')}
          >
            Admin Panel
          </DropdownItem>
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            startContent={<LogOutIcon size={24} />}
            onClick={() => logout()}
          >
            Log out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
