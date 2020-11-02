import { Controller, Get } from '@nestjs/common';
import { FormSubmitter } from "./formSubmitter";
import { IQueryData } from './queryDataInterface';

@Controller('mobile')
export class MobileController {
  @Get('/frax-result')
  async calculate() {
    const query: IQueryData = {
        age: 55,
        gender: 'Female',
        weight: 62,
        height: 170,
        previous_fracture: 'No',
        parent_fractured_hip: 'No',
        current_smoking: 'No',
        glucocorticoids: 'Yes',
        rheumatoid_arthritis: 'No',
        secondary_osteoporosis: 'Yes',
        alcohol: 'No',
    };

    const formSubmitter = new FormSubmitter(
        query,
        'ctl00_ContentPlaceHolder1_btnCalculate',
        'ctl00_ContentPlaceHolder1_lbrs1',
    );

    console.log("formSubmitter:", formSubmitter)

    try {
      const targetValue = await formSubmitter.evaluateQuery();
      return targetValue;
    } catch (e) {
      return { error: e.message }
    }
  }
}
