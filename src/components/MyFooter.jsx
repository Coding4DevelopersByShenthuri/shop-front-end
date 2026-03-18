import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';
import { FaBlog } from 'react-icons/fa6';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

function MyFooter() {
  return (
    <Footer className="bg-slate-900 rounded-none border-t border-white/5 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to='/' className='text-3xl font-black text-white flex items-center gap-2 tracking-tighter'>
                <FaBlog className='text-indigo-500' /> <span>Shenthu MART</span>
            </Link>
            <p className="text-slate-400 font-medium leading-relaxed max-w-xs">
                Your premier destination for world-class shopping. We deliver excellence in every product, choice, and interaction.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Curation</h3>
            <Footer.LinkGroup col className="text-slate-400 space-y-3 font-bold">
              <Footer.Link href="/shop" className="hover:text-white transition-colors">Premium Shop</Footer.Link>
              <Footer.Link href="/about" className="hover:text-white transition-colors">Our Story</Footer.Link>
              <Footer.Link href="/blog" className="hover:text-white transition-colors">Editorial Blog</Footer.Link>
              <Footer.Link href="/recipe" className="hover:text-white transition-colors">Culinary Lab</Footer.Link>
            </Footer.LinkGroup>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Assistance</h3>
            <Footer.LinkGroup col className="text-slate-400 space-y-3 font-bold">
              <Footer.Link href="/help" className="hover:text-white transition-colors">Help Center</Footer.Link>
              <Footer.Link href="/contact" className="hover:text-white transition-colors">Get In Touch</Footer.Link>
              <Footer.Link href="#" className="hover:text-white transition-colors">Privacy Ethics</Footer.Link>
              <Footer.Link href="#" className="hover:text-white transition-colors">Terms of Service</Footer.Link>
            </Footer.LinkGroup>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Flagship Presence</h3>
            <div className="text-slate-400 space-y-4 font-medium">
                <div className="flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                        <FontAwesomeIcon icon={faPhone} className="text-xs" />
                    </div>
                    <span>+94 743 899 907</span>
                </div>
                <div className="flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                        <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
                    </div>
                    <span className="break-all">support@shenthurimart.com</span>
                </div>
                <div className="flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-xs" />
                    </div>
                    <span>123 Elite Plaza, Colombo 07, SL</span>
                </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 text-sm font-bold">
             &copy; {new Date().getFullYear()} Shenthu MART. Crafted with Excellence.
          </p>
          
          <div className="flex items-center gap-6">
            <Footer.Icon href="https://www.facebook.com/" icon={BsFacebook} className="text-slate-500 hover:text-white transition-colors" />
            <Footer.Icon href="https://www.instagram.com/" icon={BsInstagram} className="text-slate-500 hover:text-white transition-colors" />
            <Footer.Icon href="https://x.com/" icon={BsTwitter} className="text-slate-500 hover:text-white transition-colors" />
            <Footer.Icon href="https://github.com/" icon={BsGithub} className="text-slate-500 hover:text-white transition-colors" />
          </div>
        </div>
        
        <div className="mt-12 text-center text-[10px] font-black uppercase tracking-[0.3em] text-white/10">
            Made BY Shenthuri Maran with Excellence
        </div>
      </div>
    </Footer>
  );
}

export default MyFooter;
