function assureUrl(url) {
  if (url.slice(0,8) != 'https://') {
    url = 'https://medium.com' + url;
  }
  return url;
}

os('win');
country('us');
navigate('https://medium.com/tag/productivity', {wait_until: 'domcontentloaded'});

let retries = 10;

while(!el_exists('[role=dialog]') && retries > 0) {
  try {
    $('button').filter_includes('See More').wait();
    scroll_to('bottom');
    $('button').filter_includes('See More').wait();
    wait('[role=dialog]', { timeout: 10e3 })
    
  } catch(e) {
    retries--;
  }
}

let { urls, names, maxArticlesCount, writersAmount } = parse();
// console.log('NUmber of requested Top Writers: ', urls.length)

for (let [index, link] of urls.entries()) {
  const url = assureUrl(link);
  const writerName = names[index];
  next_stage({ url, index, writerName, maxArticlesCount })
    
}

