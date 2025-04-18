import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Upload, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AnimatedTransition from "./AnimatedTransition";
import { DetectionResult } from "./ResultsDisplay";
import ResultsDisplay from "./ResultsDisplay";

const UploadSection: React.FC = () => {
    const [dragging, setDragging] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<DetectionResult | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const resultsRef = useRef<HTMLDivElement>(null); // Reference to results section


    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
  };

  const processFile = (file: File) => {
    if (!file.type.match(/^image\/(jpeg|jpg|png|gif|bmp)$/i)) {
        toast.error("Please upload a valid image file");
        return;
    }
    if (file.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB limit");
        return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreviewImage(e.target?.result as string);
    reader.readAsDataURL(file);
};

const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) processFile(file);
};

const handleClearImage = () => {
  setPreviewImage(null);
  setResults(null);
  setSelectedFile(null);
  if (fileInputRef.current) fileInputRef.current.value = "";
};


    const sendImageToBackend = async () => {
        if (!selectedFile) {
            toast.error("Please select an image first");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            const response = await fetch("https://ricevision-2.onrender.com/", {
                method: "POST",
                body: formData,
            });

            // const response = await fetch("http://127.0.0.1:10000//",
            if (!response.ok) throw new Error("Failed to analyze image");

            const data = await response.json();
            const newResult: DetectionResult = {
                disease: data.disease,
                confidence: data.confidence,
                severity: data.severity || "moderate",
                description: data.description || `Detected ${data.disease}. Further analysis is recommended.`,
                treatment: data.treatment || "Consult agricultural experts for better disease management.",
            };

            setResults(newResult);
            toast.success(`Prediction: ${data.disease}`);

            // Smoothly scroll to results
            setTimeout(() => {
                resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 500);

        } catch (error) {
            toast.error("Error analyzing image");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="upload" className="w-full py-12 md:py-24 relative">
            <div className="container px-4 md:px-6 relative z-10">
                <AnimatedTransition>
                    <motion.div className="text-center max-w-3xl mx-auto mb-12">
                        <motion.h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-100 to-green-300">
                            Scan Your Rice Plant
                        </motion.h2>
                        <p className="text-green-100 max-w-2xl mx-auto">
                            Upload an image of your rice plant for instant disease detection and treatment recommendations.
                        </p>
                    </motion.div>

                    <motion.div className="w-full max-w-3xl mx-auto">
                        <Card className="bg-green-800 border border-green-600/20 shadow-md">
                            <div className="p-6 text-center">
                                {previewImage ? (
                                    <motion.img
                                        src={previewImage}
                                        alt="Preview"
                                        className="mx-auto max-h-[300px] rounded-lg shadow-md border border-green-600/30"
                                    />
                                ) : (
                                    <div
                                        className={`border-2 border-dashed rounded-xl p-8 ${dragging ? "border-green-500" : "border-green-600 hover:border-green-500"}`}
                                        onDragOver={(e) => {
                                            e.preventDefault();
                                            setDragging(true);
                                        }}
                                        onDragLeave={() => setDragging(false)}
                                        onDrop={handleDrop}
                                    >
                                        <Leaf className="h-8 w-8 text-green-100 mx-auto" />
                                        <h3 className="text-lg font-medium text-green-100">Drag and drop your image here</h3>
                                        <p className="text-sm text-green-200">Supports JPG, PNG, GIF (up to 5MB)</p>
                                        <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                                            <Upload className="h-4 w-4" /> Browse Files
                                        </Button>
                                    </div>
                                )}
                                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInputChange} className="hidden" />
                            </div>

                            {previewImage && (
                              <div className="mt-6 flex justify-center gap-4">
                              <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="p-4" // Add padding outside the button
                              >
                                  <Button onClick={sendImageToBackend} disabled={loading} className="px-6 py-2">
                                      {loading ? "Analyzing..." : "Analyze Image"}
                                  </Button>
                              </motion.button>
                              
                              <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.2, delay: 0.1 }}
                                  className="p-4" // Add padding outside the button
                              >
                                  <Button onClick={handleClearImage} variant="destructive" className="px-6 py-2">
                                      Clear Image
                                  </Button>
                              </motion.button>
                          </div>
                          
                            )}
                        </Card>
                    </motion.div>

                    {/* Show Results Below the Upload Section */}
                    {results && (
                        <div ref={resultsRef} className="mt-12">
                            <ResultsDisplay results={results} originalImage={previewImage} />
                        </div>
                    )}
                </AnimatedTransition>
            </div>
        </section>
    );
};

export default UploadSection;
