import {
  convertToExcalidrawElements,
  Excalidraw,
} from "@excalidraw/excalidraw";
import { useEffect, useState } from "react";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import {
  ExcalidrawElement,
  ExcalidrawTextElement,
  NonDeletedExcalidrawElement,
} from "@excalidraw/excalidraw/types/element/types";
import { parseMermaid } from "@excalidraw/mermaid-to-excalidraw/dist/parseMermaid";

export default function App() {
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);
  const [elements, setElements] = useState<ExcalidrawElement[]>([]);
  const [lastElement, setLastElement] = useState<NonDeletedExcalidrawElement>();

  useEffect(() => {
    if (!excalidrawAPI) return;

    excalidrawAPI.onPointerUp(() => {
      const currentElements = excalidrawAPI.getSceneElements();
      setLastElement(currentElements[currentElements.length - 1]);

      if (lastElement?.type === "rectangle" && !lastElement.customData?.text) {
        // Create a ghost text element
        const textElement = convertToExcalidrawElements([
          {
            type: "text",
            text: "Server",
            x: lastElement.x,
            y: lastElement.y,
            customData: {
              opacity: 0.3,
            },
          },
        ]);

        excalidrawAPI.updateScene({
          elements: [...currentElements.slice(0, -1), ...textElement],
        });
      }
      // if (lastElement?.type === "rectangle" && !lastElement.customData?.text) {
      //   // Create a ghost text element
      //   const textElement = convertToExcalidrawElements([
      //     {
      //       type: "text",
      //       x: lastElement.x,
      //       y: lastElement.y,
      //     },
      //   ]);
      //   console.log("ran");
      //   excalidrawAPI.updateScene({
      //     elements: [...currentElements.slice(0, -1), updatedElement],
      //   });
      // }

      // setElements(currentElements);
    });
  }, [excalidrawAPI]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab" && excalidrawAPI) {
      const currentElements = excalidrawAPI.getSceneElements();
      const selectedElement = currentElements.find((el) => el.customData?.text);

      if (
        selectedElement?.type === "rectangle" &&
        selectedElement.opacity === 0.3
      ) {
        const updatedElement = {
          ...selectedElement,
          opacity: 1,
        };

        excalidrawAPI.updateScene({
          elements: currentElements.map((el) =>
            el.id === selectedElement.id ? updatedElement : el
          ),
        });
      }
    }
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }} onKeyDown={onKeyDown}>
      <Excalidraw
        initialData={{
          elements,
          scrollToContent: true,
          appState: {
            viewBackgroundColor: "#fff",
            currentItemFontFamily: 1,
          },
        }}
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
      />
    </div>
  );
}
