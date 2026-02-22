import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Globe, Users, ArrowRight, Gift, Target, Shield, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

export default function QadrFoundation() {
  const projects = [
    {
      title: "Clean Water Project",
      desc: "Providing safe drinking water to remote villages.",
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Education for All",
      desc: "Supporting underprivileged children's education.",
      icon: Target,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-900/20"
    },
    {
      title: "Emergency Relief",
      desc: "Immediate aid during natural disasters.",
      icon: Shield,
      color: "text-rose-500",
      bg: "bg-rose-50 dark:bg-rose-900/20"
    }
  ];

  return (
    <div className="space-y-12 pb-24">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-[3rem] bg-stone-900 text-white shadow-2xl">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        </div>

        <div className="relative z-10 p-10 md:p-20 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-emerald-300 text-sm font-medium"
          >
            <Heart className="w-4 h-4 fill-current" />
            <span>Serving Humanity</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold font-serif tracking-tight">
            Qadr Foundation
          </h1>
          <p className="text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Empowering communities through sustainable development, education, and humanitarian aid.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a 
              href="https://qadr.foundation/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg shadow-emerald-500/30 hover:-translate-y-1 flex items-center gap-2"
            >
              Visit Website <ExternalLink className="w-4 h-4" />
            </a>
            <button className="px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all backdrop-blur-md border border-white/10">
              Donate Now
            </button>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white dark:bg-stone-900 p-8 rounded-[2.5rem] shadow-sm border border-stone-100 dark:border-stone-800">
          <h2 className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-6">Our Mission</h2>
          <p className="text-stone-600 dark:text-stone-300 text-lg leading-relaxed">
            Qadr Foundation is dedicated to uplifting the lives of the marginalized. We believe in dignity, equity, and the power of community. Through our various programs, we strive to create lasting change and build a future where everyone has the opportunity to thrive.
          </p>
        </div>
        <div className="bg-emerald-600 text-white p-8 rounded-[2.5rem] shadow-lg flex flex-col justify-center items-center text-center space-y-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <Gift className="w-12 h-12 mb-2" />
          <h3 className="text-4xl font-bold">10K+</h3>
          <p className="text-emerald-100 font-medium">Lives Impacted</p>
        </div>
      </div>

      {/* Projects Grid */}
      <div>
        <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-8 flex items-center gap-3">
          <Globe className="w-6 h-6 text-emerald-500" />
          Our Key Initiatives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-stone-900 p-6 rounded-3xl shadow-sm border border-stone-100 dark:border-stone-800 hover:shadow-md transition-all group"
            >
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", project.bg, project.color)}>
                <project.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-2">{project.title}</h3>
              <p className="text-stone-500 dark:text-stone-400 leading-relaxed mb-4">
                {project.desc}
              </p>
              <button className="text-emerald-600 dark:text-emerald-400 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn More <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
