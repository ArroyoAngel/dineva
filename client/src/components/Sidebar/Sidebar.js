import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup/LinksGroup.js";
import { changeActiveSidebarItem } from "../../actions/navigation.js";
import SofiaLogo from "../Icons/SofiaLogo.js";
import cn from "classnames";

import { logoutUser } from '../../redux/user/actions'
const Sidebar = (props) => {

  const {
    activeItem = '',
    ...restProps
  } = props;

  const [burgerSidebarOpen, setBurgerSidebarOpen] = useState(false)

  useEffect(() => {
    if (props.sidebarOpened) {
      setBurgerSidebarOpen(true)
    } else {
      setTimeout(() => {
        setBurgerSidebarOpen(false)
      }, 0);
    }
  }, [props.sidebarOpened])
  
  return (
    <nav className={cn(s.root, {[s.sidebarOpen]: burgerSidebarOpen})} >
      <header className={s.logo}>
        <SofiaLogo/>
        <span className={s.title}>Dineva</span>
      </header>
      <ul className={s.nav}>
        <LinksGroup
          onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={props.activeItem}
          header="Inicio"
          isHeader
          iconName={<i className={'eva eva-home-outline'}/>}
          link="/app/menu"
          index="/app/menu"
          badge="9"
        />
        <h5 className={s.navTitle}>TEMPLATE</h5>
        <LinksGroup
          onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={props.activeItem}
          header="Solicitud de salidas"
          isHeader
          iconName={<i className={'eva eva-text-outline'}/>}
          link="/app/request/"
          index="/app/request/"
          childrenLinks={[
            {
              header: 'Registrar', link: '/app/request/register',
            },
            {
              header: 'Listar', link: '/app/request/list',
            },
          ]}
        />
        <LinksGroup
          onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={props.activeItem}
          header="Órdenes"
          isHeader
          iconName={<i className={'eva eva-grid-outline'}/>}
          link="/app/order/"
          index="/app/order/"
          childrenLinks={[
            {  header: 'Registrar órden recibida', link: '/app/order/register',  },
            {  header: 'Listar órdenes recibidas', link: '/app/order/order-list',  },
            {  header: 'Solicitar a proveedor', link: '/app/order/request',  },
            {  header: 'Listar solicitudes', link: '/app/order/request-list',  },
          ]}
        />
        <LinksGroup
          onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={props.activeItem}
          header="Almacen"
          isHeader
          iconName={<i className={'eva eva-home-outline'}/>}
          link="/app/storehouse/"
          index="/app/storehouse/"
          childrenLinks={[
            {  header: 'Registrar', link: '/app/storehouse/register',  },
            {  header: 'Listar', link: '/app/storehouse/list',  },
          ]}
        />
        <LinksGroup
          onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={props.activeItem}
          header="Usuarios"
          isHeader
          iconName={<i className={'eva eva-person-outline'}/>}
          link="/app/user/"
          index="/app/user/"
          childrenLinks={[
            {  header: 'Registrar', link: '/app/user/register',  },
            {  header: 'Listar', link: '/app/user/list',  },
          ]}
        />
      </ul>
      {/*
        <div className="bg-widget d-flex mt-auto ml-1">
          <Button className="rounded-pill my-3 body-2 d-none d-md-block" color="secondary-red" onClick={()=>props.logoutUser()}>Desconectarse</Button>
        </div>*/
      }
    </nav>
  );
}

Sidebar.propTypes = {
  sidebarOpened: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  activeItem: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    activeItem: store.navigation.activeItem,
  };
}
function mapDispatchToProps(dispatch){
  return {
    logoutUser: () => dispatch(logoutUser())
  }
}

export default withRouter(connect(mapStateToProps/*, mapDispatchToProps*/)(Sidebar));
