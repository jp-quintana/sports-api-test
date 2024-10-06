import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class JobService {
  private readonly filePath = path.join(__dirname, '../../src/data/jobs.json');

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    const fileContents = fs.readFileSync(this.filePath, 'utf8');
    const jobsArray = JSON.parse(fileContents);

    jobsArray.push(jobsArray.length + 1);

    fs.writeFileSync(this.filePath, JSON.stringify(jobsArray, null, 2));
  }
}
