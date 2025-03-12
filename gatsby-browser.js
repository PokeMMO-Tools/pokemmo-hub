import React from "react";

import { Providers } from "./src/context";
import "./src/globalv2.css";

export const wrapRootElement = ({ element }) => (
    <Providers>
        {element}
    </Providers>
)