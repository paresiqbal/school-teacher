// next
import { createContext, useContext, useState } from "react";

export interface User {
  username: string;
  role: string;
}

const AuthContext = createContext<{}>;
