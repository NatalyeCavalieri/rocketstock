import { BrowserRouter } from 'react-router-dom';

import { useAuth } from "../hooks/auth";

import { AdminRoutes } from './admin.routes';
import { CostumerRoutes } from "./costumer.routes"
import { SaleRoutes } from "./sale.routes"
import { AuthRoutes } from './auth.routes';
import { USER_ROLES } from "../utils/roles"
import { useEffect } from 'react';
import { api } from '../services/api';


export function Routes() {
  const { user, signOut } = useAuth();

  useEffect(()=> {
    api.get("/users/validated").catch((error)=>{
     { 
      if(error.response?.status === 401){
        signOut()
      }
    }
    })
  }, [])

    function AccessRoutes(){
      switch(user.role){
        case USER_ROLES.ADMIN:
         return <AdminRoutes/>
         case USER_ROLES.COSTUMER:
          return <CostumerRoutes/>
          case USER_ROLES.SALE:
            return <SaleRoutes/>
            default:
              return <CostumerRoutes/>
         }
      }
    
  return (
    <BrowserRouter>
      {user ? <AccessRoutes /> : <AuthRoutes />}
    </BrowserRouter>
  );
}