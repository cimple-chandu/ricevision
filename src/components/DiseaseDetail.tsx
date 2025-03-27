
import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle, ArrowRight, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DiseaseDetailProps {
  disease: {
    id: number;
    name: string;
    description: string;
    symptoms: string;
    causes?: string;
    treatment?: string;
    prevention?: string;
    imageUrl: string;
  } | null;
  onClose: () => void;
}

const DiseaseDetail: FC<DiseaseDetailProps> = ({ disease, onClose }) => {
  const [activeTab, setActiveTab] = useState('symptoms');

  if (!disease) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-64 overflow-hidden">
            <img 
              src={disease.imageUrl} 
              alt={disease.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30 transition-colors"
            >
              <X className="h-5 w-5 text-white" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white">{disease.name}</h2>
            </div>
          </div>

          <div className="px-6 pt-6">
            <div className="flex space-x-1 border-b">
              {['symptoms', 'causes', 'treatment', 'prevention'].map((tab) => (
                disease[tab as keyof typeof disease] ? (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "pb-2 px-4 text-sm font-medium border-b-2 transition-colors capitalize whitespace-nowrap",
                      activeTab === tab 
                        ? "border-green-600 text-green-700" 
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300"
                    )}
                  >
                    {tab}
                  </button>
                ) : null
              ))}
            </div>
          </div>

          <div className="p-6 overflow-auto" style={{ maxHeight: '50vh' }}>
            {activeTab === 'symptoms' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <p className="text-muted-foreground">{disease.symptoms}</p>
                <div className="mt-4 bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <div className="flex gap-2 items-start">
                    <div className="mt-0.5">
                      <AlertCircle className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-amber-800">Key symptoms to watch for:</h3>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-3.5 w-3.5 text-amber-600 mt-0.5" />
                          <span>Early detection is critical for effective treatment</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-3.5 w-3.5 text-amber-600 mt-0.5" />
                          <span>Symptoms may vary depending on the rice variety and growth stage</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'causes' && disease.causes && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <p className="text-muted-foreground">{disease.causes}</p>
                <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex gap-2 items-start">
                    <div className="mt-0.5">
                      <Leaf className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-800">Common factors:</h3>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-3.5 w-3.5 text-blue-600 mt-0.5" />
                          <span>High humidity and rainfall</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-3.5 w-3.5 text-blue-600 mt-0.5" />
                          <span>Temperature fluctuations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-3.5 w-3.5 text-blue-600 mt-0.5" />
                          <span>Poor field sanitation</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'treatment' && disease.treatment && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <p className="text-muted-foreground">{disease.treatment}</p>
                <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-100">
                  <div className="flex gap-2 items-start">
                    <div className="mt-0.5">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-800">Treatment approaches:</h3>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-3.5 w-3.5 text-green-600 mt-0.5" />
                          <span>Apply recommended fungicides or bactericides</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-3.5 w-3.5 text-green-600 mt-0.5" />
                          <span>Adjust water management to reduce humidity</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-3.5 w-3.5 text-green-600 mt-0.5" />
                          <span>Remove and destroy infected plants</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'prevention' && disease.prevention && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <p className="text-muted-foreground">{disease.prevention}</p>
                <div className="mt-4 bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <div className="flex gap-2 items-start">
                    <div className="mt-0.5">
                      <Leaf className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-purple-800">Prevention strategies:</h3>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-3.5 w-3.5 text-purple-600 mt-0.5" />
                          <span>Use resistant rice varieties</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-3.5 w-3.5 text-purple-600 mt-0.5" />
                          <span>Practice crop rotation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-3.5 w-3.5 text-purple-600 mt-0.5" />
                          <span>Maintain proper field sanitation</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="p-6 bg-gray-50 border-t">
            <Button onClick={onClose} className="w-full">Close</Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DiseaseDetail;
