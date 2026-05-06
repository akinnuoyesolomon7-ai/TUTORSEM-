import http from 'http';
http.get('http://localhost:3000/gallery', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => console.log('STATUS:', res.statusCode, data !== ''));
});
