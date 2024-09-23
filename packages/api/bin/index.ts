#!/usr/bin/env node
import { app } from '../src/app';

const port = +(process.env.PORT ?? '3000');

app
  .listen(port, () => {
    console.log('Server is running on port ' + port);
  })
  .on('error', (err: Error) => {
    console.error(err.message);
    process.exit(1);
  });
