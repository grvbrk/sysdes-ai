
import example from "./example.json"
import { excalidrawV2ToMermaidFlowChart } from '../excToMermParser';
import { ExcalidrawJson } from '../excToMermParser/types';

const EXPECTED_EXAMPLE_OUTPUT = `flowchart TD\n  \tRADIO[Christmas] --> |Get money| CUSTOMS(Go shopping)\n\tCUSTOMS(Go shopping) --> HEADING{Let me <br/>think}\n\tHEADING{Let me <br/>think} --> |One| HIGHER[Laptop]\n\tHEADING{Let me <br/>think} --> |Two| ARRANGEMENT[iPhone]\n\tHEADING{Let me <br/>think} --> |Three| IMPOSSIBLE[ Car]`;

describe('flowchart', () => {
  it('should be correct example output', async () => {
    const output = excalidrawV2ToMermaidFlowChart('TD', example as ExcalidrawJson);
    expect(output).toBe(EXPECTED_EXAMPLE_OUTPUT);
  })
})