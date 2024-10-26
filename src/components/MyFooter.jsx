import { Footer } from 'flowbite-react';
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';

function MyFooter() {
  return (
    <Footer bgDark>
      <div className="w-11/12 mx-auto"> {/* Reduce width and center */}
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
          <div>
            <Footer.Title title="Company" />
            <Footer.LinkGroup col>
              <Footer.Link href="#" style={{ color: "#D3D3D3" }}>About</Footer.Link>
              <Footer.Link href="#" style={{ color: "#D3D3D3" }}>Careers</Footer.Link>
              <Footer.Link href="#" style={{ color: "#D3D3D3" }}>Brand Center</Footer.Link>
              <Footer.Link href="#" style={{ color: "#D3D3D3" }}>Blog</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="Help Center" />
            <Footer.LinkGroup col>
              <Footer.Link href="#" style={{ color: "#D3D3D3" }}>Discord Server</Footer.Link>
              <Footer.Link href="#" style={{ color: "#D3D3D3" }}>Twitter</Footer.Link>
              <Footer.Link href="#" style={{ color: "#D3D3D3" }}>Facebook</Footer.Link>
              <Footer.Link href="#" style={{ color: "#D3D3D3" }}>Contact Us</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="Legal" />
            <Footer.LinkGroup col>
              <Footer.Link href="#" style={{ color: "#D3D3D3" }}>Privacy Policy</Footer.Link>
              <Footer.Link href="#" style={{ color: "#D3D3D3" }}>Licensing</Footer.Link>
              <Footer.Link href="#" style={{ color: "#D3D3D3" }}>Terms &amp; Conditions</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="Download" />
            <Footer.LinkGroup col>
              <Footer.Link href="#" style={{ color: "#D3D3D3" }}>iOS</Footer.Link>
              <Footer.Link href="#" style={{ color: "#D3D3D3" }}>Android</Footer.Link>
              <Footer.Link href="#" style={{ color: "#D3D3D3" }}>Windows</Footer.Link>
              <Footer.Link href="#" style={{ color: "#D3D3D3" }}>MacOS</Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
        <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
        <Footer.Copyright href="#" by={<span style={{ color: "#D3D3D3" }}>Shenthu MART. All Rights Reserved</span>} year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="https://www.facebook.com/profile.php?id=100085593338393&mibextid=ZbWKwL" icon={BsFacebook} />
            <Footer.Icon href="https://www.instagram.com/shenthuri_maran?igsh=aTJmdXlpbHV0cWN5" icon={BsInstagram} />
            <Footer.Icon href="https://x.com/ShenthuriM47295?t=bAh1Ip8sFiopySnrN7Ge_w&s=09" icon={BsTwitter} />
            <Footer.Icon href="https://github.com/Coding4DevelopersByShenthuri" icon={BsGithub} />
          </div>
        </div>
        {/* Added Contact Details */}
        <div className="text-center text-white mt-4">
          <p>Phone: +94 743899907</p>
          <p>Email: shenthurimaran@gmail.com</p>
        </div>
        {/* Custom Message */}
        <div className="text-center text-white mt-4">
          Made BY Shenthuri Maran with ❤️
        </div>
      </div>
    </Footer>
  );
}

export default MyFooter;
