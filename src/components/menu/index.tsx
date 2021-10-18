import React from "react";
import { useAuth } from "../../contexts/auth";

const Menu: React.FC = () => {
    const { signed, user } = useAuth();
    return (
        signed ? <>{user.user}</> : <>Não tem Nome</>
    );
}

export default Menu;