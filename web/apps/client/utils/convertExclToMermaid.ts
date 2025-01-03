function convertElementsToMermaid(elements: any) {
  const nodes = {};
  const connections: any[] = [];

  elements.forEach((element) => {
    if (element.type === "rectangle" || element.type === "diamond") {
      nodes[element.id] = {
        id: element.id,
        text: element.text || element.id,
        type: element.type,
      };
    } else if (element.type === "arrow") {
      connections.push({
        from: element.startBinding?.elementId,
        to: element.endBinding?.elementId,
        text: element.text || "",
      });
    }
  });

  const mermaidNodes = Object.values(nodes)
    .map((node: any) => {
      const nodeType = node.type === "diamond" ? "{" : "[";
      return `${node.id}${nodeType}${node.text}${node.type === "diamond" ? "}" : "]"}`;
    })
    .join("\n  ");

  const mermaidConnections = connections
    .map((conn) => {
      if (conn.from && conn.to) {
        const label = conn.text ? `|${conn.text}|` : "";
        return `${conn.from} -->${label} ${conn.to}`;
      }
      return "";
    })
    .filter(Boolean)
    .join("\n  ");

  return `flowchart TD\n  ${mermaidNodes}\n  ${mermaidConnections}`;
}


