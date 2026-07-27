const playStoreBase =
  'https://play.google.com/store/apps/details?id=com.bookverse.contacts';

export function playStoreUrl(content: string): string {
  const referrer = new URLSearchParams({
    utm_source: 'fun_phone_web',
    utm_medium: 'owned_landing',
    utm_campaign: 'android_release',
    utm_content: content,
  });
  return `${playStoreBase}&referrer=${encodeURIComponent(referrer.toString())}`;
}
