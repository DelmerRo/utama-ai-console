import { useState } from 'react';
import { useProductStore } from '../store/useProductStore';
import { analyzeProductWithAI } from '../api/gemini';
import { DEFAULT_MODEL_ID } from '../config/models';

export const useProductAnalysis = () => {
  const { input, setEnrichmentData, setIsAnalyzing } = useProductStore();
  const [selectedModel, setSelectedModel] = useState<string>(DEFAULT_MODEL_ID);

  const handleEnrich = async () => {
    if (!input.imageFile || !input.name) {
      alert("Por favor, subí una foto y agregá al menos un nombre provisional.");
      return;
    }

    setIsAnalyzing(true);
    try {
      const enrichedData = await analyzeProductWithAI(input, selectedModel);
      setEnrichmentData(enrichedData);
    } catch (error: any) {
      alert(error?.message || "Hubo un error al analizar la imagen. Revisá la consola.");
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    selectedModel,
    setSelectedModel,
    handleEnrich
  };
};