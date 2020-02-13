const fs = require('fs');
const app = require('express')();

app.set('port', (process.env.PORT || 4242));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/webhook', (req, res) => {
  const param = req.query.q;

  if (!param) {
    res.json({
      error: 'Missing required parameter `q`',
    });
    return;
  }

  fs.appendFileSync('transactions.log', 'Transaction: ' + param + '\n');

  res.json({
    success: 'OK',
  });
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
