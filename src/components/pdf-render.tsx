import { DocusealBuilder } from "@docuseal/react";

interface RenderPdfProps {
  url?: string;
  token: string;
}

const RenderPdf = ({ token }: RenderPdfProps) => {
  return (
    <div>{token ? <DocusealBuilder token={token} /> : <p>Loading...</p>}</div>
  );
};

export default RenderPdf;
