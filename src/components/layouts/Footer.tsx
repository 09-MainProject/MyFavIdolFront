import { businessInfo, customerServiceInfo } from '@/constants/footerInfo';

function Footer() {
  return (
    <footer className="bg-black px-6 py-10 text-sm text-gray-400">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-10 md:flex-row">
        <div>
          <h4 className="mb-2 text-xl font-bold">{businessInfo.title}</h4>
          <ul className="space-y-1">
            {businessInfo.items.map((item, index) => (
              <li key={`${index * 12345}`}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mr-80 mb-2 text-xl font-bold">
            {customerServiceInfo.title}
          </h4>
          <ul className="space-y-1">
            {customerServiceInfo.items.map((item, index) => (
              <li key={`${index * 12345}`}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-gray-400">
        CompanyName © 2025. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
