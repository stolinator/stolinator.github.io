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
  return [
    `${randInt(0, width)}px`,
    `${randInt(0, height)}px`
  ];
};

const shuffle = (array, depth=3) => {
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  if (depth > 0) shuffle(array, depth - 1);
};

class Word {
  constructor(word, canvas) {
    let p = document.createElement('p');
    p.innerText = word;
    p.classList.add('hidden');
    p.style.fontSize = `${rand(1.5, 4)}rem`;
    canvas.appendChild(p);
    this.p = p;
    this.move();

  }
  blink(cb) {
    this.p.classList.remove('hidden');
    setTimeout((() => {
      //console.log('blink');
      this.p.classList.add('hidden');
      setTimeout((() => {
        this.move();
        cb(this);
      }).bind(this), rand(3000, 6000));
    }).bind(this), rand(3000, 6000));
  }
  move() {
    [this.p.style.marginLeft, this.p.style.marginTop] = newPos();
    this.p.style.fontSize = `${rand(1.5, 4)}rem`;
  }
}

window.onload = () => {

  const connectBtn = document.getElementById('connect-btn');

  if (connectBtn) {
    const modal = document.getElementById('modal');
    connectBtn.addEventListener('click', (e) => {
      modal.classList.remove('hidden');
    });
    modal.getElementsByTagName('button')[0].addEventListener('click', (e) => {
      modal.classList.add('hidden');
    });
  }

  const paragraphs = [];

  const words = [
    'vim', 'React', 'Node.js', 'python', 'jQuery', 'C', 'bootstrap',
    'beautiful soup', 'javascript', 'CSS', 'pandas', 'scikit learn',
    'mongodb', 'sqlalchemy', 'flask', 'typescript', 'nmap',
    'osi model', 'TCP/IP', 'HTTP', 'sockets', 'bash', 'machine learning',
    'numpy', 'scipy', 'jupyter', 'algorithms', 'C++', 'statistics',
    'java', 'web scraping', 'ruby', 'jekyll', 'HTML', 'SQL',
    'currying', 'agile development', 'heap', 'queue', 'time complexity',
    'stack', 'types', 'struct', 'data visualization', 'text mining',
    'CAT 5e', 'hf propogation', 'SDR', 'software defined networking',
    'optimization', 'categorical', 'limit', 'finite', 'discrete',
    'continuous', 'ordinal', 'markov chain', 'entropy', 'linguistics',
    'NLP', 'neural networks', 'git', 'revision control', 'BSD',
    'multipath', 'attenuation', "ohm's law", 'virtualization',
    'decorator', 'closure', 'posix', 'makefile', 'utf-8', 'SSL',
    'ssh', 'tmux', 'multiplex', 'AWS', 'cloud computing',
    'scalable infrastructure', 'determination', 'LaTex', 'compile',
    'sed', 'grep', 'awk', 'architecture', 'nasm', 'assembly',
    'boot sector', 'big endian', 'scalar', 'literal', 'RG58',
    'coax', 'bnc', 'vswr', 'protocol', 'concurrency', 'parallel',
    'netmask', 'subnet', 'public', 'private', 'namespace', 'interface',
    'compression', 'encryption', 'asynchronous', 'npm', 'babel',
    'webpack', 'nose', 'jest', 'unittest', 'sass', 'mutability',
    'docker',
  ];

  const canvas = document.getElementsByClassName('canvas')[0];

  words.forEach((string) => {
    paragraphs.push(new Word(string, canvas));
  });

  shuffle(paragraphs);

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
