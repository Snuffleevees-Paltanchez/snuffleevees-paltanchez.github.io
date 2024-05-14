import { LogInIcon, LogOutIcon } from 'lucide-react'
import {
  Avatar,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react'
import { useAuth0 } from '@auth0/auth0-react'

export default function User() {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0()
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
