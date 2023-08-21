import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../DataService';

@Component({
  selector: 'demo-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css'],
})
export class ValueComponent implements OnInit {
  @ViewChild('content') content!: ElementRef;
  shmode!: string;
  valueSection2Data: any;
  valueSection3Data: any;
  valueSection4Data: any;
  valueData: any;
  submissionNumber!: string;
  showPopup = false;
  showSection3Popup = false;
  showSection4Popup = false;
  editMode = false;
  currentItem: any;
  editModeSection3 = false;
  currentSection3Item: any;
  editModeSection4 = false;
  currentSection4Item: any;

  newItem = {
    submissionNumber: this.route.snapshot.paramMap.get('submissionNumber'),
    Reference_PMRA_Document_Numbers_Date: '',
    Reference_PMRA_Document_Numbers: '',
    Comments: '',
    id: 0,
  };

  newSection3Item = {
    submissionNumber: this.route.snapshot.paramMap.get('submissionNumber'),
    Study_Type: '',
    Document_Type: '',
    PMRA_Number: 0,
    PMRA_System_Document_Location: '',
    Comments: '',
    id: 0,
  };

  newSection4Item = {
    submissionNumber: this.route.snapshot.paramMap.get('submissionNumber'),
    Registration_Number: 0,
    Reference_PMRA_Document_Numbers: 0,
    Comments: '',
    id: 0,
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

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.shmode = params['shmode'];
    });

    this.submissionNumber =
      this.route.snapshot.paramMap.get('submissionNumber') ?? '';
    this.dataService
      .getValueSection2Data(this.submissionNumber)
      .subscribe((data) => {
        this.valueSection2Data = data.map(
          (item: {
            Reference_PMRA_Document_Numbers_Date: string | number | Date;
          }) => {
            // Format the date field for display
            const formattedDate = new Date(
              item.Reference_PMRA_Document_Numbers_Date
            ).toLocaleDateString();
            return {
              ...item,
              Reference_PMRA_Document_Numbers_Date: formattedDate,
            };
          }
        );
      });
    this.dataService
      .getValueSection3Data(this.submissionNumber)
      .subscribe((data) => {
        this.valueSection3Data = data;
      });
    this.dataService
      .getValueSection4Data(this.submissionNumber)
      .subscribe((data) => {
        this.valueSection4Data = data;
      });
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
        (x: { [x: string]: string }) => x['ALD Report to Generate'] == 'Value'
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

  openPopup(item?: any) {
    if (item) {
      // Editing an existing item
      this.newItem.Reference_PMRA_Document_Numbers_Date = new Date(
        item.Reference_PMRA_Document_Numbers_Date
      )
        .toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
      this.newItem.Reference_PMRA_Document_Numbers =
        item.Reference_PMRA_Document_Numbers;
      this.newItem.Comments = item.Comments;
      this.editMode = true;
      this.currentItem = item;
      this.newItem.id = item.id;
    } else {
      // Adding a new item
      this.newItem.Reference_PMRA_Document_Numbers_Date = '';
      this.newItem.Reference_PMRA_Document_Numbers = '';
      this.newItem.Comments = '';
      this.editMode = false;
      this.currentItem = null;
    }
    this.showPopup = true;
  }

  submitForm(editMode: boolean) {
    if (editMode) {
      this.dataService.editItem(this.newItem).subscribe((response) => {
        if (response) {
          this.updateLastUpdatedOn();
          // Find the index of the item being edited
          const index = this.valueSection2Data.findIndex(
            (item: { id: number }) => item.id === this.newItem.id
          );

          // Replace the item with the updated item
          this.valueSection2Data[index] = this.newItem;
          // Reset the newItem object and close the popup
          this.newItem = {
            submissionNumber:
              this.route.snapshot.paramMap.get('submissionNumber'),
            Reference_PMRA_Document_Numbers_Date: '',
            Reference_PMRA_Document_Numbers: '',
            Comments: '',
            id: 0,
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
      this.dataService.addNewItem(this.newItem).subscribe((response) => {
        if (response) {
          this.updateLastUpdatedOn();
          // Reset the newItem object and close the popup
          this.newItem = {
            submissionNumber:
              this.route.snapshot.paramMap.get('submissionNumber'),
            Reference_PMRA_Document_Numbers_Date: '',
            Reference_PMRA_Document_Numbers: '',
            Comments: '',
            id: 0,
          };

          this.valueSection2Data.push(lastitem);
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
    this.dataService.deleteItem(item.id).subscribe((response) => {
      const index = this.valueSection2Data.indexOf(item);
      if (index >= 0) {
        this.valueSection2Data.splice(index, 1);
        this.updateLastUpdatedOn();
      }
    });
  }

  openSection3Popup(item?: any) {
    if (item) {
      // Editing an existing item
      this.newSection3Item.Study_Type = item.Study_Type;
      this.newSection3Item.Document_Type = item.Document_Type;
      this.newSection3Item.PMRA_Number = item.PMRA_Number;
      this.newSection3Item.PMRA_System_Document_Location =
        item.PMRA_System_Document_Location;
      this.newSection3Item.Comments = item.Comments;
      this.editModeSection3 = true;
      this.currentSection3Item = item;
      this.newSection3Item.id = item.id;
    } else {
      // Adding a new item
      this.newSection3Item.Study_Type = '';
      this.newSection3Item.Document_Type = '';
      this.newSection3Item.PMRA_Number = 0;
      this.newSection3Item.PMRA_System_Document_Location = '';
      this.newSection3Item.Comments = '';
      this.editModeSection3 = false;
      this.currentSection3Item = null;
    }
    this.showSection3Popup = true;
  }

  submitSection3Form(editModeSection3: boolean) {
    if (editModeSection3) {
      this.dataService
        .editSection3Item(this.newSection3Item)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Find the index of the item being edited
            const index = this.valueSection3Data.findIndex(
              (item: { id: number }) => item.id === this.newSection3Item.id
            );

            // Replace the item with the updated item
            this.valueSection3Data[index] = this.newSection3Item;

            // Reset the newSection3Item object and close the popup
            this.newSection3Item = {
              submissionNumber:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Study_Type: '',
              Document_Type: '',
              PMRA_Number: 0,
              PMRA_System_Document_Location: '',
              Comments: '',
              id: 0,
            };
            this.showSection3Popup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    } else {
      this.dataService
        .addNewSection3Item(this.newSection3Item)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Reset the newSection3Item object and close the popup
            const lastitem = this.newSection3Item;
            this.newSection3Item = {
              submissionNumber:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Study_Type: '',
              Document_Type: '',
              PMRA_Number: 0,
              PMRA_System_Document_Location: '',
              Comments: '',
              id: 0,
            };
            this.valueSection3Data.push(lastitem);
            this.showSection3Popup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    }
  }

  closeSection3Popup() {
    this.showSection3Popup = false;
  }

  deleteSection3Item(item: any) {
    this.dataService.deleteSection3Item(item.id).subscribe((response) => {
      const index = this.valueSection3Data.indexOf(item);
      if (index >= 0) {
        this.valueSection3Data.splice(index, 1);
        this.updateLastUpdatedOn();
      }
    });
  }

  openSection4Popup(item?: any) {
    if (item) {
      // Editing an existing item
      this.newSection4Item.Registration_Number = item.Registration_Number;
      this.newSection4Item.Reference_PMRA_Document_Numbers =
        item.Reference_PMRA_Document_Numbers;
      this.newSection4Item.Comments = item.Comments;
      this.editModeSection4 = true;
      this.currentSection4Item = item;
      this.newSection4Item.id = item.id;
    } else {
      // Adding a new item
      this.newSection4Item.Registration_Number = 0;
      this.newSection4Item.Reference_PMRA_Document_Numbers = 0;
      this.newSection4Item.Comments = '';
      this.editModeSection4 = false;
      this.currentSection4Item = null;
    }
    this.showSection4Popup = true;
  }

  submitSection4Form(editModeSection4: boolean) {
    if (editModeSection4) {
      this.dataService
        .editSection4Item(this.newSection4Item)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Find the index of the item being edited
            const index = this.valueSection4Data.findIndex(
              (item: { id: number }) => item.id === this.newSection4Item.id
            );

            // Replace the item with the updated item
            this.valueSection4Data[index] = this.newSection4Item;

            // Reset the newSection4Item object and close the popup
            this.newSection4Item = {
              submissionNumber:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Registration_Number: 0,
              Reference_PMRA_Document_Numbers: 0,
              Comments: '',
              id: 0,
            };
            this.showSection4Popup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    } else {
      const lastitem = this.newSection4Item;
      this.dataService
        .addNewSection4Item(this.newSection4Item)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Reset the newSection4Item object and close the popup
            this.newSection4Item = {
              submissionNumber:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Registration_Number: 0,
              Reference_PMRA_Document_Numbers: 0,
              Comments: '',
              id: 0,
            };
            this.valueSection4Data.push(lastitem);
            this.showSection4Popup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    }
  }

  closeSection4Popup() {
    this.showSection4Popup = false;
  }

  deleteSection4Item(item: any) {
    this.dataService.deleteSection4Item(item.id).subscribe((response) => {
      const index = this.valueSection4Data.indexOf(item);
      if (index >= 0) {
        this.valueSection4Data.splice(index, 1);
        this.updateLastUpdatedOn();
      }
    });
  }
}
