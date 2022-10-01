let siteName = 'Mousa Alsheikh';
let baseUrl = 'https://api';
 
export const config = {
  isProduction: true,
  apiUrl: `${baseUrl}api/`,
  logoUrl: `${baseUrl}logo.png`,
  defaultLanguage: 'en',
  meta: {
    siteName: siteName,
    og_image: 'assets/images/og-image.jpg',
    og_site_name: `${siteName}`,
    og_type: 'Website',
    siteUrl: 'https://mousaalsheikh.com'
  }
};
