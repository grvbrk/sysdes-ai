import { useDeferredValue, useState } from "react";
import ExcalidrawWrapper, { MermaidData } from "./ExcalidrawWrapper";
import { NonDeletedExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";

export default function App() {
  const [mermaidData, setMermaidData] = useState<MermaidData>({
    definition: "sample",
    error: null,
    output: null,
  });
  const deferredMermaidData = useDeferredValue(mermaidData);

  function handleElementsChange(els: readonly NonDeletedExcalidrawElement[]) {
    console.log(els);
  }

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ExcalidrawWrapper
        mermaidDefinition={deferredMermaidData.definition}
        mermaidOutput={deferredMermaidData.output}
        setMermaidData={setMermaidData}
        handleElementsChange={handleElementsChange}
      />
    </div>
  );
}
