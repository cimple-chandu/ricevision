
import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedTransition from './AnimatedTransition';
import { ChevronRight, PlusCircle, Eye } from 'lucide-react';
import DiseaseDetail from './DiseaseDetail';
import { Button } from './ui/button';

const diseases = [
  {
    id: 1,
    name: 'Leaf Blast',
    description: 'Leaf Blast continues to be a significant threat, with recent reports indicating rapid spread due to fluctuating weather patterns. Lesions appear quickly under current high humidity.',
    symptoms: 'Current field reports show rapid development of diamond-shaped lesions, especially in early morning dew. Severe cases are leading to rapid leaf desiccation and node breakage.',
    causes: 'Magnaporthe oryzae is thriving with the increased humidity and recent temperature spikes. Monitor fields closely as these conditions favor rapid infection.',
    treatment: 'Immediate application of trifloxystrobin or azoxystrobin is crucial. Early detection and treatment are showing better results. Consult local agricultural extensions for real-time recommendations.',
    prevention: 'Resistant varieties are showing better tolerance, but vigilance is key. Reduce nitrogen application in affected areas. Field sanitation is critical to limit spread.',
    imageUrl: "blast.jpg"
  },
  {
    id: 2,
    name: 'Bacterial Leaf Blight',
    description: 'Bacterial Leaf Blight is spreading in regions with recent heavy rainfall. Water-soaked lesions are appearing rapidly, impacting yield significantly.',
    symptoms: 'Water-soaked lesions are turning yellow-white quickly, particularly along leaf edges. Bacterial ooze is being observed in severe cases, indicating advanced infection.',
    causes: 'Xanthomonas oryzae pv. oryzae is proliferating due to persistent high temperatures and waterlogged fields. Immediate action is needed to prevent further spread.',
    treatment: 'Copper-based bactericides are showing limited effectiveness. Draining affected fields is crucial to reduce humidity and slow bacterial growth. Consult local experts for up-to-date treatment strategies.',
    prevention: 'Resistant varieties are showing better resilience. Ensure irrigation water is clean and avoid over-fertilization. Monitor fields closely after rainfall.',
    imageUrl: "blb.jpg"
  },
  {
    id: 3,
    name: 'Brown Spot',
    description: 'Brown Spot is becoming more prevalent in areas with observed nutrient deficiencies. Oval-shaped lesions are impacting grain quality and yield.',
    symptoms: 'Dark brown spots with yellow halos are developing rapidly on leaves. Older spots are showing gray centers. Grain discoloration and incomplete filling are being reported.',
    causes: 'Cochliobolus miyabeanus is exacerbating issues in potassium-deficient soils. Soil testing is recommended to address underlying nutrient imbalances.',
    treatment: 'Fungicides like iprodione and propiconazole are showing moderate effectiveness. Address soil nutrient deficiencies immediately. Soil amendments may be required.',
    prevention: 'Balanced soil fertility is crucial. Seed treatments with fungicides before planting are recommended. Rotate crops to reduce soil-borne pathogen load.',
    imageUrl: "spot.jpg"
  },
  {
    id: 4,
    name: 'Sheath Blight',
    description: 'Sheath Blight is spreading rapidly in densely planted fields. Lesions are progressing quickly up the plant, causing significant yield loss.',
    symptoms: 'Irregular lesions with gray-white centers and brown borders are merging, creating a ladder-like appearance. Plant vigor is being severely affected.',
    causes: 'Rhizoctonia solani is thriving in the current high-temperature, high-humidity conditions. Close plant spacing is exacerbating the problem.',
    treatment: 'Azoxystrobin and hexaconazole applications are showing some efficacy. Reducing nitrogen fertilizer is recommended. Monitor closely for lesion progression.',
    prevention: 'Increase plant spacing to improve ventilation. Avoid excessive nitrogen application. Ensure proper field drainage. Consider rotating crops to break the disease cycle.',
    imageUrl: "RiceSh.jpg"
  },
  {
    id: 5,
    name: 'Leaf Scald',
    description: 'Leaf Scald is causing significant leaf drying, particularly in older leaves. Zonate lesions are spreading quickly, impacting yield.',
    symptoms: 'Zonate lesions with alternating light and dark brown bands are prominent. Leaf tips are showing a scalded appearance. Older leaves are the most affected.',
    causes: 'Microdochium oryzae is proliferating due to high humidity and moderate temperatures. Proper water management is crucial to control spread.',
    treatment: 'Propiconazole and difenoconazole are showing effectiveness. Maintain proper water management. Remove infected leaves to reduce inoculum.',
    prevention: 'Use resistant varieties. Practice crop rotation. Maintain balanced fertilization. Remove weed hosts from the field to limit pathogen reservoirs.',
    imageUrl: "scald.jpg"
  },
  {
    id: 6,
    name: 'Tungro',
    description: 'Tungro is causing severe stunting and discoloration in many regions. Leafhopper populations are high, exacerbating disease spread.',
    symptoms: 'Yellow to orange discoloration and severe stunting are evident. Reduced tillering and panicle formation are leading to significant yield losses.',
    causes: 'Green leafhoppers (Nephotettix virescens) are effectively transmitting the Rice tungro virus complex. Vector control is crucial.',
    treatment: 'Focus on controlling leafhopper vectors with appropriate insecticides. No direct chemical control for the virus exists. Implement integrated pest management strategies.',
    prevention: 'Use resistant varieties. Adjust planting time to avoid peak leafhopper populations. Remove infected plants and control weed hosts. Monitor leafhopper populations closely.',
    imageUrl:"tun.jpg"
  },
  {
    id: 7,
    name: 'Rice Hispa',
    description: 'Rice Hispa damage is being reported in areas with poor drainage. Dark lesions are causing lodging and plant death.',
    symptoms: 'Dark lesions on lower stems with white fungal growth inside. Plants are lodging, and lower stems are becoming brittle and blackened.',
    causes: 'Sclerotium oryzae is thriving in continuously cropped fields with poor drainage and high organic matter. Improve drainage to reduce disease pressure.',
    treatment: 'Drain the field to reduce humidity. Hexaconazole or propiconazole can help if applied early. Address underlying drainage issues.',
    prevention: 'Practice crop rotation. Avoid excessive flooding. Maintain good drainage. Incorporate rice straw early to enhance decomposition.',
    imageUrl: "ricehi.jpg"
  },
  {
    id: 8,
    name: 'Neck Blast',
    description: 'Neck Blast is rapidly affecting panicles, transforming grains into spore balls. High humidity is favoring disease development.',
    symptoms: 'Individual grains are transforming into greenish-black spore balls. Powdery spores are being released as the disease progresses.',
    causes: 'Ustilaginoidea virens is proliferating due to high humidity and excessive nitrogen. Reduce nitrogen application and monitor closely.',
    treatment: 'Propiconazole or copper oxychloride applications are recommended during early panicle formation. Adjust nitrogen fertilization based on soil testing.',
    prevention: 'Use resistant varieties. Apply balanced fertilization. Avoid dense planting. Practice crop rotation. Monitor humidity levels and adjust irrigation accordingly.',
    imageUrl: "neckblast.jpg"
  },
  {
    id: 9,
    name: 'Narrow Brown Spot',
    description: 'Narrow Brown Spot is causing abnormal seedling elongation and death. Seed-borne infection is a significant concern.',
    symptoms: 'Abnormally tall, thin, and pale green plants with reduced root development. Empty panicles and premature plant death are being reported.',
    causes: 'Fusarium fujikuroi is causing abnormal elongation through gibberellin production. Seed-borne infection is a primary source. Seed treatments are crucial.',
    treatment: 'Seed treatment with thiophanate-methyl or carbendazim is effective. Remove and destroy infected plants to prevent spread. Implement strict sanitation measures.',
    prevention: 'Use clean, certified seeds. Treat seeds with hot water followed by fungicide. Avoid continuous cropping. Implement crop rotation and maintain field hygiene.',
    imageUrl: "nnn.jpg"
  },
];

