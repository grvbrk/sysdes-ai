import { useCallback, useEffect, useState } from "react";
import {
  Excalidraw,
  convertToExcalidrawElements,
} from "@excalidraw/excalidraw";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types.js";
import { parseMermaid } from "@excalidraw/mermaid-to-excalidraw/dist/parseMermaid";
import { graphToExcalidraw } from "@excalidraw/mermaid-to-excalidraw/dist/graphToExcalidraw";
import { DEFAULT_FONT_SIZE } from "@excalidraw/mermaid-to-excalidraw/dist/constants";
import { NonDeletedExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";

export interface MermaidData {
  definition: string;
  output: Awaited<ReturnType<typeof parseMermaid>> | null;
  error: string | null;
}

interface ExcalidrawWrapperProps {
  mermaidDefinition: MermaidData["definition"];
  mermaidOutput: MermaidData["output"];
  handleElementsChange: (els: readonly NonDeletedExcalidrawElement[]) => void;
  setMermaidData: (data: MermaidData) => void;
}

const ExcalidrawWrapper = ({
  mermaidDefinition,
  mermaidOutput,
  handleElementsChange,
  setMermaidData,
}: ExcalidrawWrapperProps) => {
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);

  useEffect(() => {
    if (!excalidrawAPI) {
      return;
    }

    if (mermaidDefinition === "" || mermaidOutput === null) {
      excalidrawAPI.resetScene();
      return;
    }

    const { elements, files } = graphToExcalidraw(mermaidOutput, {
      fontSize: DEFAULT_FONT_SIZE,
    });

    excalidrawAPI.updateScene({
      elements: convertToExcalidrawElements(elements),
    });
    excalidrawAPI.scrollToContent(excalidrawAPI.getSceneElements(), {
      fitToContent: true,
    });

    if (files) {
      excalidrawAPI.addFiles(Object.values(files));
    }
  }, [mermaidDefinition, mermaidOutput]);

  useEffect(() => {
    excalidrawAPI?.onPointerUp(() => {
      const elements = excalidrawAPI.getSceneElements();
      handleElementsChange(elements);
    });
  }, [excalidrawAPI?.onPointerUp]);

  return (
    <Excalidraw
      initialData={{
        appState: {
          viewBackgroundColor: "#fafafa",
          currentItemFontFamily: 1,
        },
      }}
      excalidrawAPI={(api) => setExcalidrawAPI(api)}
    />
  );
};

export default ExcalidrawWrapper;
