import { ExcalidrawRectangleElement, ExcalidrawArrowElement, ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";


interface SystemComponent {
  type: string;
  elements: Partial<ExcalidrawElement>[];
  relationships?: {
    possibleConnections: string[];
    suggestedPosition: 'left' | 'right' | 'top' | 'bottom';
  };
}

interface Position {
  x: number;
  y: number;
}

class ExcalidrawSystemDesignAutocomplete {
  private patterns: Map<string, SystemComponent>;
  private baseElementId: number;

  constructor() {
    this.patterns = new Map();
    this.baseElementId = 1;
  }

  private generateElementId(): string {
    return `element_${this.baseElementId++}`;
  }

  addPattern(trigger: string, component: SystemComponent) {
    this.patterns.set(trigger.toLowerCase(), component);
  }

  // Generate an Excalidraw rectangle element
  private createRectangle(position: Position, label: string): Partial<ExcalidrawRectangleElement> {
    return {
      type: "rectangle",
      id: this.generateElementId(),
      x: position.x,
      y: position.y,
      width: 160,
      height: 80,
      backgroundColor: "#ffffff",
      strokeColor: "#1e1e1e",
      strokeWidth: 2,
      roughness: 1,

    };
  }

  private createArrow(start: Position, end: Position): Partial<ExcalidrawArrowElement> {
    return {
      type: "arrow",
      id: this.generateElementId(),
      startBinding: null,
      endBinding: null,
      points: [
        [start.x, start.y],
        [end.x, end.y]
      ],
      strokeColor: "#1e1e1e",
      strokeWidth: 2,
      roughness: 1
    };
  }

  getSuggestions(
    prefix: string,
    currentElements: ExcalidrawElement[],
    cursorPosition: Position
  ): Array<{
    elements: Partial<ExcalidrawElement>[],
    description: string
  }> {
    const suggestions: Array<{
      elements: Partial<ExcalidrawElement>[],
      description: string
    }> = [];

    for (const [trigger, component] of this.patterns.entries()) {
      if (trigger.startsWith(prefix.toLowerCase())) {
        const baseElement = this.createRectangle(
          cursorPosition,
          component.type
        );

        const newElements: Partial<ExcalidrawElement>[] = [baseElement];

        if (component.relationships?.possibleConnections) {
          const offset = 200;

          component.relationships.possibleConnections.forEach((connection, index) => {
            const connectedPosition = {
              x: cursorPosition.x + offset,
              y: cursorPosition.y + (index * 120)
            };

            const connectedElement = this.createRectangle(
              connectedPosition,
              connection
            );

            const arrow = this.createArrow(
              { x: cursorPosition.x + 160, y: cursorPosition.y + 40 },
              { x: connectedPosition.x, y: connectedPosition.y + 40 }
            );

            newElements.push(connectedElement, arrow);
          });
        }

        suggestions.push({
          elements: newElements,
          description: `${component.type} with ${component.relationships?.possibleConnections?.length || 0} connected components`
        });
      }
    }

    return suggestions;
  }
}

export const autocomplete = new ExcalidrawSystemDesignAutocomplete();

autocomplete.addPattern("lb", {
  type: "Load Balancer",
  elements: [],
  relationships: {
    possibleConnections: [
      "Web Server 1",
      "Web Server 2",
      "Web Server 3"
    ],
    suggestedPosition: "right"
  }
});

autocomplete.addPattern("cache", {
  type: "Redis Cache",
  elements: [],
  relationships: {
    possibleConnections: [
      "Application Server",
      "Database"
    ],
    suggestedPosition: "right"
  }
});

autocomplete.addPattern("queue", {
  type: "Message Queue",
  elements: [],
  relationships: {
    possibleConnections: [
      "Producer Service",
      "Consumer Service 1",
      "Consumer Service 2"
    ],
    suggestedPosition: "right"
  }
});

