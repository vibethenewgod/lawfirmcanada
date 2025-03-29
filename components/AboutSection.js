// import Image from "next/image"

// export default function AboutSection() {
//   return (
//     <section className="py-16 bg-[#012b51] text-white">
//       <div className="container mx-auto px-6 lg:px-8">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           <div className="lg:w-1/2 order-2 lg:order-1">
//             <h2 className="text-2xl font-medium mb-4">About Tomi Law Office</h2>
//             <div className="w-16 h-0.5 bg-white mb-6"></div>
//             <p className="text-white/90 mb-6 leading-relaxed">
//               Tomi Law Office is a general law firm offering a broad range of legal services to our clients. Established
//               in Tisdale in February 2018 and expanded to Nipawin in March 2018, we've been serving Saskatchewan
//               communities with distinction.
//             </p>
//             <p className="text-white/90 mb-6 leading-relaxed">
//               At Tomi Law Office, our goal is to provide efficient and affordable legal services. We take pride in our
//               ability to achieve the best possible result for our clients.
//             </p>
//             <a
//               href="#"
//               className="inline-block text-sm font-medium text-white border-b border-white pb-1 hover:border-transparent transition-all duration-300"
//             >
//               CONTACT US
//             </a>
//           </div>
//           <div className="lg:w-1/2 order-1 lg:order-2">
//             <div className="relative h-[350px] overflow-hidden">
//               <Image src="/about.jpg" alt="Tomi Law Office team meeting" fill className="object-cover" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }



import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="py-16 bg-[#012b51] text-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <h2 className="text-2xl font-medium mb-4">About Tomi Law Office</h2>
            <div className="w-16 h-0.5 bg-white mb-6"></div>
            <p className="text-white/90 mb-6 leading-relaxed">
              Tomi Law Office is a general law firm offering a broad range of legal services to our clients. Established
              in Tisdale in February 2018 and expanded to Nipawin in March 2018, we've been serving Saskatchewan
              communities with distinction.
            </p>
            <p className="text-white/90 mb-6 leading-relaxed">
              At Tomi Law Office, our goal is to provide efficient and affordable legal services. We take pride in our
              ability to achieve the best possible result for our clients.
            </p>
            <a
              href="#"
              className="inline-block text-sm font-medium text-white border-b border-white pb-1 hover:border-transparent transition-all duration-300"
            >
              CONTACT US
            </a>
          </div>
          <div className="lg:w-1/2 order-1 lg:order-2">
            <div className="relative w-full h-[350px] sm:h-[200px] md:h-[250px] lg:h-[350px] overflow-hidden flex items-center">
              <Image 
                src="/about.jpg" 
                alt="Tomi Law Office team meeting" 
                width={600} 
                height={400} 
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}





