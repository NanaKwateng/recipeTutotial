import cron from 'cron';
import https from 'https';

const job = new cron.CronJob('*/14 * * * *', () => {
  https.get(process.env.API_URL, (res) => {
    if (res.statusCode == 200) {
      console.error('API is healthy');
    } else {
      console.log('API has failed the health check');
    }
  }).on('error', (err) => {
    console.error('Error during health check:', err);
  });
});

export default job;

