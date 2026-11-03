export function getSetCompositionDirective(nameText: string): string {
  if (!nameText) return "featured as a single standalone hero object centered in the frame";
  
  const setRegex = /(?:set|juego)\s*(?:x|\bde\b)?\s*(\d+)/i;
  const match = nameText.match(setRegex);
  
  if (match && match[1]) {
    return `arranged as a neat, premium multi-piece collection of exactly ${match[1]} matching items, displayed in an elegant overlapping or grouped composition showing depth, scale, and exact physical quantity`;
  }
  
  return "featured as a single standalone hero object centered in the frame";
}