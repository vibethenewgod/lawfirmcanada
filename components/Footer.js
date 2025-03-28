import { Phone, Mail, Facebook, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#0f1729] text-white">
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-base font-medium mb-4">Tomi Law Office</h3>
            <p className="text-gray-400 text-xs mb-2">Barristers and Solicitors</p>
            <p className="text-gray-400 text-xs">Providing efficient and affordable legal services since 2018.</p>
          </div>

          <div>
            <h3 className="text-base font-medium mb-4">Practice Areas</h3>
            <ul className="space-y-2">
              {[
                "Corporate & Commercial Law",
                "Real Estate Law",
                "Estate Planning",
                "Family Law",
                "Labour Law",
                "Municipal Law",
              ].map((area) => (
                <li key={area}>
                  <a href="#" className="text-gray-400 text-xs hover:text-white transition-colors duration-300">
                    {area}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-medium mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400 text-xs">
                <Phone size={12} className="mr-2 flex-shrink-0" />
                <span>Tisdale: 306-873-4521</span>
              </li>
              <li className="flex items-center text-gray-400 text-xs">
                <Phone size={12} className="mr-2 flex-shrink-0" />
                <span>Nipawin: 306-862-4511</span>
              </li>
              <li className="flex items-center text-gray-400 text-xs">
                <Mail size={12} className="mr-2 flex-shrink-0" />
                <span>info@tomilaw.ca</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-medium mb-4">Follow Us</h3>
            <div className="flex gap-3 mb-4">
              {[
                { icon: <Facebook size={14} />, label: "Facebook" },
                { icon: <Linkedin size={14} />, label: "LinkedIn" },
                { icon: <Twitter size={14} />, label: "Twitter" },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 hover:bg-white/20"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-xs">Member - Canadian Bar Association</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs">&copy; 2025 Tomi Law Office. All rights reserved.</p>
          <div className="flex gap-6 mt-2 md:mt-0">
            {["Privacy Policy", "Terms of Service", "Sitemap"].map((item) => (
              <a key={item} href="#" className="text-gray-500 text-xs hover:text-white transition-colors duration-300">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

