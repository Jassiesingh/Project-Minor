import React, { useState } from 'react'
import "./Header.css"
import { SpeedDial, SpeedDialAction } from "@material-ui/lab"
import { Backdrop } from '@material-ui/core'
import DashboardIcon from "@material-ui/icons/Dashboard"
import ListAltIcon from '@material-ui/icons/ListAlt'
import PersonIcon from "@material-ui/icons/Person"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import { useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { logout } from '../../actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import ShoppingCart from '@material-ui/icons/ShoppingCart'

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const alert = useAlert()

  const { cartItems } = useSelector((state) => state.cart)


  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ShoppingCart />, name: `Cart(${cartItems.length})`, func: cart },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ]

  if (user.role === "admin") {
    options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: dashboard })
  }

  function dashboard() {
    history.push("/admin/dashboard")
  }

  function account() {
    history.push("/account")
  }

  function orders() {
    history.push("/orders")
  }

  function cart() {
    history.push("/cart")
  }

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout successfully")
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.profilePic.url ? user.profilePic.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >

        {options.map((item) => (<SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} tooltipOpen onClick={item.func} />
        ))}
      </SpeedDial>
    </>
  )
}

export default UserOptions