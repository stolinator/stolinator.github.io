const debounce = (fn, interval) => {
  let free = true;
  return (...args) => {
    if (free) {
      free = false;
      setTimeout(() => { free = true; }, interval);
      const result = fn.apply(this, args);
      return result;
    }
    return null;
  };
};

const randInt = (min, max) => {
  let res = Math.floor(Math.random() * (max - min)) + min;
  return res < min ? res + min : res; 
};

const rand = (a, b) => {
  let res = Math.random() * b;
  return res < a ? res + a : res;
};


const newPos = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return res = [
    `${randInt(0, width, width * 0.05)}px`,
    `${randInt(0, height, height * 0.05)}px`
  ];
}

const shuffle = (array, depth=3) => {
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  if (depth > 0) shuffle(array, depth - 1);
}

class Word {
  constructor(word, canvas) {
    let p = document.createElement('p');
    p.innerText = word;
    p.classList.add('hidden');
    p.style.fontSize = `${rand(1.5, 4)}rem`;
    [p.style.marginLeft, p.style.marginTop] = newPos();
    //p.style.opacity = `${rand(0.1, 0.15, 0)}`;
    canvas.appendChild(p);
    this.p = p;
  }
  blink(cb) {
    //console.log('blink!', this);
    this.p.classList.remove('hidden');
    setTimeout((() => {
      //console.log('blink');
      this.p.classList.add('hidden');
      this.move();
      setTimeout(() => cb(this), rand(2000, 5000));
    }).bind(this), rand(2000, 5000));
  }
  move() {
    [this.p.style.marginLeft, this.p.style.marginTop] = newPos();
    this.p.style.fontSize = `${rand(1.5, 4)}rem`;
  }
}

window.onload = () => {
  const paragraphs = [];
  const words = [
    'vim', 'react', 'nodejs', 'python', 'jquery', 'c', 'bootstrap',
    'beautiful soup', 'javascript', 'css', 'pandas', 'scikit learn',
    'mongodb', 'sqlalchemy', 'flask', 'typescript', 'nmap',
    'osi model', 'tcp/ip', 'http', 'sockets', 'bash', 'machine learning',
    'numpy', 'scipy', 'jupyter', 'algorithms', 'c++', 'statistics',
    'java', 'web scraping', 'ruby', 'jekyll', 'html', 'sql',
    'currying', 'agile development', 'heap', 'queue', 'time complexity',
    'stack', 'types', 'struct', 'data visualization', 'text mining',
    'cat 5e', 'hf propogation', 'sdr', 'software defined networking',
    'optimization', 'categorical', 'limit', 'finite', 'discrete',
    'continuous', 'ordinal', 'markov chain', 'entropy', 'linguistics',
    'nlp', 'neural networks', 'git', 'revision control', 'bsd',
    'multipath', 'attenuation', "ohm's law", 'virtualization',
    'decorator', 'closure', 'posix', 'makefile', 'utf-8', 'ssl',
    'ssh', 'tmux', 'multiplex', 'aws', 'cloud computing',
    'scalable infrastructure', 'determination', 'latex', 'compile',
    'sed', 'grep', 'awk', 'architecture', 'nasm', 'assembly',
    'boot sector', 'big endian', 'scalar', 'literal', 'rg58',
    'coax', 'bnc', 'vswr', 'protocol', 'concurrency', 'parallel',
    'netmask', 'subnet', 'public', 'private', 'namespace', 'interface',
    'compression', 'encryption', 'asynchronous', 'npm', 'babel',
    'webpack', 'nose', 'jest', 'unittest', sass
  ];
  const canvas = document.getElementsByClassName('canvas')[0];

  words.forEach((string) => {
    paragraphs.push(new Word(string, canvas));
  });
  let index = -1;
  /*
  const next = () => {
    console.log('index', index);
    index = (index + 1) % paragraphs.length;
    //console.log(index)
    paragraphs[index].blink(next, index);
  }
  */
  /*
  Array.from(canvas.getElementsByTagName('p')).forEach((p) => {
    p.classList.add('hidden');
  });
  */
  // 2 concurrent toggles running at a time
  //next();
  //next();

  // shuffle words
  shuffle(paragraphs);
  // create seperate queue for words
  // select a word 
  const cycle = (word) => {
    if (word !== undefined) {
      paragraphs.push(word);
    }
    word = paragraphs.shift();
    word.blink(cycle);
  };
  cycle();
  for (let i = 0; i < 8; i++) {
    setTimeout(cycle, rand(1000, 5000));
  }

};
