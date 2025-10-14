import React from "react";

interface Props {
    url: string;
    iframeKey: number;
}

const BrowserContent: React.FC<Props> = ({ url, iframeKey }) => (
    <iframe
        key={iframeKey}
        src={url}
        className="w-full h-[500px] border-0 flex-grow rounded-b-xl"
        title="Browser Content"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
    />
);

export default BrowserContent;