const DiseaseInfo: FC = () => {
  const [selectedDisease, setSelectedDisease] = useState<(typeof diseases)[0] | null>(null);

  return (
    <>
      <section id="disease-info" className="py-16 px-4 relative bg-gradient-to-rfrom-green-800/20 to-green-800/10">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjUiIHZpZXdCb3g9IjAgMCAxNDQwIDc2NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPG1hc2sgaWQ9Im1hc2swXzI1Ml8xNDMiIHN0eWxlPSJtYXNrLXR5cGU6YWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjAiIHk9IjAiIHdpZHRoPSIxNDQwIiBoZWlnaHQ9Ijc2NSI+CjxyZWN0IHdpZHRoPSIxNDQwIiBoZWlnaHQ9Ijc2NSIgZmlsbD0iI0M0QzRDNCIvPgo8L21hc2s+CjxnIG1hc2s9InVybCgjbWFzazBfMjUyXzE0MykiPgo8cGF0aCBkPSJNMTA5Mi45IC0xNzYuNjg2QzExMDQuMzcgLTIwOS40NjggMTE0Ni41IC0yNTAuMzU0IDEyMDMuOCAtMjI2LjM0M0MxMjc0LjUzIC0xOTYuODMgMTI0NS4zOSAtMTAyLjc3MiAxMjg1LjcyIC00NS42ODYxQzEzMDcuOTggLTEzLjgyNDcgMTM2My45OSAtMC42NzMxNCAxMzY0LjY3IDM3LjU1NjZDMTM2NS41NSA4OC4zMDIzIDEzMjYuODQgMTM1LjgyNyAxMjg5LjI1IDE1Mi40OThDMTI2Ni4zNyAxNjIuMjQ3IDEyMzguMjIgMTc5LjA4OCAxMjEyLjIyIDE4My42MTdDMTE2OS41NSAxOTEuMDk0IDExMzQuMzMgMTY2LjM2NyAxMDkyLjkgMTgyLjQxN0MxMDUxLjQ4IDE5OC40NjYgMTAyMi42NCAyMzkuMzUzIDk3OS4wNTQgMjM1LjgyNUM5MzUuNDY2IDIzMi4yOTcgOTE0LjE0IDE4Ny41OTggODgzLjMyNiAxNjIuNzQ5Qzg2Mi41MTcgMTQ1Ljg5OSA4MzYuOTk4IDE0My4yNzMgODA5LjYwOCAxNDguOUw4MDUuOTg1IDE0OS44ODlMODA2LjA4IDE0OS40MDdDODA3LjA4IDE0NS42OTUgODA4LjM2OSAxNDAuNDg2IDgwOS45MzggMTM0LjI1Qzg1Ni4wMDcgMjAuODUzIDk5Ni4yIC0yMS44NDIzIDEwODIuNyAtMTMzLjQ4MUMxMDgzLjY3IC0xMzQuNzI3IDEwODQuNjEgLTEzNS45NjEgMTA4NS41MiAtMTM3LjE4M0MxMDkwLjgxIC0xNDQuMTU2IDEwOTQuODUgLTE1MC4zMzggMTA5Ny43NiAtMTU1LjcyN0MxMDA0Ljc1IC02Mi43MjY3IDEwNTQuNyAtNzIuNjI2MiAxMDgzLjcxIC0xMzAuNzNDMTA4NS45OCAtMTM1LjEyMSAxMDg4Ljc1IC0xNDAuNTMxIDEwOTEuNzIgLTE0Ni4yNjNDMTA5Mi4xNiAtMTQ3LjEzMiAxMDkyLjU5IC0xNDcuOTk5IDEwOTMuMDMgLTE0OC44NjVDMTA5Ni42OSAtMTU2LjI5NyAxMTAwLjI4IC0xNjMuNCAxMTA0LjA5IC0xNjkuMzk2QzExMDUuNzIgLTE3Mi4xMDUgMTA3Ni45MSAtMTQzLjE3MSAxMDkyLjkgLTE3Ni42ODZaIiBmaWxsPSIjNENBRjUwIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHBhdGggZD0iTS0yNjkuODAzIDYzMS4zMTRDLTI1OC4zMjYgNTk4LjUzMiAtMjE2LjE5OCA1NTcuNjQ2IC0xNTguODk2IDU4MS42NTdDLTg4LjE3MSA2MTEuMTcgLTExNy4zMTMgNzA1LjIyOCAtNzYuOTgzMSA3NjIuMzE0Qy01NC43Mjc3IDc5NC4xNzUgMS4yODgwOSA4MDcuMzI3IDEuOTY5NTggODQ1LjU1N0MyLjg1MTU2IDg5Ni4zMDIgLTM1Ljg2MDggOTQzLjgyNyAtNzMuNDQ1MyA5NjAuNDk4Qy05Ni4zMzQyIDk3MC4yNDcgLTEyNC40ODQgOTg3LjA4OCAtMTUwLjQ4NCA5OTEuNjE3Qy0xOTMuMTUzIDk5OS4wOTQgLTIyOC4zNzQgOTc0LjM2NyAtMjY5LjgwMyA5OTAuNDE3Qy0zMTEuMjMxIDEwMDYuNDcgLTM0MC4wNjMgMTA0Ny4zNSAtMzgzLjY1MiAxMDQzLjgyQy00MjcuMjQgMTA0MC4zIC00NDguNTY1IDk5NS41OTggLTQ3OS4zNzkgOTcwLjc0OUMtNTAuLjE4OSA5NTMuODk5IC01MjUuNzA4IDk1MS4yNzMgLTU1My4wOTcgOTU2LjlMLTU1Ni43MiA5NTcuODg5TC01NTYuNjE4IDk1Ny40MDdDLTU1NS42MjUgOTUzLjY5NSAtNTU0LjMzNiA5NDguNDg2IC01NTIuNzY3IDk0Mi4yNUMtNTA2LjY5OCA4MjguODUzIC0zNjYuNTA1IDc4Ni4xNTggLTI3OS45OTggNjc0LjUxOUMtMjc5LjAzIDY3My4yNzMgLTI3OC4wOTMgNjcyLjAzOSAtMjc3LjE4IDY3MC44MTdDLTI3MS44OTQgNjYzLjg0NCAtMjY3Ljg1NCA2NTcuNjYyIC0yNjQuOTM5IDY1Mi4yNzNDLTM1Ny45NTIgNzQ1LjI3MyAtMzA4LjAwMyA3MzUuMzc0IC0yNzguOTk1IDY3Ny4yN0MtMjc2LjcyMyA2NzIuODc5IC0yNzMuOTU0IDY2Ny40NjkgLTI3MC45ODIgNjYxLjczN0MtMjcwLjUzOSA2NjAuODY4IC0yNzAuMTA4IDY2MC4wMDEgLTI2OS42NzMgNjU5LjEzNUMtMjY2LjAwOSA2NTEuNzAzIC0yNjIuNDIzIDY0NC42IC0yNTguNjA3IDYzOC42MDRDLTI1Ni45NzIgNjM1Ljg5NSAtMjg1Ljc5MiA2NjQuODI5IC0yNjkuODAzIDYzMS4zMTRaIiBmaWxsPSIjNENBRjUwIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9nPgo8L3N2Zz4K')] opacity-30 pointer-events-none" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <AnimatedTransition>
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-3"
              >
                <div className="h-1 w-10 bg-green-500 mx-auto mb-3"></div>
                <h2 className="text-2xl md:text-3xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-500">Common Rice Diseases</h2>
              </motion.div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Learn about the most prevalent rice diseases that affect crops worldwide
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {diseases.map((disease, index) => (
                <motion.div
                  key={disease.id}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-subtle border border-green-100 hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={disease.imageUrl} 
                      alt={disease.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70" />
                    <div className="absolute bottom-3 right-3">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/80 hover:bg-white text-green-800 text-xs font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(disease.imageUrl, '_blank');
                        }}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-5 relative">
                    <div className="absolute top-0 right-0 w-16 h-16 -mt-8 -mr-8 bg-green-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-green-700 transition-colors duration-300">{disease.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{disease.description}</p>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-green-700 flex items-center mb-1">
                        <span className="h-0.5 w-3 bg-green-500 mr-2"></span>
                        Symptoms
                      </h4>
                      <p className="text-sm line-clamp-2">{disease.symptoms}</p>
                    </div>
                    
                    <Button
                      onClick={() => setSelectedDisease(disease)}
                      className="mt-4 w-full bg-green-50 hover:bg-green-100 text-green-800 border border-green-200"
                      variant="outline"
                      size="sm"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedTransition>
        </div>
      </section>

      <DiseaseDetail 
        disease={selectedDisease}
        onClose={() => setSelectedDisease(null)}
      />
    </>
  );
};

export default DiseaseInfo;
