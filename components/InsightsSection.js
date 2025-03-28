import { ChevronRight } from "lucide-react"
import Image from "next/image"

export default function InsightsSection() {
  const articles = [
    {
      image: "/estate-planning.jpg", // You'll need to add your images
      category: "Estate Planning",
      title: "Why Everyone Needs a Will: Protecting Your Legacy",
      excerpt: "Learn about the importance of having a will and how it can protect your assets and loved ones.",
      date: "March 15, 2025",
    },
    {
      image: "/real-estate.jpg",
      category: "Real Estate",
      title: "5 Things to Know Before Buying Your First Home",
      excerpt: "Important legal considerations for first-time homebuyers in Saskatchewan.",
      date: "March 10, 2025",
    },
    {
      image: "/family-law.jpg",
      category: "Family Law",
      title: "Understanding Child Custody Laws in Saskatchewan",
      excerpt: "A guide to navigating child custody arrangements and legal considerations for parents.",
      date: "February 28, 2025",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-2xl font-medium text-[#012b51] mb-4 uppercase">Legal Insights</h2>
          <div className="w-16 h-0.5 bg-[#012b51]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div key={index} className="group">
              <div className="overflow-hidden h-48 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 z-10"></div>
                {/* Using next/image for better image loading */}
                <div className="relative w-full h-full">
                  <Image
                    src={article.image || "/placeholder.svg?height=500&width=800"}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="pt-4">
                <div className="text-xs font-medium uppercase tracking-wider text-[#012b51] mb-2">
                  {article.category}
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-2 group-hover:text-[#012b51] transition-colors duration-300 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-xs mb-3 line-clamp-2">{article.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{article.date}</span>
                  <a href="#" className="text-[#012b51] text-xs font-medium flex items-center group-hover:underline">
                    Read More
                    <ChevronRight size={12} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-right">
          <a
            href="#"
            className="inline-block text-xs font-medium text-[#012b51] border-b border-[#012b51] pb-1 hover:border-transparent transition-all duration-300"
          >
            VIEW ALL INSIGHTS
          </a>
        </div>
      </div>
    </section>
  )
}

