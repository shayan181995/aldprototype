import { Component } from '@angular/core';
import { DataService } from './DataService';



interface AccordionItem {
  name: string;
  content: string;
  active: boolean;
}

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent {
  color = '';
  condition = false;
  data: unknown;
  Value: ALDSection1[] = [];
  General: ALDSection1[] = [];
  TOX: ALDSection1[] = [];
  Environment: ALDSection1[] = [];

  
  
  accordionItems: AccordionItem[] = [
    { name: 'General Info', content: 'Accordion content goes here.', active: false },
    { name: 'Value', content: 'Accordion content goes here.', active: false },
    { name: 'TOX', content: 'Accordion content goes here.', active: false },
    { name: 'Residue Chemistry and Dietary Exposure', content: 'Accordion content goes here.', active: false },
    { name: 'Occupational-Residential-Aggregate Exposure', content: 'Accordion content goes here.', active: false },
    { name: 'MBES-Product Characterization and Analysis', content: 'Accordion content goes here.', active: false },
    { name: 'MBES-Toxicology', content: 'Accordion content goes here.', active: false },
    { name: 'Occupational Exposure and Dietary Exposure', content: 'Accordion content goes here.', active: false },
    { name: 'MBES-Environmental Assessment', content: 'Accordion content goes here.', active: false },
    { name: 'Incident Reports, Environment, Chemistry', content: 'Accordion content goes here.', active: false }
  ];

  constructor(private dataService: DataService){
  }
  ngOnInit() {
    this.dataService.getData().subscribe(
      (data: ALDSection1[]) => data.forEach((item) => {
        if(item['ALD Report to Generate'] == 'Value') {
          this.Value.push(item)
        }
        else if(item['ALD Report to Generate'] == 'General Info') {
          this.General.push(item)
        }
        else if(item['ALD Report to Generate'] == 'TOX') {
          this.TOX.push(item)
        }
        else if(item['ALD Report to Generate'] == 'Environment') {
          this.Environment.push(item)
        }
      })
    );
  }


  toggleAccordion(item: AccordionItem): void {
    item.active = !item.active;
  }
}
