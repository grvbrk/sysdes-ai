import { Excalidraw } from "@excalidraw/excalidraw";
import { useRef } from "react";

export default function App() {
  const excalidrawRef = useRef(null);

  return (
    <div>
      <Excalidraw
        ref={excalidrawRef}
        theme="dark"
        // initialElements={[
        //   {
        //     type: "rectangle",
        //     id: "rect-1",
        //     width: 186.47265625,
        //     height: 141.9765625,
        //   },
        // ]}
      />
    </div>
  );
}
