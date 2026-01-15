import { instance } from "@viz-js/viz";

export const renderGraph = async (dotString: string, elementId: string) => {
  try {
    const viz = await instance();
    const svgElement = viz.renderSVGElement(dotString);
    
    const container = document.getElementById(elementId);
    if (container) {
      container.innerHTML = ''; // Clear previous
      
      // Professional styling
      svgElement.style.width = "100%";
      svgElement.style.height = "auto";
      svgElement.style.maxWidth = "80vw";
      svgElement.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
      svgElement.style.borderRadius = "8px";
      svgElement.style.background = "white";
      svgElement.style.padding = "20px";
      
      container.appendChild(svgElement);
    }
  } catch (error) {
    console.error("Graph rendering failed:", error);
  }
};