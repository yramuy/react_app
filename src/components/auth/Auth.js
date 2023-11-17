import React, { useContext, useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState("");
    const [userId, setUserId] = useState("");
    const [userRole, setUserRole] = useState("");
    const [flash, setFlash] = useState("");

    const login = (id, name,role) => {
        setUser(name);
        setUserId(id);
        setUserRole(role);
    }

    const logout = () => {
        setUser("");
        setUserId("");
        setUserRole("");
    }

    const flashMsg1 = (msg) => {

        setFlash(msg);
    }
    
    return (
        <AuthContext.Provider value={{ user,userId,userRole,login,logout, flashMsg1, flash }}>
            {children}
        </AuthContext.Provider>
    );
};

export  const useAuth = () => {
    return useContext(AuthContext);
    
};