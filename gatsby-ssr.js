// @ts-nocheck

import React from "react";
import { Providers } from "./src/context";
import "./src/global.css";


const HeadComponent = [
    <script
        async
        key="adsense"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8441432984375470"
        crossOrigin="anonymous"
    />,
    <script async src="https://fundingchoicesmessages.google.com/i/pub-8441432984375470?ers=1" nonce="dBWwHnd_1Xub1Hk7aU2V_A"></script>,
    <script nonce="dBWwHnd_1Xub1Hk7aU2V_A" src="/signalGooglefcPresent.js"></script>,
    <script src="/protectionMessageError.js"></script>
]

export const wrapRootElement = ({ element }) => (
    <Providers>
        {element}
    </Providers>
)

export const onRenderBody = ({ setHeadComponents }, pluginOptions) => {
    setHeadComponents(HeadComponent);
}