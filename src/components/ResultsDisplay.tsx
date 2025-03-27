import { FC, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { FileText, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface DetectionResult {
    disease: string;
    confidence: number;
    severity: string;
    description: string;
    treatment: string;
}

interface ResultsDisplayProps {
    results?: DetectionResult | null; // Make results optional
    isLoading?: boolean; // Make isLoading optional
    originalImage?: string; // Make originalImage optional
    scanProgress?: number; // Make scanProgress optional
    scanPhase?: string; // Make scanPhase optional
    onRescan?: () => void; // Make onRescan optional
}

const ResultsDisplay: FC<ResultsDisplayProps> = ({ results, isLoading, originalImage, scanProgress, scanPhase, onRescan }) => {
    const [retrievedResults, setRetrievedResults] = useState<DetectionResult | null>(null);
    const [retrievedImage, setRetrievedImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // If results are passed as props, use them directly
        if (results) {
            setRetrievedResults(results);
            setRetrievedImage(originalImage || null);
            return; // Exit the effect, as we have props
        }

        // Otherwise, retrieve from sessionStorage
        const storedResults = sessionStorage.getItem('predictionResults');
        const storedImage = sessionStorage.getItem('previewImage');

        if (storedResults) {
            setRetrievedResults(JSON.parse(storedResults));
            setRetrievedImage(storedImage);
        } else {
            setError("No results found.");
        }

        // Clear sessionStorage after retrieval
        sessionStorage.removeItem('predictionResults');
        sessionStorage.removeItem('previewImage');
    }, [results, originalImage]); // Add results and originalImage as dependencies

    return (
        <div className="w-full max-w-3xl mx-auto px-4 py-6">
            {isLoading ? (
                <div className="flex flex-col items-center w-full">
                    <Progress value={scanProgress} className="w-full max-w-md h-2 bg-green-100 border border-green-200" />
                    <p className="text-sm text-green-700 mt-2 font-medium">{scanPhase}</p>
                </div>
            ) : error ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center bg-red-100 border border-red-300 p-4 rounded-lg shadow-md"
                >
                    <div className="flex items-center justify-center gap-2">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <p className="text-sm text-red-700 font-medium">{error}</p>
                    </div>
                </motion.div>
            ) : retrievedResults ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
                    {retrievedImage && (
                        <motion.div
                            className="relative mx-auto overflow-hidden rounded-2xl shadow-lg max-w-md border border-green-300"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                        >
                            <img src={retrievedImage} alt="Analyzed Rice Leaf" className="w-full object-cover rounded-2xl aspect-video" />
                        </motion.div>
                    )}
                    <div className="bg-gradient-to-br from-green-100/90 to-white p-6 rounded-lg border border-green-300/50 shadow-md">
                        <div className="flex items-center gap-2 border-b border-green-200 pb-4 mb-4">
                            <FileText className="h-5 w-5 text-green-600" />
                            <h2 className="text-xl font-semibold text-green-800">Detection Results</h2>
                        </div>
                        <div className="grid gap-4">
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                <Card className="overflow-hidden border border-green-300/50 bg-white shadow-md">
                                    <CardHeader>
                                       
                                        <CardTitle className="text-lg font-medium">{retrievedResults.disease}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                    <p  className="text-sm font-medium mt-4 text-green-800">
  Confidence:</p><p> {retrievedResults.confidence?.toFixed(2)}
</p>
<h4 className="text-sm font-medium mt-4 text-green-800">Description</h4>
                                        <p className="text-sm text-gray-700 leading-relaxed">{retrievedResults.description}</p>
                                        <h4 className="text-sm font-medium mt-4 text-green-800">Recommended Treatment</h4>
                                        <p className="text-sm text-gray-700 mt-1 leading-relaxed">{retrievedResults.treatment}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            ) : (
                <div className="text-center space-y-4">
                    <p className="text-sm text-gray-700">No results found.</p>
                </div>
            )}
        </div>
    );
};

export default ResultsDisplay;