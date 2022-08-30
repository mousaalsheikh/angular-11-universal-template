let siteName = 'Adeed - عضيد';
let baseUrl = 'https://siteapi.adeed.com/';
 
export const config = {
  isProduction: false,
  apiUrl: `${baseUrl}api/`,
  logoUrl: `${baseUrl}logo.png`,
  bookingsApiUrl: 'https://bkngsapi.adeed.com/api/Shared/',
  defaultLanguage: 'ar',
  meta: {
    siteName: siteName,
    og_image: 'assets/images/og-image.jpg',
    og_site_name: `${siteName}`,
    og_type: 'Website',
    siteUrl: 'https://adeed.com'
  }
};
