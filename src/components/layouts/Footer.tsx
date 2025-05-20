import { businessInfo, customerServiceInfo } from '@/constants/footerInfo';

function Footer() {
  return (
    <footer className="w-full bg-black px-6 py-6 text-xs text-gray-400">
      <div className="flex flex-col justify-between gap-6 md:flex-row">
        <div>
          <h4 className="mb-1 text-base font-bold">{businessInfo.title}</h4>
          <ul className="space-y-0.5">
            {businessInfo.items.map((item, index) => (
              <li key={`${index * 12345}`}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mr-80 mb-1 text-base font-bold">
            {customerServiceInfo.title}
          </h4>
          <ul className="space-y-0.5">
            {customerServiceInfo.items.map((item, index) => (
              <li key={`${index * 12345}`}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 text-center text-[10px] text-gray-400">
        CompanyName © 2025. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
