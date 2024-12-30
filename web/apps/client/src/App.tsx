import { Excalidraw, WelcomeScreen } from "@excalidraw/excalidraw";

export default function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Excalidraw>
        <WelcomeScreen />
      </Excalidraw>
    </div>
  );
}
