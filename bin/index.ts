#!/usr/bin/env node
import app from '../src/app';

const port = +(process.env.PORT ?? '3000');

app.listen(port, async () => {
  console.log('Server is running on port ' + port);
});
