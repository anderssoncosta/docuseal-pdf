import { useState } from "react";
import RenderPdf from "./pdf-render";
import axios from "axios";

interface Document {
  id: number;
  name: string;
  url: string;
}

const DocumentList = () => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [token, setToken] = useState<string | null>(null);

  const handleDocumentClick = async (document: Document) => {
    try {
      const response = await axios.post(
        "http://localhost:3015/api/docuseal/builder_token",
        {
          url: document.url,
        }
      );
      if (response.status === 200) {
        setSelectedDocument(document);
        setToken(response.data.token);
        console.log(response);
      } else {
        throw new Error("Failed to fetch token");
      }
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  const documents: Document[] = [
    {
      id: 1,
      name: "Document 1",
      url: "https://acrobat.adobe.com/id/urn:aaid:sc:us:9c8f4422-adb7-404a-a475-719fe38773ca",
    },
    { id: 2, name: "Document 2", url: "https://example.com/document2.pdf" },
    { id: 3, name: "Document 3", url: "https://example.com/document3.pdf" },
  ];

  return (
    <div>
      <h2>Document List</h2>
      <ul>
        {documents.map((document) => (
          <li key={document.id}>
            <a>{document.name}</a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleDocumentClick(document);
              }}
            >
              {document.url}
            </a>
          </li>
        ))}
      </ul>
      {selectedDocument && token && (
        <RenderPdf token={token} url={selectedDocument.url} />
      )}
    </div>
  );
};

export default DocumentList;
