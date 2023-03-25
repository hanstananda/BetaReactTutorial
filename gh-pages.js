import ghpages from 'gh-pages';

ghpages.publish('dist', {
branch: 'develop',
repo: 'https://github.com/hanstananda/hanstananda.github.io.git',
dest: 'tic-tac-toe',
add: true,
}, callback);
