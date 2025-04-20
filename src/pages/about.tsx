import Head from 'next/head';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { FaCode, FaShieldAlt, FaBrain } from 'react-icons/fa';

export default function About() {
  return (
    <>
      <Head>
        <title>About | Portfolio Projects Timeline</title>
        <meta name="description" content="Informasi tentang portfolio 30 proyek untuk fullstack, backend, dan cybersecurity" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <main className="min-h-screen pt-16">
        <div className="container mx-auto px-4 py-20">
          <div className="mb-12 text-center">
            <motion.h1 
              className="text-4xl font-bold mb-4 text-gradient"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Tentang Proyek Portfolio
            </motion.h1>
            <motion.p 
              className="text-text-secondary max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Rencana pengembangan 30 proyek portfolio selama 60 minggu untuk meningkatkan skill sebagai fullstack developer, backend programmer, dan cybersecurity specialist.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4">Tujuan Portfolio</h2>
              <p className="text-text-secondary mb-4">
                Portfolio ini dirancang untuk menunjukkan kemampuan di tiga bidang utama yang saling melengkapi dan sangat dicari di industri teknologi saat ini:
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-1">
                    <FaCode className="text-blue-400 text-sm" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Fullstack Development</h3>
                    <p className="text-text-secondary text-sm">Membangun aplikasi web end-to-end dengan berbagai frontend framework modern dan backend yang scalable.</p>
                  </div>
                </li>
                
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center mt-1">
                    <FaBrain className="text-yellow-400 text-sm" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Artificial Intelligence</h3>
                    <p className="text-text-secondary text-sm">Mengintegrasikan teknologi AI seperti machine learning, NLP, dan computer vision ke dalam aplikasi praktis.</p>
                  </div>
                </li>
                
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mt-1">
                    <FaShieldAlt className="text-red-400 text-sm" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Cybersecurity</h3>
                    <p className="text-text-secondary text-sm">Mengembangkan tools dan aplikasi untuk keamanan jaringan, analisis malware, dan praktik secure coding.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              className="relative bg-background-light rounded-xl p-6 shadow-neon"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-4">Perencanaan Timeline</h2>
              
              <div className="space-y-4">
                <div className="border-l-2 border-primary pl-4 py-2">
                  <h3 className="font-semibold">Bulan 1-2: Memulai dengan Fundamentals</h3>
                  <p className="text-text-secondary text-sm">
                    Project awal dengan kompleksitas menengah dari berbagai kategori untuk membangun fondasi yang kuat.
                  </p>
                </div>
                
                <div className="border-l-2 border-primary pl-4 py-2">
                  <h3 className="font-semibold">Bulan 3-4: Meningkatkan Kompleksitas</h3>
                  <p className="text-text-secondary text-sm">
                    Fokus pada proyek yang lebih kompleks untuk menantang dan memperdalam pengetahuan.
                  </p>
                </div>
                
                <div className="border-l-2 border-primary pl-4 py-2">
                  <h3 className="font-semibold">Bulan 5-6: Proyek Interdisipliner</h3>
                  <p className="text-text-secondary text-sm">
                    Mengerjakan proyek yang menggabungkan multiple domain untuk menunjukkan kemampuan integrasi.
                  </p>
                </div>
                
                <div className="border-l-2 border-primary pl-4 py-2">
                  <h3 className="font-semibold">Bulan 7-8: Proyek Lebih Kompleks</h3>
                  <p className="text-text-secondary text-sm">
                    Mengerjakan proyek dengan arsitektur yang lebih sophisticated dan skala yang lebih besar.
                  </p>
                </div>
                
                <div className="border-l-2 border-primary pl-4 py-2">
                  <h3 className="font-semibold">Bulan 9-10: Proyek Middleware dan Integrasi</h3>
                  <p className="text-text-secondary text-sm">
                    Fokus pada aspek integrasi sistem dan middleware yang robust.
                  </p>
                </div>
                
                <div className="border-l-2 border-primary pl-4 py-2">
                  <h3 className="font-semibold">Bulan 11-15: Proyek Advanced</h3>
                  <p className="text-text-secondary text-sm">
                    Menyelesaikan proyek-proyek tingkat lanjut yang mendemonstrasikan keahlian profesional.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            className="bg-background-light rounded-xl p-6 shadow-neon max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Tips Pengerjaan</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-background-lighter p-4 rounded-lg">
                <p className="font-semibold mb-2 text-primary">Mulai dengan MVP</p>
                <p className="text-text-secondary text-sm">
                  Untuk setiap project, mulai dengan MVP (Minimum Viable Product) sebelum menambahkan fitur lanjutan.
                </p>
              </div>
              
              <div className="bg-background-lighter p-4 rounded-lg">
                <p className="font-semibold mb-2 text-primary">Gunakan Git</p>
                <p className="text-text-secondary text-sm">
                  Manfaatkan Git untuk version control dan GitHub untuk showcase portfolio.
                </p>
              </div>
              
              <div className="bg-background-lighter p-4 rounded-lg">
                <p className="font-semibold mb-2 text-primary">Dokumentasikan Process</p>
                <p className="text-text-secondary text-sm">
                  Catat dan dokumentasikan process pengembangan untuk setiap project.
                </p>
              </div>
              
              <div className="bg-background-lighter p-4 rounded-lg">
                <p className="font-semibold mb-2 text-primary">Deploy Project</p>
                <p className="text-text-secondary text-sm">
                  Deploy semua project menggunakan Vercel, Netlify, Heroku, atau cloud provider lainnya.
                </p>
              </div>
              
              <div className="bg-background-lighter p-4 rounded-lg">
                <p className="font-semibold mb-2 text-primary">Bergabung dengan Komunitas</p>
                <p className="text-text-secondary text-sm">
                  Bergabunglah dengan komunitas relevan untuk mendapatkan feedback yang berharga.
                </p>
              </div>
              
              <div className="bg-background-lighter p-4 rounded-lg">
                <p className="font-semibold mb-2 text-primary">Buat Case Study</p>
                <p className="text-text-secondary text-sm">
                  Buat case study untuk setiap project yang menjelaskan tantangan dan solusi yang diimplementasikan.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <footer className="bg-background py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-text-secondary text-sm">
            &copy; {new Date().getFullYear()} <span className="text-primary font-medium">bagaspra16-rundown</span>. All rights reserved.
          </p>
          <div className="flex justify-center mt-4 space-x-2">                        
              <p>Created by</p>
              <a href="https://bagaspra16-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary transition-colors flex items-center gap-1.5">
              <span className="text-primary font-medium">bagaspra16</span>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
} 