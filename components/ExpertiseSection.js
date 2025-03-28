import { BookOpen, Home, FileText, ChevronRight } from "lucide-react"

export default function ExpertiseSection() {
  const services = [
    {
      icon: <BookOpen size={20} />,
      title: "Corporate & Commercial Law",
      description:
        "Full range of services for businesses including incorporation, restructuring, commercial transactions, and shareholder agreements.",
    },
    {
      icon: <Home size={20} />,
      title: "Real Estate Law",
      description:
        "Assistance with residential and commercial purchases, sales, mortgages, leases, and property subdivisions.",
    },
    {
      icon: <FileText size={20} />,
      title: "Estate Planning & Administration",
      description:
        "Preparation of wills, powers of attorney, health care directives, and assistance with probate and estate administration.",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-2xl font-medium text-[#012b51] mb-4 uppercase">Our Expertise</h2>
          <div className="w-16 h-0.5 bg-[#012b51]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-[#012b51] mb-4">{service.icon}</div>
              <h3 className="text-base font-medium text-[#012b51] mb-3">{service.title}</h3>
              <p className="text-gray-600 text-xs mb-4 line-clamp-3">{service.description}</p>
              <a href="#" className="text-[#012b51] text-xs font-medium flex items-center hover:underline">
                Learn more
                <ChevronRight size={12} className="ml-1" />
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#"
            className="inline-block text-xs font-medium text-[#012b51] border-b border-[#012b51] pb-1 hover:border-transparent transition-all duration-300"
          >
            VIEW ALL PRACTICE AREAS
          </a>
        </div>
      </div>
    </section>
  )
}

