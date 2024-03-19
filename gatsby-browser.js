import React from "react";

import { Providers } from "./src/context";
import "./src/global.css";

export const wrapRootElement = ({ element }) => (
    <Providers>
        {element}
    </Providers>
)