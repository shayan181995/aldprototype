import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as e from 'express';
import { DataService } from '../DataService';

interface AccordionItem {
  name: string;
  content: string;
  active: boolean;
}

@Component({
  selector: 'demo-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  domainUrl = '';
  activeCode = '';
  activeName = '';
  anchorSubmissionNumber = '';
  registeredProductNumbers = '';
  cluster = '';
  submissions = '';
  color = '';
  condition = false;
  data: unknown;
  Value: ALDSection1[] = [];
  General: ALDSection1[] = [];
  TOX: ALDSection1[] = [];
  Environment: ALDSection1[] = [];

  accordionItems: AccordionItem[] = [
    {
      name: 'General Info',
      content: 'Accordion content goes here.',
      active: false,
    },
    { name: 'Value', content: 'Accordion content goes here.', active: false },
    { name: 'TOX', content: 'Accordion content goes here.', active: false },
    // {
    //   name: 'Residue Chemistry and Dietary Exposure',
    //   content: 'Accordion content goes here.',
    //   active: false,
    // },
    // {
    //   name: 'Occupational-Residential-Aggregate Exposure',
    //   content: 'Accordion content goes here.',
    //   active: false,
    // },
    // {
    //   name: 'MBES-Product Characterization and Analysis',
    //   content: 'Accordion content goes here.',
    //   active: false,
    // },
    // {
    //   name: 'MBES-Toxicology',
    //   content: 'Accordion content goes here.',
    //   active: false,
    // },
    // {
    //   name: 'Occupational Exposure and Dietary Exposure',
    //   content: 'Accordion content goes here.',
    //   active: false,
    // },
    // {
    //   name: 'MBES-Environmental Assessment',
    //   content: 'Accordion content goes here.',
    //   active: false,
    // },
    {
      name: 'Environment',
      content: 'Accordion content goes here.',
      active: false,
    },
  ];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.domainUrl = window.location.origin;
    this.activeCode = this.route.snapshot.paramMap.get('activeCode') || '';
    if (this.activeCode != '') {
      this.pullData();
    }
  }

  toggleAccordion(item: AccordionItem): void {
    item.active = !item.active;
  }

  pullData() {
    if (this.activeCode == '') {
      alert('Please Enter Active Code');
    } else {
      this.Value = [];
      this.General = [];
      this.Environment = [];
      this.TOX = [];
      this.cluster = '';
      this.submissions = '';
      this.registeredProductNumbers = '';
      this.dataService
        .getActiveData(this.activeCode)
        .subscribe((data: ALDSection1[]) =>
          data.forEach((item) => {
            this.activeName = item['Active Name'];
            this.anchorSubmissionNumber = item['Anchor Submission Number'];
            if (!this.cluster.includes(item['Cluster Name']))
              this.cluster = this.cluster + ' ' + item['Cluster Name'] + ',';
            if (
              !this.submissions.includes(item['Submission Number'].toString())
            )
              this.submissions =
                this.submissions + ' ' + item['Submission Number'] + ',';
            this.dataService
              .getGenInfo_EP_MARKETING_TableItem(
                item['Submission Number'].toString()
              )
              .subscribe((data) => {
                data.forEach((i: { [x: string]: any }) => {
                  this.registeredProductNumbers =
                    this.registeredProductNumbers +
                    ' ' +
                    i['Product_Name'] +
                    ',';
                  console.log(i['Product_Name']);
                });
              });
            this.dataService
              .getSectionHeadFeedback(
                item['Submission Number'].toString(),
                item['ALD Report to Generate']
              )
              .subscribe((data: any) => {
                data = data[0];
                if (data) {
                  if (data.Feedback != 'Approved') item['ALD Approved By'] = '';
                  else item['ALD Approved on'] = data.DateofFeedback;
                } else {
                  item['ALD Approved By'] = '';
                }

                if (item['ALD Report to Generate'] == 'Value') {
                  this.Value.push(item);
                  this.Value = this.Value.map((item: ALDSection1) => {
                    // Format the date field for display
                    // Format the date fields for display
                    const formattedDate = item['Initiation Date']
                      ? new Date(item['Initiation Date']).toLocaleDateString()
                      : '';
                    const formattedALDcreatedonDate = item['ALD created on']
                      ? new Date(item['ALD created on']).toLocaleDateString()
                      : '';
                    const formattedALDLastUpdatedonDate = item[
                      'ALD Last Updated on'
                    ]
                      ? new Date(
                          item['ALD Last Updated on']
                        ).toLocaleDateString()
                      : '';
                    const formattedALDApprovedonDate = item['ALD Approved on']
                      ? new Date(item['ALD Approved on']).toLocaleDateString()
                      : '';
                    const formattedSMCBN1DateDate = item['SMC BN1 Date']
                      ? new Date(item['SMC BN1 Date']).toLocaleDateString()
                      : '';
                    const formattedSMCBN2Date = item['SMC BN2 Date']
                      ? new Date(item['SMC BN2 Date']).toLocaleDateString()
                      : '';
                    const formattedNextAssessmentDate = item[
                      'Next Assessment Date'
                    ]
                      ? new Date(
                          item['Next Assessment Date']
                        ).toLocaleDateString()
                      : '';
                    return {
                      ...item,
                      'Initiation Date': formattedDate,
                      'ALD created on': formattedALDcreatedonDate,
                      'ALD Last Updated on': formattedALDLastUpdatedonDate,
                      'ALD Approved on': formattedALDApprovedonDate,
                      'SMC BN1 Date': formattedSMCBN1DateDate,
                      'SMC BN2 Date': formattedSMCBN2Date,
                      'Next Assessment Date': formattedNextAssessmentDate,
                    };
                  });
                } else if (item['ALD Report to Generate'] == 'General Info') {
                  this.General.push(item);
                  this.General = this.General.map((item: ALDSection1) => {
                    // Format the date field for display
                    // Format the date fields for display
                    const formattedDate = item['Initiation Date']
                      ? new Date(item['Initiation Date']).toLocaleDateString()
                      : '';
                    const formattedALDcreatedonDate = item['ALD created on']
                      ? new Date(item['ALD created on']).toLocaleDateString()
                      : '';
                    const formattedALDLastUpdatedonDate = item[
                      'ALD Last Updated on'
                    ]
                      ? new Date(
                          item['ALD Last Updated on']
                        ).toLocaleDateString()
                      : '';
                    const formattedALDApprovedonDate = item['ALD Approved on']
                      ? new Date(item['ALD Approved on']).toLocaleDateString()
                      : '';
                    const formattedSMCBN1DateDate = item['SMC BN1 Date']
                      ? new Date(item['SMC BN1 Date']).toLocaleDateString()
                      : '';
                    const formattedSMCBN2Date = item['SMC BN2 Date']
                      ? new Date(item['SMC BN2 Date']).toLocaleDateString()
                      : '';
                    const formattedNextAssessmentDate = item[
                      'Next Assessment Date'
                    ]
                      ? new Date(
                          item['Next Assessment Date']
                        ).toLocaleDateString()
                      : '';
                    return {
                      ...item,
                      'Initiation Date': formattedDate,
                      'ALD created on': formattedALDcreatedonDate,
                      'ALD Last Updated on': formattedALDLastUpdatedonDate,
                      'ALD Approved on': formattedALDApprovedonDate,
                      'SMC BN1 Date': formattedSMCBN1DateDate,
                      'SMC BN2 Date': formattedSMCBN2Date,
                      'Next Assessment Date': formattedNextAssessmentDate,
                    };
                  });
                } else if (item['ALD Report to Generate'] == 'TOX') {
                  this.TOX.push(item);
                  this.TOX = this.TOX.map((item: ALDSection1) => {
                    // Format the date field for display
                    // Format the date fields for display
                    const formattedDate = item['Initiation Date']
                      ? new Date(item['Initiation Date']).toLocaleDateString()
                      : '';
                    const formattedALDcreatedonDate = item['ALD created on']
                      ? new Date(item['ALD created on']).toLocaleDateString()
                      : '';
                    const formattedALDLastUpdatedonDate = item[
                      'ALD Last Updated on'
                    ]
                      ? new Date(
                          item['ALD Last Updated on']
                        ).toLocaleDateString()
                      : '';
                    const formattedALDApprovedonDate = item['ALD Approved on']
                      ? new Date(item['ALD Approved on']).toLocaleDateString()
                      : '';
                    const formattedSMCBN1DateDate = item['SMC BN1 Date']
                      ? new Date(item['SMC BN1 Date']).toLocaleDateString()
                      : '';
                    const formattedSMCBN2Date = item['SMC BN2 Date']
                      ? new Date(item['SMC BN2 Date']).toLocaleDateString()
                      : '';
                    const formattedNextAssessmentDate = item[
                      'Next Assessment Date'
                    ]
                      ? new Date(
                          item['Next Assessment Date']
                        ).toLocaleDateString()
                      : '';
                    return {
                      ...item,
                      'Initiation Date': formattedDate,
                      'ALD created on': formattedALDcreatedonDate,
                      'ALD Last Updated on': formattedALDLastUpdatedonDate,
                      'ALD Approved on': formattedALDApprovedonDate,
                      'SMC BN1 Date': formattedSMCBN1DateDate,
                      'SMC BN2 Date': formattedSMCBN2Date,
                      'Next Assessment Date': formattedNextAssessmentDate,
                    };
                  });
                } else if (item['ALD Report to Generate'] == 'Environment') {
                  this.Environment.push(item);
                  this.Environment = this.Environment.map(
                    (item: ALDSection1) => {
                      // Format the date field for display
                      // Format the date fields for display
                      const formattedDate = item['Initiation Date']
                        ? new Date(item['Initiation Date']).toLocaleDateString()
                        : '';
                      const formattedALDcreatedonDate = item['ALD created on']
                        ? new Date(item['ALD created on']).toLocaleDateString()
                        : '';
                      const formattedALDLastUpdatedonDate = item[
                        'ALD Last Updated on'
                      ]
                        ? new Date(
                            item['ALD Last Updated on']
                          ).toLocaleDateString()
                        : '';
                      const formattedALDApprovedonDate = item['ALD Approved on']
                        ? new Date(item['ALD Approved on']).toLocaleDateString()
                        : '';
                      const formattedSMCBN1DateDate = item['SMC BN1 Date']
                        ? new Date(item['SMC BN1 Date']).toLocaleDateString()
                        : '';
                      const formattedSMCBN2Date = item['SMC BN2 Date']
                        ? new Date(item['SMC BN2 Date']).toLocaleDateString()
                        : '';
                      const formattedNextAssessmentDate = item[
                        'Next Assessment Date'
                      ]
                        ? new Date(
                            item['Next Assessment Date']
                          ).toLocaleDateString()
                        : '';
                      return {
                        ...item,
                        'Initiation Date': formattedDate,
                        'ALD created on': formattedALDcreatedonDate,
                        'ALD Last Updated on': formattedALDLastUpdatedonDate,
                        'ALD Approved on': formattedALDApprovedonDate,
                        'SMC BN1 Date': formattedSMCBN1DateDate,
                        'SMC BN2 Date': formattedSMCBN2Date,
                        'Next Assessment Date': formattedNextAssessmentDate,
                      };
                    }
                  );
                }
              });
          })
        );
      setTimeout(() => {
        this.cluster = this.cluster.slice(0, -1);
        this.submissions = this.submissions.slice(0, -1);
      }, 50);
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
