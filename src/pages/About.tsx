
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { Award, Book, Heart, Leaf, Users } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-12 md:py-24"
      >
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full mb-4">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-500">
              About Rice Vision
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're on a mission to help farmers identify and treat rice diseases effectively, improving crop yields and food security worldwide.
            </p>
          </motion.div>

          {/* Story Section */}
          <motion.div 
            className="mb-20 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-green-50 rounded-full opacity-70" />
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-12 h-12 bg-green-50 rounded-full opacity-70" />
            
            <div className="relative z-10 bg-gradient-to-br from-green-50 to-green-100/90 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-green-200">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Book className="h-5 w-5 text-green-600" />
                Our Story
              </h2>
              <p className="mb-4 text-muted-foreground">
                Rice Vision was founded in 2025 by a team of agricultural experts and technology enthusiasts who recognized the need for accessible disease detection in rice farming. Rice is a staple food for more than half of the world's population, making its healthy production essential for global food security.
              </p>
              <p className="mb-4 text-muted-foreground">
                After witnessing the devastating impact of undetected diseases on rice crops, our founders developed an AI-powered solution that could identify diseases early and provide treatment recommendations, all from a simple photograph.
              </p>
              <p className="text-muted-foreground">
                Today, Rice Vision helps thousands of farmers across Asia and Africa protect their crops and livelihoods through early disease detection and intervention.
              </p>
            </div>
          </motion.div>

          {/* Mission & Values */}
          <motion.div 
            className="grid md:grid-cols-2 gap-8 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-gradient-to-br from-green-100 to-green-200/80 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-green-400 to-green-600 rounded-full text-white">
                  <Award className="h-5 w-5" /> 
                </div>
                <h2 className="text-2xl font-semibold">Our Mission</h2>
              </div>
              <p className="text-muted-foreground">
                To empower farmers with accessible technology that helps them identify and manage rice diseases quickly and effectively, increasing crop yields and promoting sustainable farming practices.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-100 to-green-200/80 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-green-400 to-green-600 rounded-full text-white">
                  <Heart className="h-5 w-5" /> 
                </div>
                <h2 className="text-2xl font-semibold">Our Values</h2>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2"></span>
                  <span><strong>Accessibility:</strong> Making technology available to all farmers regardless of resources</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2"></span>
                  <span><strong>Accuracy:</strong> Providing reliable disease detection and recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2"></span>
                  <span><strong>Sustainability:</strong> Promoting farming practices that protect the environment</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Meet the experts behind Rice Vision's innovative technology
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Dr. Seetha",
                  role: "Agricultural Scientist",
                  bio: "Expert in rice pathology with 15 years of research experience",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                },
                {
                  name: "Mr. Cimple Chandu",
                  role: "AI Engineer",
                  bio: "Specializes in computer vision and machine learning for agricultural applications",
                  image:" https://media.istockphoto.com/id/1369746033/photo/portrait-of-a-handsome-young-businessman-working-in-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=JepBOGOGiPwRF2z0pwiADeUZhsk6eFt4eKliWjzDGHo="
                },
                {
                  name: "Mr. Naveen Kumar",
                  role: "Farming Consultant",
                  bio: "Works directly with farmers to implement sustainable disease management practices",
                  image:"https://media.istockphoto.com/id/954358232/photo/engineer-with-laptop-and-combine-harvester-in-field.jpg?s=612x612&w=0&k=20&c=Dikm22MJUMi5wtyAMu2l82L2uZs9kTSS_L6VgK82xps="
                }
              ].map((member, index) => (
                <motion.div 
                  key={index}
                  className="bg-gradient-to-br from-green-50 to-green-100/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm border border-green-200 group"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + (index * 0.1) }}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-green-600 text-sm mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default About;
