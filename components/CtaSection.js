export default function CtaSection() {
  return (
    <section className="py-12 bg-[#c9102e] text-white">
      <div className="container mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-medium mb-4">Ready to Get Started?</h2>
        <p className="text-base max-w-xl mx-auto mb-6 opacity-90">
          Contact Tomi Law Office today for a consultation. Our experienced team is ready to help you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#contact"
            className="px-6 py-2 bg-white text-[#c9102e] text-sm font-medium transition-all duration-300 hover:bg-gray-100"
          >
            CONTACT US
          </a>
          <a
            href="tel:306-873-4521"
            className="px-6 py-2 bg-transparent border border-white text-white text-sm font-medium transition-all duration-300 hover:bg-white/10"
          >
            CALL: 306-873-4521
          </a>
        </div>
      </div>
    </section>
  )
}

