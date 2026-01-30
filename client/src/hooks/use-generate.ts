import { useMutation } from "@tanstack/react-query";
import { api, type GenerateBotRequest } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useGenerateBot() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: GenerateBotRequest) => {
      // Validate first using the shared schema just in case
      const validatedData = api.generate.input.parse(data);

      const response = await fetch(api.generate.path, {
        method: api.generate.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to generate bot");
      }

      // Handle Blob response for download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "main.py"; // The filename to save as
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      return true;
    },
    onError: (error) => {
      toast({
        title: "Generation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your bot script has been generated and downloaded.",
      });
    },
  });
}
