export interface Partner {
  name: string;
  logo: string;
  description: string;
  services: string[];
}

export const partners: Partner[] = [
  { 
    name: 'HDFC Bank', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/1200px-HDFC_Bank_Logo.svg.png',
    description: 'HDFC Bank is one of India\'s leading private sector banks offering a wide range of financial products.',
    services: ['Credit Cards', 'Personal Loans', 'Home Loans', 'Savings Accounts']
  },
  { 
    name: 'ICICI Bank', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/ICICI_Bank_Logo.svg/1200px-ICICI_Bank_Logo.svg.png',
    description: 'ICICI Bank offers a diverse portfolio of financial services to corporate and retail customers.',
    services: ['Instant Loans', 'Credit Cards', 'Wealth Management', 'Insurance']
  },
  { 
    name: 'Axis Bank', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Axis_Bank_logo.svg/1200px-Axis_Bank_logo.svg.png',
    description: 'Axis Bank is the third largest private sector bank in India, providing a suite of financial services.',
    services: ['Business Loans', 'Credit Cards', 'Fixed Deposits', 'Education Loans']
  },
  { 
    name: 'SBI Card', 
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/58/SBI_Card_logo.svg/1200px-SBI_Card_logo.svg.png',
    description: 'SBI Card is a leading credit card issuer in India, offering various reward-centric cards.',
    services: ['Shopping Cards', 'Travel Cards', 'Fuel Cards', 'Premium Cards']
  },
  { 
    name: 'IDFC First', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/IDFC_First_Bank_logo.svg/1200px-IDFC_First_Bank_logo.svg.png',
    description: 'IDFC First Bank is focused on providing technology-led banking solutions to its customers.',
    services: ['Zero Fee Cards', 'Personal Loans', 'Consumer Durable Loans', 'Savings Accounts']
  },
  { 
    name: 'Kotak', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Kotak_Mahindra_Bank_logo.svg/1200px-Kotak_Mahindra_Bank_logo.svg.png',
    description: 'Kotak Mahindra Bank offers tailored financial solutions across banking, insurance, and investments.',
    services: ['811 Savings Account', 'Credit Cards', 'Car Loans', 'Mutual Funds']
  },
  { 
    name: 'IndusInd', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/IndusInd_Bank_Logo.svg/1200px-IndusInd_Bank_Logo.svg.png',
    description: 'IndusInd Bank is known for its innovative customer-centric banking products and services.',
    services: ['Aura Edge Card', 'Personal Loans', 'Vehicle Loans', 'Forex Services']
  },
  { 
    name: 'Yes Bank', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Yes_Bank_Logo.svg/1200px-Yes_Bank_Logo.svg.png',
    description: 'Yes Bank provides a range of banking and financial services to corporate and retail segments.',
    services: ['Digital Banking', 'Credit Cards', 'Enterprise Loans', 'Insurance']
  },
];
