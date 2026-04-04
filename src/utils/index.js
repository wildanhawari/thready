export const getAccessToken = () => localStorage.getItem('accessToken');
export const putAccessToken = (token) => localStorage.setItem('accessToken', token);

export const showFormattedDate = (date) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('id-ID', options);
};

export const stripHtml = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};