import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../DataService';

@Component({
  selector: 'demo-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.css'],
})
export class EnvironmentComponent implements OnInit {
  shmode!: string;
  KeyDocsData: any;
  valueData: any;
  submissionNumber!: string;
  showPopup = false;
  editMode = false;
  currentItem: any;

  sectionData: any;
  section3Data: any;
  section4Data: any;
  section5Data: any;
  section6Data: any;
  section7Data: any;
  section8Data: any;
  section9Data: any;
  showSectionPopup = false;
  showSection3Popup = false;
  showSection4Popup = false;
  showSection5Popup = false;
  showSection6Popup = false;
  showSection7Popup = false;
  showSection8Popup = false;
  showSection9Popup = false;
  editSectionMode = false;
  currentSectionItem: any;

  newItem = {
    row_id: 0,
    Submission_Number: this.route.snapshot.paramMap.get('submissionNumber'),
    Document_Name: '',
    PMRA_Number: '',
    Comments: '',
  };

  newSectionItem = {
    row_id: 0,
    Submission_Number: this.route.snapshot.paramMap.get('submissionNumber'),
    Section_Number: '',
    Section_Name: '',
    Description: '',
    PMRA_Number: '',
    Potential_Flag: '',
  };

  newApprovalItem = {
    SubmissionNumber: this.route.snapshot.paramMap.get('submissionNumber'),
    Comments: '',
    Feedback: '',
    DateofFeedback: '',
    activeCode: '',
    Form: '',
    FormLink: '',
    SectionHeadName: '',
    EvaluatorName: '',
    updated: '',
    flags: 0,
    id: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  updateLastUpdatedOn() {
    this.valueData['ALD Last Updated on'] = this.formatDate(
      new Date().toString()
    );
    this.dataService.editRecord(this.valueData).subscribe((response) => {
      if (response) {
        console.log('updated');
      }
    });
  }

  requestForApproval() {
    this.newApprovalItem.activeCode = this.valueData['Active Code'];
    this.newApprovalItem.FormLink = window.location.href.includes('shmode')
      ? window.location.href.replace('shmode=0', 'shmode=1')
      : window.location.href + '?shmode=1';
    this.newApprovalItem.Form = this.valueData['ALD Report to Generate'];
    this.newApprovalItem.SectionHeadName = this.valueData['ALD Approved By'];
    this.newApprovalItem.updated = this.formatDate(new Date().toString());
    this.newApprovalItem.EvaluatorName = this.valueData['Evaluator'];
    if (this.shmode == '0' || this.shmode == null) {
      this.newApprovalItem.Feedback = 'Pending';
    } else {
      this.newApprovalItem.DateofFeedback = this.formatDate(
        new Date().toString()
      );
    }
    this.newApprovalItem.updated = this.newApprovalItem.updated.toString();
    if (this.newApprovalItem.DateofFeedback)
      this.newApprovalItem.DateofFeedback = this.formatDate(
        this.newApprovalItem.DateofFeedback
      );
    if (this.newApprovalItem.id != 0) {
      this.dataService
        .editSectionHeadFeedback(this.newApprovalItem)
        .subscribe((data) => {
          alert('Feedback Submitted Successfully');
          this.newApprovalItem.Feedback=='Approved'?this.valueData['flag']=1:this.valueData['flag']=0;
          this.updateLastUpdatedOn();
        });
    } else {
      this.dataService
        .addNewSectionHeadFeedback(this.newApprovalItem)
        .subscribe((data) => {
          alert('Request Submitted Successfully');
        });
    }
  }

  printData() {
    window.print();
  }

  updateSectionForm() {
    this.dataService.editRecord(this.valueData).subscribe((response) => {
      if (response) {
        alert('ALD Section Record Updated successfully');
      } else {
        alert(
          'Form Fields have incorrect Data types, Kindly check and try again'
        );
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.shmode = params['shmode'];
    });

    this.submissionNumber =
      this.route.snapshot.paramMap.get('submissionNumber') ?? '';

    this.dataService.getValueData(this.submissionNumber).subscribe((data) => {
      this.valueData = data.map((item: ALDSection1) => {
        // Format the date fields for display
        const formattedDate = item['Initiation Date']
          ? this.formatDate(item['Initiation Date'])
          : '';
        const formattedALDcreatedonDate = item['ALD created on']
          ? this.formatDate(item['ALD created on'])
          : '';
        const formattedALDLastUpdatedonDate = item['ALD Last Updated on']
          ? this.formatDate(item['ALD Last Updated on'])
          : '';
        const formattedALDApprovedonDate = item['ALD Approved on']
          ? this.formatDate(item['ALD Approved on'])
          : '';
        const formattedSMCBN1DateDate = item['SMC BN1 Date']
          ? this.formatDate(item['SMC BN1 Date'])
          : '';
        const formattedSMCBN2Date = item['SMC BN2 Date']
          ? this.formatDate(item['SMC BN2 Date'])
          : '';
        const formattedNextAssessmentDate = item['Next Assessment Date']
          ? this.formatDate(item['Next Assessment Date'])
          : '';
        // Return the updated item with formatted date fields
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
      this.valueData = this.valueData.filter(
        (x: { [x: string]: string }) =>
          x['ALD Report to Generate'] == 'Environment'
      )[0];
      this.dataService
        .getSectionHeadFeedback(
          this.submissionNumber,
          this.valueData['ALD Report to Generate']
        )
        .subscribe((data: any) => {
          data = data[0];
          if (data) {
            if (data.DateofFeedback)
              this.newApprovalItem.DateofFeedback = this.formatDate(
                data.DateofFeedback
              );
            this.newApprovalItem.Comments = data.Comments;
            this.newApprovalItem.Feedback = data.Feedback;
            this.newApprovalItem.id = data.id;
          }
        });
    });

    this.dataService.getKeyDocsData(this.submissionNumber).subscribe((data) => {
      this.KeyDocsData = data.map(
        (item: {
          'Document Name': any;
          'Submission Number': any;
          'PMRA Number': any;
          Comments: any;
          row_id: any;
        }) => {
          return {
            Document_Name: item['Document Name'],
            Submission_Number: item['Submission Number'],
            PMRA_Number: item['PMRA Number'],
            Comments: item.Comments,
            row_id: item.row_id,
          };
        }
      );
    });

    this.dataService.getSectionData(this.submissionNumber).subscribe((data) => {
      this.sectionData = data.map(
        (item: {
          'Section number': any;
          'Section name': any;
          Description: any;
          'PMRA Number': any;
          'Potential Flag': any;
          row_id: any;
          'Submission Number': any;
        }) => {
          return {
            Section_Name: item['Section name'],
            Section_Number: item['Section number'],
            PMRA_Number: item['PMRA Number'],
            Description: item['Description'],
            Potential_Flag: item['Potential Flag'],
            row_id: item.row_id,
            Submission_Number: item['Submission Number'],
          };
        }
      );
      this.section3Data = this.sectionData.filter(
        (i: { Section_Number: number }) => i.Section_Number == 3
      );
      this.section4Data = this.sectionData.filter(
        (i: { Section_Number: number }) => i.Section_Number == 4
      );
      this.section5Data = this.sectionData.filter(
        (i: { Section_Number: number }) => i.Section_Number == 5
      );
      this.section6Data = this.sectionData.filter(
        (i: { Section_Number: number }) => i.Section_Number == 6
      );
      this.section7Data = this.sectionData.filter(
        (i: { Section_Number: number }) => i.Section_Number == 7
      );
      this.section8Data = this.sectionData.filter(
        (i: { Section_Number: number }) => i.Section_Number == 8
      );
      this.section9Data = this.sectionData.filter(
        (i: { Section_Number: number }) => i.Section_Number == 9
      );
    });
  }

  openPopup(item?: any) {
    if (item) {
      // Editing an existing item
      this.newItem.Submission_Number = item.Submission_Number;
      this.newItem.row_id = item.row_id;
      this.newItem.Document_Name = item.Document_Name;
      this.newItem.PMRA_Number = item.PMRA_Number;
      this.newItem.Comments = item.Comments;
      this.editMode = true;
      this.currentItem = item;
    } else {
      // Adding a new item
      this.newItem.Document_Name = '';
      this.newItem.PMRA_Number = '';
      this.newItem.Comments = '';
      this.editMode = false;
      this.currentItem = null;
    }
    this.showPopup = true;
  }

  submitForm(editMode: boolean) {
    if (editMode) {
      this.dataService.editKeyDocsItem(this.newItem).subscribe((response) => {
        if (response) {
          this.updateLastUpdatedOn();
          // Find the index of the item being edited
          const index = this.KeyDocsData.findIndex(
            (item: { row_id: number }) => item.row_id === this.newItem.row_id
          );

          // Replace the item with the updated item
          this.KeyDocsData[index] = this.newItem;
          // Reset the newItem object and close the popup
          this.newItem = {
            Submission_Number:
              this.route.snapshot.paramMap.get('submissionNumber'),
            row_id: 0,
            Document_Name: '',
            PMRA_Number: '',
            Comments: '',
          };
          this.showPopup = false;
        } else {
          alert(
            'Form Fields have incorrect Data types, Kindly check and try again'
          );
        }
      });
    } else {
      const lastitem = this.newItem;
      this.dataService.addNewKeyDocsItem(this.newItem).subscribe((response) => {
        // Reset the newItem object and close the popup
        if (response) {
          this.updateLastUpdatedOn();
          this.newItem = {
            Submission_Number:
              this.route.snapshot.paramMap.get('submissionNumber'),
            row_id: 0,
            Document_Name: '',
            PMRA_Number: '',
            Comments: '',
          };

          this.KeyDocsData.push(lastitem);
          this.showPopup = false;
        } else {
          alert(
            'Form Fields have incorrect Data types, Kindly check and try again'
          );
        }
      });
    }
  }

  closePopup() {
    this.showPopup = false;
  }

  deleteItem(item: any) {
    this.dataService.deleteKeyDocsItem(item.row_id).subscribe((response) => {
      const index = this.KeyDocsData.indexOf(item);
      if (index >= 0) {
        this.KeyDocsData.splice(index, 1);
        this.updateLastUpdatedOn();
      }
    });
  }

  openSectionPopup(item?: any) {
    if (item) {
      // Editing an existing item
      this.newSectionItem.Submission_Number = item.Submission_Number;
      this.newSectionItem.Section_Number = item.Section_Number;
      this.newSectionItem.Section_Name = item.Section_Name;
      this.newSectionItem.Description = item.Description;
      this.newSectionItem.PMRA_Number = item.PMRA_Number;
      this.newSectionItem.Potential_Flag = item.Potential_Flag;
      this.newSectionItem.row_id = item.row_id;
      this.editSectionMode = true;
      this.currentSectionItem = this.newSectionItem;
    } else {
      // Adding a new item
      this.newSectionItem.Section_Number = '';
      this.newSectionItem.Section_Name = '';
      this.newSectionItem.Description = '';
      this.newSectionItem.PMRA_Number = '';
      this.newSectionItem.Potential_Flag = '';
      this.editSectionMode = false;
      this.currentSectionItem = null;
    }
  }

  submitSectionForm(
    editSectionMode: boolean,
    subSection_Number: string,
    subSection_Name: string
  ) {
    this.newSectionItem.Section_Number = subSection_Number;
    this.newSectionItem.Section_Name = subSection_Name;
    if (editSectionMode) {
      this.dataService
        .editSectionItem(this.newSectionItem)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Find the index of the item being edited
            if (this.newSectionItem.Section_Number == '3') {
              const index = this.section3Data.findIndex(
                (item: { row_id: number }) =>
                  item.row_id === this.newSectionItem.row_id
              );
              // Replace the item with the updated item
              this.section3Data[index] = this.newSectionItem;
            } else if (this.newSectionItem.Section_Number == '4') {
              const index = this.section4Data.findIndex(
                (item: { row_id: number }) =>
                  item.row_id === this.newSectionItem.row_id
              );
              // Replace the item with the updated item
              this.section4Data[index] = this.newSectionItem;
            } else if (this.newSectionItem.Section_Number == '5') {
              const index = this.section5Data.findIndex(
                (item: { row_id: number }) =>
                  item.row_id === this.newSectionItem.row_id
              );
              // Replace the item with the updated item
              this.section5Data[index] = this.newSectionItem;
            } else if (this.newSectionItem.Section_Number == '6') {
              const index = this.section6Data.findIndex(
                (item: { row_id: number }) =>
                  item.row_id === this.newSectionItem.row_id
              );
              // Replace the item with the updated item
              this.section6Data[index] = this.newSectionItem;
            } else if (this.newSectionItem.Section_Number == '7') {
              const index = this.section7Data.findIndex(
                (item: { row_id: number }) =>
                  item.row_id === this.newSectionItem.row_id
              );
              // Replace the item with the updated item
              this.section7Data[index] = this.newSectionItem;
            } else if (this.newSectionItem.Section_Number == '8') {
              const index = this.section8Data.findIndex(
                (item: { row_id: number }) =>
                  item.row_id === this.newSectionItem.row_id
              );
              // Replace the item with the updated item
              this.section8Data[index] = this.newSectionItem;
            } else if (this.newSectionItem.Section_Number == '9') {
              const index = this.section9Data.findIndex(
                (item: { row_id: number }) =>
                  item.row_id === this.newSectionItem.row_id
              );
              // Replace the item with the updated item
              this.section9Data[index] = this.newSectionItem;
            }
            // Reset the newItem object and close the popup
            this.newSectionItem = {
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Section_Number: '',
              Section_Name: '',
              Description: '',
              PMRA_Number: '',
              Potential_Flag: '',
            };
            this.showSectionPopup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    } else {
      const lastitem = this.newSectionItem;
      this.dataService
        .addNewSectionItem(this.newSectionItem)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Reset the newItem object and close the popup
            this.newSectionItem = {
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Section_Number: '',
              Section_Name: '',
              Description: '',
              PMRA_Number: '',
              Potential_Flag: '',
            };

            this.sectionData.push(lastitem);
            if (lastitem.Section_Number == '3') {
              this.section3Data.push(lastitem);
            } else if (lastitem.Section_Number == '4') {
              this.section4Data.push(lastitem);
            } else if (lastitem.Section_Number == '5') {
              this.section5Data.push(lastitem);
            } else if (lastitem.Section_Number == '6') {
              this.section6Data.push(lastitem);
            } else if (lastitem.Section_Number == '7') {
              this.section7Data.push(lastitem);
            } else if (lastitem.Section_Number == '8') {
              this.section8Data.push(lastitem);
            } else if (lastitem.Section_Number == '9') {
              this.section9Data.push(lastitem);
            }
            this.showSectionPopup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    }
  }

  closeSectionPopup() {
    this.showSectionPopup = false;
  }

  deleteSectionItem(item: any) {
    this.dataService.deleteSectionItem(item.row_id).subscribe((response) => {
      let index = this.sectionData.indexOf(item);
      if (index >= 0) {
        this.sectionData.splice(index, 1);
        this.updateLastUpdatedOn();
      }
      index = this.section3Data.indexOf(item);
      if (index >= 0) {
        this.section3Data.splice(index, 1);
        this.updateLastUpdatedOn();
      }
      index = this.section4Data.indexOf(item);
      if (index >= 0) {
        this.section4Data.splice(index, 1);
        this.updateLastUpdatedOn();
      }
      index = this.section5Data.indexOf(item);
      if (index >= 0) {
        this.section5Data.splice(index, 1);
        this.updateLastUpdatedOn();
      }
      index = this.section6Data.indexOf(item);
      if (index >= 0) {
        this.section6Data.splice(index, 1);
        this.updateLastUpdatedOn();
      }
      index = this.section7Data.indexOf(item);
      if (index >= 0) {
        this.section7Data.splice(index, 1);
        this.updateLastUpdatedOn();
      }
      index = this.section8Data.indexOf(item);
      if (index >= 0) {
        this.section8Data.splice(index, 1);
        this.updateLastUpdatedOn();
      }
      index = this.section9Data.indexOf(item);
      if (index >= 0) {
        this.section9Data.splice(index, 1);
        this.updateLastUpdatedOn();
      }
    });
  }
}
