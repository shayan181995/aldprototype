import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../DataService';

@Component({
  selector: 'demo-tox',
  templateUrl: './tox.component.html',
  styleUrls: ['./tox.component.css'],
})
export class ToxComponent implements OnInit {
  shmode!: string;
  submissionNumber!: string;
  valueData: any;

  summaryTableData: any;
  showSummaryTablePopup = false;
  editSummaryTableMode = false;
  currentSummaryTableItem: any;

  toxSectionsData: any;
  showToxSectionsPopup = false;
  editTOXSectionsMode = false;
  currentTOXSectionsItem: any;

  toxSection5Data: any;
  showToxSection5Popup = false;
  editToxSection5Mode = false;
  currentToxSection5Item: any;

  toxSection6Data: any;
  showToxSection6Popup = false;
  editToxSection6Mode = false;
  currentToxSection6Item: any;

  toxSection7Data: any;
  showToxSection7Popup = false;
  editToxSection7Mode = false;
  currentToxSection7Item: any;

  toxSection8Data: any;
  showToxSection8Popup = false;
  editToxSection8Mode = false;
  currentToxSection8Item: any;

  toxSection9Data: any;
  showToxSection9Popup = false;
  editToxSection9Mode = false;
  currentToxSection9Item: any;

  toxSection10Data: any;
  showToxSection10Popup = false;
  editToxSection10Mode = false;
  currentToxSection10Item: any;

  toxSection11Data: any;
  showToxSection11Popup = false;
  editToxSection11Mode = false;
  currentToxSection11Item: any;

  toxSections22Data: any;
  toxSections23Data: any;
  toxSections24Data: any;
  toxSections3Data: any;
  toxSections4Data: any;
  showToxSectionPopup = false;
  showToxSection22Popup = false;
  showToxSection23Popup = false;
  showToxSection24Popup = false;
  showToxSection3Popup = false;
  showToxSection4Popup = false;

  newSummaryTableItem = {
    row_id: 0,
    Submission_Number: this.route.snapshot.paramMap.get('submissionNumber'),
    CAS_Number: '',
    Exposure_Scenario: '',
    Exposure_Scenario_Subtype: '',
    Study: '',
    Point_of_Departure_and_End_Point: '',
    CAF_or_Target_MOE: 0,
    Reference_Document: '',
    PMRA_Number: '',
    ARfD_Value: '',
    ARfD_Unit: '',
    Actual_End_Date: '',
  };

  newToxSections22232434Item = {
    row_id: 0,
    Submission_Number: this.route.snapshot.paramMap.get('submissionNumber'),
    Section_Number: '',
    PCPA_Factor_Characterized: false,
    Cumulative_Risk_Assessment_Required_Flag: false,
    Cumulative_Risk_Assessment_Status: '',
    Date: '',
    Name_of_Reference_Document: '',
    Reference_Document_Table_of_Content_Reference: '',
    PMRA_Number: '',
    Comments: '',
    Reference_TOX_Review: '',
    Database_Completion_Comments: '',
    Tier_1_Studies_Comment: '',
    Reference_Dose_Submission_Number: '',
  };

  newToxSection5Item = {
    row_id: 0,
    Submission_Number: this.route.snapshot.paramMap.get('submissionNumber'),
    PMRA_Number_of_the_Record_of_Residue_Definition_Decision: '',
    List_of_Metabolites: '',
    PMRA_Number: '',
    Category: '',
  };

  newToxSection6Item = {
    row_id: 0,
    Submission_Number: this.route.snapshot.paramMap.get('submissionNumber'),
    Subsection_Number: '',
    Impurity_Contaminant_Name: '',
    Use_Site_Categories: '',
    Acceptable_Level: '',
    PMRA_Number: '',
    Name_of_Reference_Document: '',
    Comments: '',
  };

  newToxSection7Item = {
    row_id: 0,
    Submission_Number: this.route.snapshot.paramMap.get('submissionNumber'),
    Subsection_Number: '',
    Document_Type: '',
    Date: '',
    PMRA_Number: '',
    Registration_Number: '',
    Comments: '',
  };

  newToxSection8Item = {
    row_id: 0,
    Submission_Number: this.route.snapshot.paramMap.get('submissionNumber'),
    Evaluator: '',
    Date: '',
    Comments: '',
    Reference_PMRA_Document_Number: '',
    PMRA_Number: '',
  };

  newToxSection9Item = {
    row_id: 0,
    Submission_Number: this.route.snapshot.paramMap.get('submissionNumber'),
    Subsection_Name: '',
    Study_Type: '',
    Document_Type: '',
    PMRA_Number: '',
    Document_Reference: '',
    Comments: '',
  };

  newToxSection10Item = {
    row_id: 0,
    Submission_Number: this.route.snapshot.paramMap.get('submissionNumber'),
    International_Organization: '',
    Document_Title: '',
    PMRA_Number: '',
    Date_of_Publication: '',
  };

  newToxSection11Item = {
    row_id: 0,
    Submission_Number: this.route.snapshot.paramMap.get('submissionNumber'),
    Search_Conducted_By: '',
    Evaluator: '',
    Search_Conducted_Date: '',
    Search_String: '',
    PMRA_Number: '',
    Comments: '',
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
      console.log(this.valueData);
      this.valueData = this.valueData.filter(
        (x: { [x: string]: string }) => x['ALD Report to Generate'] == 'TOX'
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

    this.dataService
      .getTOXSECTIONS22232434TableData(this.submissionNumber)
      .subscribe((data) => {
        this.toxSectionsData = data.map(
          (item: {
            Submission_Number: string;
            Section_Number: string;
            PCPA_Factor_Characterized: boolean;
            Cumulative_Risk_Assessment_Required_Flag: boolean;
            Cumulative_Risk_Assessment_Status: string;
            Date: Date;
            Name_of_Reference_Document: string;
            Reference_Document_Table_of_Content_Reference: string;
            PMRA_Number: number;
            Comments: string;
            Reference_TOX_Review: string;
            Database_Completion_Comments: string;
            Tier_1_Studies_Comment: string;
            Reference_Dose_Submission_Number: string;
          }) => {
            // Format the date field for display
            const formattedDate = new Date(item.Date).toLocaleDateString();
            return {
              ...item,
              Date: formattedDate,
            };
          }
        );

        this.toxSections22Data = this.toxSectionsData.filter(
          (i: { Section_Number: number }) => i.Section_Number == 2.2
        );
        this.toxSections23Data = this.toxSectionsData.filter(
          (i: { Section_Number: number }) => i.Section_Number == 2.3
        );
        this.toxSections24Data = this.toxSectionsData.filter(
          (i: { Section_Number: number }) => i.Section_Number == 2.4
        );
        this.toxSections3Data = this.toxSectionsData.filter(
          (i: { Section_Number: number }) => i.Section_Number == 3
        );
        this.toxSections4Data = this.toxSectionsData.filter(
          (i: { Section_Number: number }) => i.Section_Number == 4
        );
      });

    this.dataService
      .getSummaryTableData(this.submissionNumber)
      .subscribe((data) => {
        this.summaryTableData = data.map(
          (item: { Actual_End_Date: string | number | Date }) => {
            // Format the date field for display
            const formattedDate = new Date(
              item.Actual_End_Date
            ).toLocaleDateString();
            return {
              ...item,
              Actual_End_Date: formattedDate,
            };
          }
        );
      });

    this.dataService
      .getTOXSECTION5TableData(this.submissionNumber)
      .subscribe((data) => {
        this.toxSection5Data = data.map(
          (item: {
            Submission_Number: string;
            PMRA_Record_Number: number;
            Metabolites_List: string;
            PMRA_Number: number;
          }) => {
            return {
              ...item,
            };
          }
        );
      });

    this.dataService
      .getTOXSECTION6TableData(this.submissionNumber)
      .subscribe((data) => {
        this.toxSection6Data = data.map(
          (item: {
            Submission_Number: string;
            Subsection_Number: string;
            Impurity_Contaminant_Name: string;
            Use_Site_Categories: string;
            Acceptable_Level: string;
            PMRA_Number: number;
            Name_of_Reference_Document: string;
            Comments: string;
          }) => {
            return {
              ...item,
            };
          }
        );
      });

    this.dataService
      .getTOXSECTION7TableData(this.submissionNumber)
      .subscribe((data) => {
        this.toxSection7Data = data.map(
          (item: {
            Submission_Number: string;
            Subsection_Number: string;
            Document_Type: string;
            Date: string | number | Date;
            PMRA_Number: number;
            Registration_Number: number;
            Comments: string;
          }) => {
            // Format the date field for display
            const formattedDate = new Date(item.Date).toLocaleDateString();
            return {
              ...item,
              Date: formattedDate,
            };
          }
        );
      });

    this.dataService
      .getTOXSECTION8TableData(this.submissionNumber)
      .subscribe((data) => {
        this.toxSection8Data = data.map(
          (item: {
            Submission_Number: string;
            Evaluator: string;
            Date: string;
            Comments: string;
            Reference_PMRA_Document_Number: number;
            PMRA_Number: number;
          }) => {
            // Format the date field for display
            const formattedDate = new Date(item.Date).toLocaleDateString();
            return {
              ...item,
              Date: formattedDate,
            };
          }
        );
      });
    this.dataService
      .getTOXSECTION9TableData(this.submissionNumber)
      .subscribe((data) => {
        this.toxSection9Data = data.map(
          (item: {
            Submission_Number: string;
            row_id: string;
            Subsection_Name: string;
            Study_Type: string;
            Document_Type: string;
            PMRA_Number: number;
            Document_Reference: string;
            Comments: string;
          }) => {
            return {
              ...item,
            };
          }
        );
      });

    this.dataService
      .getTOXSECTION10TableData(this.submissionNumber)
      .subscribe((data) => {
        this.toxSection10Data = data.map(
          (item: {
            Submission_Number: string;
            row_id: string;
            International_Organization: string;
            Document_Title: string;
            PMRA_Number: number;
            Date_of_Publication: string;
          }) => {
            // Format the date field for display
            const formattedDate = new Date(
              item.Date_of_Publication
            ).toLocaleDateString();
            return {
              ...item,
              Date_of_Publication: formattedDate,
            };
          }
        );
      });

    this.dataService
      .getTOXSECTION11TableData(this.submissionNumber)
      .subscribe((data) => {
        this.toxSection11Data = data.map(
          (item: {
            Submission_Number: string;
            row_id: string;
            Search_Conducted_By: string;
            Evaluator: string;
            Search_Conducted_Date: string;
            Search_String: string;
            PMRA_Number: number;
            Comments: string;
          }) => {
            // Format the date field for display
            const formattedDate = new Date(
              item.Search_Conducted_Date
            ).toLocaleDateString();
            return {
              ...item,
              Search_Conducted_Date: formattedDate,
            };
          }
        );
      });
  }

  openSummaryTablePopup(item?: any) {
    if (item) {
      // Editing an existing item
      this.newSummaryTableItem.CAS_Number = item.CAS_Number;
      this.newSummaryTableItem.Exposure_Scenario = item.Exposure_Scenario;
      this.newSummaryTableItem.Exposure_Scenario_Subtype =
        item.Exposure_Scenario_Subtype;
      this.newSummaryTableItem.Study = item.Study;
      this.newSummaryTableItem.Point_of_Departure_and_End_Point =
        item.Point_of_Departure_and_End_Point;
      this.newSummaryTableItem.CAF_or_Target_MOE = item.CAF_or_Target_MOE;
      this.newSummaryTableItem.Reference_Document = item.Reference_Document;
      this.newSummaryTableItem.PMRA_Number = item.PMRA_Number;
      this.newSummaryTableItem.ARfD_Value = item.ARfD_Value;
      this.newSummaryTableItem.ARfD_Unit = item.ARfD_Unit;
      this.newSummaryTableItem.row_id = item.row_id;
      this.newSummaryTableItem.Actual_End_Date = new Date(item.Actual_End_Date)
        .toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
      this.editSummaryTableMode = true;
      this.currentSummaryTableItem = this.newSummaryTableItem;
    } else {
      // Adding a new item
      this.newSummaryTableItem.CAS_Number = '';
      this.newSummaryTableItem.Exposure_Scenario = '';
      this.newSummaryTableItem.Exposure_Scenario_Subtype = '';
      this.newSummaryTableItem.Study = '';
      this.newSummaryTableItem.Point_of_Departure_and_End_Point = '';
      this.newSummaryTableItem.CAF_or_Target_MOE = 0;
      this.newSummaryTableItem.Reference_Document = '';
      this.newSummaryTableItem.PMRA_Number = '';
      this.newSummaryTableItem.ARfD_Value = '';
      this.newSummaryTableItem.ARfD_Unit = '';
      this.newSummaryTableItem.Actual_End_Date = '';
      this.editSummaryTableMode = false;
      this.currentSummaryTableItem = null;
    }
    this.showSummaryTablePopup = true;
  }

  SubmitSummaryTableForm(editSummaryTableMode: boolean) {
    if (editSummaryTableMode) {
      this.dataService
        .editSummaryTableItem(this.newSummaryTableItem)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Find the index of the item being edited
            const index = this.summaryTableData.findIndex(
              (item: { row_id: number }) =>
                item.row_id === this.newSummaryTableItem.row_id
            );
            // Replace the item with the updated item
            this.summaryTableData[index] = this.newSummaryTableItem;

            // Reset the newItem object and close the popup
            this.newSummaryTableItem = {
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              CAS_Number: '',
              Exposure_Scenario: '',
              Exposure_Scenario_Subtype: '',
              Study: '',
              Point_of_Departure_and_End_Point: '',
              CAF_or_Target_MOE: 0,
              Reference_Document: '',
              PMRA_Number: '',
              ARfD_Value: '',
              ARfD_Unit: '',
              Actual_End_Date: '',
            };
            this.showSummaryTablePopup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    } else {
      const lastitem = this.newSummaryTableItem;
      this.dataService
        .addNewSummaryTableItem(this.newSummaryTableItem)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Reset the newItem object and close the popup
            this.newSummaryTableItem = {
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              CAS_Number: '',
              Exposure_Scenario: '',
              Exposure_Scenario_Subtype: '',
              Study: '',
              Point_of_Departure_and_End_Point: '',
              CAF_or_Target_MOE: 0,
              Reference_Document: '',
              PMRA_Number: '',
              ARfD_Value: '',
              ARfD_Unit: '',
              Actual_End_Date: '',
            };
            this.summaryTableData.push(lastitem);
            this.showSummaryTablePopup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    }
  }

  closeSummaryTablePopup() {
    this.showSummaryTablePopup = false;
  }

  deleteSummaryTableItem(item: any) {
    this.dataService
      .deleteSummaryTableItem(item.row_id)
      .subscribe((response) => {
        const index = this.summaryTableData.indexOf(item);
        if (index >= 0) {
          this.summaryTableData.splice(index, 1);
          this.updateLastUpdatedOn();
        }
      });
  }

  openTOXSectionsPopup(item?: any) {
    if (item) {
      // Editing an existing item
      this.newToxSections22232434Item.Section_Number = item.Section_Number;
      this.newToxSections22232434Item.PCPA_Factor_Characterized =
        item.PCPA_Factor_Characterized;
      this.newToxSections22232434Item.Cumulative_Risk_Assessment_Required_Flag =
        item.Cumulative_Risk_Assessment_Required_Flag;
      this.newToxSections22232434Item.Cumulative_Risk_Assessment_Status =
        item.Cumulative_Risk_Assessment_Status;
      this.newToxSections22232434Item.Date = new Date(item.Date)
        .toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
      this.newToxSections22232434Item.Name_of_Reference_Document =
        item.Name_of_Reference_Document;
      this.newToxSections22232434Item.Reference_Document_Table_of_Content_Reference =
        item.Reference_Document_Table_of_Content_Reference;
      this.newToxSections22232434Item.PMRA_Number = item.PMRA_Number;
      this.newToxSections22232434Item.Comments = item.Comments;
      this.newToxSections22232434Item.Reference_TOX_Review =
        item.Reference_TOX_Review;
      this.newToxSections22232434Item.Database_Completion_Comments =
        item.Database_Completion_Comments;
      this.newToxSections22232434Item.Tier_1_Studies_Comment =
        item.Tier_1_Studies_Comment;
      this.newToxSections22232434Item.Reference_Dose_Submission_Number =
        item.Reference_Dose_Submission_Number;
      this.newToxSections22232434Item.row_id = item.row_id;
      this.editTOXSectionsMode = true;
      this.currentTOXSectionsItem = this.newToxSections22232434Item;
    } else {
      // Adding a new item
      this.newToxSections22232434Item.Section_Number = '';
      this.newToxSections22232434Item.PCPA_Factor_Characterized = false;
      this.newToxSections22232434Item.Cumulative_Risk_Assessment_Required_Flag =
        false;
      this.newToxSections22232434Item.Cumulative_Risk_Assessment_Status = '';
      this.newToxSections22232434Item.Date = '';
      this.newToxSections22232434Item.Name_of_Reference_Document = '';
      this.newToxSections22232434Item.Reference_Document_Table_of_Content_Reference =
        '';
      this.newToxSections22232434Item.PMRA_Number = '';
      this.newToxSections22232434Item.Comments = '';
      this.newToxSections22232434Item.Reference_TOX_Review = '';
      this.newToxSections22232434Item.Database_Completion_Comments = '';
      this.newToxSections22232434Item.Tier_1_Studies_Comment = '';
      this.newToxSections22232434Item.Reference_Dose_Submission_Number = '';

      this.editTOXSectionsMode = false;
      this.currentTOXSectionsItem = null;
    }
  }

  submitToxSectionsForm(editMode: boolean, Section_Number: string) {
    this.newToxSections22232434Item.Section_Number = Section_Number;
    if (editMode) {
      this.dataService
        .editTOXSECTIONS22232434TableItem(this.newToxSections22232434Item)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Find the index of the item being edited
            if (this.newToxSections22232434Item.Section_Number == '2.2') {
              const index = this.toxSections22Data.findIndex(
                (item: { row_id: number }) =>
                  item.row_id === this.newToxSections22232434Item.row_id
              );
              // Replace the item with the updated item
              this.toxSections22Data[index] = this.newToxSections22232434Item;
            } else if (
              this.newToxSections22232434Item.Section_Number == '2.3'
            ) {
              const index = this.toxSections23Data.findIndex(
                (item: { row_id: number }) =>
                  item.row_id === this.newToxSections22232434Item.row_id
              );
              // Replace the item with the updated item
              this.toxSections23Data[index] = this.newToxSections22232434Item;
            } else if (
              this.newToxSections22232434Item.Section_Number == '2.4'
            ) {
              const index = this.toxSections24Data.findIndex(
                (item: { row_id: number }) =>
                  item.row_id === this.newToxSections22232434Item.row_id
              );
              // Replace the item with the updated item
              this.toxSections24Data[index] = this.newToxSections22232434Item;
            } else if (this.newToxSections22232434Item.Section_Number == '3') {
              const index = this.toxSections3Data.findIndex(
                (item: { row_id: number }) =>
                  item.row_id === this.newToxSections22232434Item.row_id
              );
              // Replace the item with the updated item
              this.toxSections3Data[index] = this.newToxSections22232434Item;
            } else if (this.newToxSections22232434Item.Section_Number == '4') {
              const index = this.toxSections4Data.findIndex(
                (item: { row_id: number }) =>
                  item.row_id === this.newToxSections22232434Item.row_id
              );
              // Replace the item with the updated item
              this.toxSections4Data[index] = this.newToxSections22232434Item;
            }

            // Reset the newItem object and close the popup
            this.newToxSections22232434Item = {
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Section_Number: '',
              PCPA_Factor_Characterized: false,
              Cumulative_Risk_Assessment_Required_Flag: false,
              Cumulative_Risk_Assessment_Status: '',
              Date: '',
              Name_of_Reference_Document: '',
              Reference_Document_Table_of_Content_Reference: '',
              PMRA_Number: '',
              Comments: '',
              Reference_TOX_Review: '',
              Database_Completion_Comments: '',
              Tier_1_Studies_Comment: '',
              Reference_Dose_Submission_Number: '',
            };
            this.showToxSectionsPopup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    } else {
      const lastitem = this.newToxSections22232434Item;
      this.dataService
        .addNewTOXSECTIONS22232434TableItem(this.newToxSections22232434Item)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Reset the newItem object and close the popup
            this.newToxSections22232434Item = {
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Section_Number: '',
              PCPA_Factor_Characterized: false,
              Cumulative_Risk_Assessment_Required_Flag: false,
              Cumulative_Risk_Assessment_Status: '',
              Date: '',
              Name_of_Reference_Document: '',
              Reference_Document_Table_of_Content_Reference: '',
              PMRA_Number: '',
              Comments: '',
              Reference_TOX_Review: '',
              Database_Completion_Comments: '',
              Tier_1_Studies_Comment: '',
              Reference_Dose_Submission_Number: '',
            };
            if (lastitem.Section_Number == '2.2') {
              this.toxSections22Data.push(lastitem);
            } else if (lastitem.Section_Number == '2.3') {
              this.toxSections23Data.push(lastitem);
            } else if (lastitem.Section_Number == '2.4') {
              this.toxSections24Data.push(lastitem);
            } else if (lastitem.Section_Number == '3') {
              this.toxSections3Data.push(lastitem);
            } else if (lastitem.Section_Number == '4') {
              this.toxSections4Data.push(lastitem);
            }
            this.showToxSectionsPopup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    }
  }

  closeToxSectionsPopup() {
    this.showToxSectionsPopup = false;
  }

  deleteToxSectionsItem(item: any) {
    this.dataService
      .deleteTOXSECTIONS22232434TableItem(item.row_id)
      .subscribe((response) => {
        let index = this.toxSectionsData.indexOf(item);
        if (index >= 0) {
          this.toxSectionsData.splice(index, 1);
          this.updateLastUpdatedOn();
        }
        index = this.toxSections22Data.indexOf(item);
        if (index >= 0) {
          this.toxSections22Data.splice(index, 1);
          this.updateLastUpdatedOn();
        }
        index = this.toxSections23Data.indexOf(item);
        if (index >= 0) {
          this.toxSections23Data.splice(index, 1);
          this.updateLastUpdatedOn();
        }
        index = this.toxSections24Data.indexOf(item);
        if (index >= 0) {
          this.toxSections24Data.splice(index, 1);
          this.updateLastUpdatedOn();
        }
        index = this.toxSections3Data.indexOf(item);
        if (index >= 0) {
          this.toxSections3Data.splice(index, 1);
          this.updateLastUpdatedOn();
        }
        index = this.toxSections4Data.indexOf(item);
        if (index >= 0) {
          this.toxSections4Data.splice(index, 1);
          this.updateLastUpdatedOn();
        }
      });
  }

  openToxSection5Popup(item?: any) {
    if (item) {
      // Editing an existing item
      this.newToxSection5Item.PMRA_Number_of_the_Record_of_Residue_Definition_Decision =
        item.PMRA_Number_of_the_Record_of_Residue_Definition_Decision;
      this.newToxSection5Item.List_of_Metabolites = item.List_of_Metabolites;
      this.newToxSection5Item.PMRA_Number = item.PMRA_Number;
      this.newToxSection5Item.row_id = item.row_id;
      this.newToxSection5Item.Category = item.Category;
      this.editToxSection5Mode = true;
      this.currentToxSection5Item = this.newToxSection5Item;
    } else {
      this.newToxSection5Item.PMRA_Number_of_the_Record_of_Residue_Definition_Decision =
        '';
      this.newToxSection5Item.List_of_Metabolites = '';
      this.newToxSection5Item.PMRA_Number = '';
      this.editToxSection5Mode = false;
      this.currentToxSection5Item = null;
      this.newToxSection5Item.Category = '';
    }
    this.showToxSection5Popup = true;
  }

  SubmitToxSection5Form(editToxSection5Mode: boolean) {
    if (editToxSection5Mode) {
      this.dataService
        .editTOXSECTION5TableItem(this.newToxSection5Item)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Find the index of the item being edited
            const index = this.toxSection5Data.findIndex(
              (item: { row_id: number }) =>
                item.row_id === this.newToxSection5Item.row_id
            );
            // Replace the item with the updated item
            this.toxSection5Data[index] = this.newToxSection5Item;

            // Reset the newItem object and close the popup
            this.newToxSection5Item = {
              Category: '',
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              PMRA_Number_of_the_Record_of_Residue_Definition_Decision: '',
              List_of_Metabolites: '',
              PMRA_Number: '',
            };
            this.showToxSection5Popup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    } else {
      const lastitem = this.newToxSection5Item;
      this.dataService
        .addNewTOXSECTION5TableItem(this.newToxSection5Item)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Reset the newItem object and close the popup
            this.newToxSection5Item = {
              Category: '',
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              PMRA_Number_of_the_Record_of_Residue_Definition_Decision: '',
              List_of_Metabolites: '',
              PMRA_Number: '',
            };
            this.toxSection5Data.push(lastitem);
            this.showToxSection5Popup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    }
  }

  closeToxSection5Popup() {
    this.showToxSection5Popup = false;
  }

  deleteToxSection5Item(item: any) {
    this.dataService
      .deleteTOXSECTION5TableItem(item.row_id)
      .subscribe((response) => {
        const index = this.toxSection5Data.indexOf(item);
        if (index >= 0) {
          this.toxSection5Data.splice(index, 1);
          this.updateLastUpdatedOn();
        }
      });
  }

  openToxSection6Popup(item?: any) {
    if (item) {
      // Editing an existing item
      this.newToxSection6Item.Subsection_Number = item.Subsection_Number;
      this.newToxSection6Item.Impurity_Contaminant_Name =
        item.Impurity_Contaminant_Name;
      this.newToxSection6Item.Use_Site_Categories = item.Use_Site_Categories;
      this.newToxSection6Item.Acceptable_Level = item.Acceptable_Level;
      this.newToxSection6Item.PMRA_Number = item.PMRA_Number;
      this.newToxSection6Item.Name_of_Reference_Document =
        item.Name_of_Reference_Document;
      this.newToxSection6Item.Comments = item.Comments;
      this.newToxSection6Item.row_id = item.row_id;
      this.editToxSection6Mode = true;
      this.currentToxSection6Item = this.newToxSection6Item;
    } else {
      this.newToxSection6Item.Subsection_Number = '';
      this.newToxSection6Item.Impurity_Contaminant_Name = '';
      this.newToxSection6Item.Use_Site_Categories = '';
      this.newToxSection6Item.Acceptable_Level = '';
      this.newToxSection6Item.PMRA_Number = '';
      this.newToxSection6Item.Name_of_Reference_Document = '';
      this.newToxSection6Item.Comments = '';
      this.editToxSection6Mode = false;
      this.currentToxSection6Item = null;
    }
    this.showToxSection6Popup = true;
  }

  SubmitToxSection6Form(editToxSection6Mode: boolean) {
    if (editToxSection6Mode) {
      this.dataService
        .editTOXSECTION6TableItem(this.newToxSection6Item)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Find the index of the item being edited
            const index = this.toxSection6Data.findIndex(
              (item: { row_id: number }) =>
                item.row_id === this.newToxSection6Item.row_id
            );
            // Replace the item with the updated item
            this.toxSection6Data[index] = this.newToxSection6Item;

            // Reset the newItem object and close the popup
            this.newToxSection6Item = {
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Subsection_Number: '',
              Impurity_Contaminant_Name: '',
              Use_Site_Categories: '',
              Acceptable_Level: '',
              PMRA_Number: '',
              Name_of_Reference_Document: '',
              Comments: '',
            };
            this.showToxSection6Popup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    } else {
      const lastitem = this.newToxSection6Item;
      this.dataService
        .addNewTOXSECTION6TableItem(this.newToxSection6Item)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Reset the newItem object and close the popup
            this.newToxSection6Item = {
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Subsection_Number: '',
              Impurity_Contaminant_Name: '',
              Use_Site_Categories: '',
              Acceptable_Level: '',
              PMRA_Number: '',
              Name_of_Reference_Document: '',
              Comments: '',
            };
            this.toxSection6Data.push(lastitem);
            this.showToxSection6Popup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    }
  }
  closeToxSection6Popup() {
    this.showToxSection6Popup = false;
  }

  deleteToxSection6Item(item: any) {
    this.dataService
      .deleteTOXSECTION6TableItem(item.row_id)
      .subscribe((response) => {
        const index = this.toxSection6Data.indexOf(item);
        if (index >= 0) {
          this.toxSection6Data.splice(index, 1);
          this.updateLastUpdatedOn();
        }
      });
  }

  openToxSection7Popup(item?: any) {
    if (item) {
      // Editing an existing item
      this.newToxSection7Item.Subsection_Number = item.Subsection_Number;
      this.newToxSection7Item.Document_Type = item.Document_Type;
      this.newToxSection7Item.Date = new Date(item.Date)
        .toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
      this.newToxSection7Item.PMRA_Number = item.PMRA_Number;
      this.newToxSection7Item.Registration_Number = item.Registration_Number;
      this.newToxSection7Item.Comments = item.Comments;
      this.newToxSection7Item.row_id = item.row_id;
      this.editToxSection7Mode = true;
      this.currentToxSection7Item = this.newToxSection7Item;
    } else {
      this.newToxSection7Item.Subsection_Number = '';
      this.newToxSection7Item.Document_Type = '';
      this.newToxSection7Item.Date = '';
      this.newToxSection7Item.PMRA_Number = '';
      this.newToxSection7Item.Registration_Number = '';
      this.newToxSection7Item.Comments = '';
      this.editToxSection7Mode = false;
      this.currentToxSection7Item = null;
    }
    this.showToxSection7Popup = true;
  }

  SubmitToxSection7Form(editToxSection7Mode: boolean) {
    if (editToxSection7Mode) {
      this.dataService
        .editTOXSECTION7TableItem(this.newToxSection7Item)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Find the index of the item being edited
            const index = this.toxSection7Data.findIndex(
              (item: { row_id: number }) =>
                item.row_id === this.newToxSection7Item.row_id
            );
            // Replace the item with the updated item
            this.toxSection7Data[index] = this.newToxSection7Item;

            // Reset the newItem object and close the popup
            this.newToxSection7Item = {
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Subsection_Number: '',
              Document_Type: '',
              Date: '',
              PMRA_Number: '',
              Registration_Number: '',
              Comments: '',
            };
            this.showToxSection7Popup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    } else {
      const lastitem = this.newToxSection7Item;
      this.dataService
        .addNewTOXSECTION7TableItem(this.newToxSection7Item)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Reset the newItem object and close the popup
            this.newToxSection7Item = {
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Subsection_Number: '',
              Document_Type: '',
              Date: '',
              PMRA_Number: '',
              Registration_Number: '',
              Comments: '',
            };
            this.toxSection7Data.push(lastitem);
            this.showToxSection7Popup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    }
  }
  closeToxSection7Popup() {
    this.showToxSection7Popup = false;
  }
  deleteToxSection7Item(item: any) {
    this.dataService
      .deleteTOXSECTION7TableItem(item.row_id)
      .subscribe((response) => {
        const index = this.toxSection7Data.indexOf(item);
        if (index >= 0) {
          this.toxSection7Data.splice(index, 1);
          this.updateLastUpdatedOn();
        }
      });
  }

  openToxSection8Popup(item?: any) {
    if (item) {
      // Editing an existing item
      this.newToxSection8Item.Submission_Number = item.Submission_Number;
      this.newToxSection8Item.Evaluator = item.Evaluator;
      this.newToxSection8Item.Date = new Date(item.Date)
        .toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
      this.newToxSection8Item.Comments = item.Comments;
      this.newToxSection8Item.Reference_PMRA_Document_Number =
        item.Reference_PMRA_Document_Number;
      this.newToxSection8Item.PMRA_Number = item.PMRA_Number;
      this.newToxSection8Item.row_id = item.row_id;
      this.editToxSection8Mode = true;
      this.currentToxSection8Item = this.newToxSection8Item;
    } else {
      this.newToxSection8Item.Evaluator = '';
      this.newToxSection8Item.Date = '';
      this.newToxSection8Item.Comments = '';
      this.newToxSection8Item.Reference_PMRA_Document_Number = '';
      this.newToxSection8Item.PMRA_Number = '';
      this.editToxSection8Mode = false;
      this.currentToxSection8Item = null;
    }
    this.showToxSection8Popup = true;
  }

  SubmitToxSection8Form(editToxSection8Mode: boolean) {
    if (editToxSection8Mode) {
      this.dataService
        .editTOXSECTION8TableItem(this.newToxSection8Item)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Find the index of the item being edited
            const index = this.toxSection8Data.findIndex(
              (item: { row_id: number }) =>
                item.row_id === this.newToxSection8Item.row_id
            );
            // Replace the item with the updated item
            this.toxSection8Data[index] = this.newToxSection8Item;

            // Reset the newItem object and close the popup
            this.newToxSection8Item = {
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Evaluator: '',
              Date: '',
              Comments: '',
              Reference_PMRA_Document_Number: '',
              PMRA_Number: '',
            };
            this.showToxSection8Popup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    } else {
      const lastitem = this.newToxSection8Item;
      this.dataService
        .addNewTOXSECTION8TableItem(this.newToxSection8Item)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Reset the newItem object and close the popup
            this.newToxSection8Item = {
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Evaluator: '',
              Date: '',
              Comments: '',
              Reference_PMRA_Document_Number: '',
              PMRA_Number: '',
            };
            this.toxSection8Data.push(lastitem);
            this.showToxSection8Popup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    }
  }

  closeToxSection8Popup() {
    this.showToxSection8Popup = false;
  }

  deleteToxSection8Item(item: any) {
    this.dataService
      .deleteTOXSECTION8TableItem(item.row_id)
      .subscribe((response) => {
        const index = this.toxSection8Data.indexOf(item);
        if (index >= 0) {
          this.toxSection8Data.splice(index, 1);
          this.updateLastUpdatedOn();
        }
      });
  }

  openToxSection9Popup(item?: any) {
    if (item) {
      // Editing an existing item
      this.newToxSection9Item.Subsection_Name = item.Subsection_Name;
      this.newToxSection9Item.Study_Type = item.Study_Type;
      this.newToxSection9Item.Document_Type = item.Document_Type;
      this.newToxSection9Item.PMRA_Number = item.PMRA_Number;
      this.newToxSection9Item.Document_Reference = item.Document_Reference;
      this.newToxSection9Item.Comments = item.Comments;
      this.newToxSection9Item.row_id = item.row_id;
      this.editToxSection9Mode = true;
      this.currentToxSection9Item = this.newToxSection9Item;
    } else {
      this.newToxSection9Item.Subsection_Name = '';
      this.newToxSection9Item.Study_Type = '';
      this.newToxSection9Item.Document_Type = '';
      this.newToxSection9Item.PMRA_Number = '';
      this.newToxSection9Item.Document_Reference = '';
      this.newToxSection9Item.Comments = '';
      this.editToxSection9Mode = false;
      this.currentToxSection9Item = null;
    }
    this.showToxSection9Popup = true;
  }

  SubmitToxSection9Form(editToxSection9Mode: boolean) {
    if (editToxSection9Mode) {
      this.dataService
        .editTOXSECTION9TableItem(this.newToxSection9Item)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Find the index of the item being edited
            const index = this.toxSection9Data.findIndex(
              (item: { row_id: number }) =>
                item.row_id === this.newToxSection9Item.row_id
            );
            // Replace the item with the updated item
            this.toxSection9Data[index] = this.newToxSection9Item;

            // Reset the newItem object and close the popup
            this.newToxSection9Item = {
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Subsection_Name: '',
              Study_Type: '',
              Document_Type: '',
              PMRA_Number: '',
              Document_Reference: '',
              Comments: '',
            };
            this.showToxSection9Popup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    } else {
      const lastitem = this.newToxSection9Item;
      this.dataService
        .addNewTOXSECTION9TableItem(this.newToxSection9Item)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Reset the newItem object and close the popup
            this.newToxSection9Item = {
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Subsection_Name: '',
              Study_Type: '',
              Document_Type: '',
              PMRA_Number: '',
              Document_Reference: '',
              Comments: '',
            };
            this.toxSection9Data.push(lastitem);
            this.showToxSection9Popup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    }
  }
  closeToxSection9Popup() {
    this.showToxSection9Popup = false;
  }
  deleteToxSection9Item(item: any) {
    this.dataService
      .deleteTOXSECTION9TableItem(item.row_id)
      .subscribe((response) => {
        const index = this.toxSection9Data.indexOf(item);
        if (index >= 0) {
          this.toxSection9Data.splice(index, 1);
          this.updateLastUpdatedOn();
        }
      });
  }
  openToxSection10Popup(item?: any) {
    if (item) {
      // Editing an existing item
      this.newToxSection10Item.row_id = item.row_id;
      this.newToxSection10Item.International_Organization =
        item.International_Organization;
      this.newToxSection10Item.Document_Title = item.Document_Title;
      this.newToxSection10Item.PMRA_Number = item.PMRA_Number;
      this.newToxSection10Item.Date_of_Publication = new Date(
        item.Date_of_Publication
      )
        .toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
      this.editToxSection10Mode = true;
      this.currentToxSection10Item = this.newToxSection10Item;
    } else {
      this.newToxSection10Item.row_id = 0;
      this.newToxSection10Item.International_Organization = '';
      this.newToxSection10Item.Document_Title = '';
      this.newToxSection10Item.PMRA_Number = '';
      this.newToxSection10Item.Date_of_Publication = '';
      this.editToxSection10Mode = false;
      this.currentToxSection10Item = null;
    }
    this.showToxSection10Popup = true;
  }

  SubmitToxSection10Form(editToxSection10Mode: boolean) {
    if (editToxSection10Mode) {
      this.dataService
        .editTOXSECTION10TableItem(this.newToxSection10Item)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Find the index of the item being edited
            const index = this.toxSection10Data.findIndex(
              (item: { row_id: number }) =>
                item.row_id === this.newToxSection10Item.row_id
            );
            // Replace the item with the updated item
            this.toxSection10Data[index] = this.newToxSection10Item;

            // Reset the newItem object and close the popup
            this.newToxSection10Item = {
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              International_Organization: '',
              Document_Title: '',
              PMRA_Number: '',
              Date_of_Publication: '',
            };
            this.showToxSection10Popup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    } else {
      const lastitem = this.newToxSection10Item;
      this.dataService
        .addNewTOXSECTION10TableItem(this.newToxSection10Item)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Reset the newItem object and close the popup
            this.newToxSection10Item = {
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              International_Organization: '',
              Document_Title: '',
              PMRA_Number: '',
              Date_of_Publication: '',
            };
            this.toxSection10Data.push(lastitem);
            this.showToxSection10Popup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    }
  }
  closeToxSection10Popup() {
    this.showToxSection10Popup = false;
  }
  deleteToxSection10Item(item: any) {
    this.dataService
      .deleteTOXSECTION10TableItem(item.row_id)
      .subscribe((response) => {
        const index = this.toxSection10Data.indexOf(item);
        if (index >= 0) {
          this.toxSection10Data.splice(index, 1);
          this.updateLastUpdatedOn();
        }
      });
  }

  openToxSection11Popup(item?: any) {
    if (item) {
      // Editing an existing item
      this.newToxSection11Item.Submission_Number = item.Submission_Number;
      this.newToxSection11Item.row_id = item.row_id;
      this.newToxSection11Item.Search_Conducted_By = item.Search_Conducted_By;
      this.newToxSection11Item.Evaluator = item.Evaluator;
      this.newToxSection11Item.Search_Conducted_Date = new Date(
        item.Search_Conducted_Date
      )
        .toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
      this.newToxSection11Item.Search_String = item.Search_String;
      this.newToxSection11Item.PMRA_Number = item.PMRA_Number;
      this.newToxSection11Item.Comments = item.Comments;
      this.editToxSection11Mode = true;
      this.currentToxSection11Item = this.newToxSection11Item;
    } else {
      this.newToxSection11Item.row_id = 0;
      this.newToxSection11Item.Search_Conducted_By = '';
      this.newToxSection11Item.Evaluator = '';
      this.newToxSection11Item.Search_Conducted_Date = '';
      this.newToxSection11Item.Search_String = '';
      this.newToxSection11Item.PMRA_Number = '';
      this.newToxSection11Item.Comments = '';
      this.editToxSection11Mode = false;
      this.currentToxSection11Item = null;
    }
    this.showToxSection11Popup = true;
  }

  SubmitToxSection11Form(editToxSection11Mode: boolean) {
    if (editToxSection11Mode) {
      this.dataService
        .editTOXSECTION11TableItem(this.newToxSection11Item)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Find the index of the item being edited
            const index = this.toxSection11Data.findIndex(
              (item: { row_id: number }) =>
                item.row_id === this.newToxSection11Item.row_id
            );
            // Replace the item with the updated item
            this.toxSection11Data[index] = this.newToxSection11Item;

            // Reset the newItem object and close the popup
            this.newToxSection11Item = {
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Search_Conducted_By: '',
              Evaluator: '',
              Search_Conducted_Date: '',
              Search_String: '',
              PMRA_Number: '',
              Comments: '',
            };
            this.showToxSection11Popup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    } else {
      const lastitem = this.newToxSection11Item;
      this.dataService
        .addNewTOXSECTION11TableItem(this.newToxSection11Item)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Reset the newItem object and close the popup
            this.newToxSection11Item = {
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Search_Conducted_By: '',
              Evaluator: '',
              Search_Conducted_Date: '',
              Search_String: '',
              PMRA_Number: '',
              Comments: '',
            };
            this.toxSection11Data.push(lastitem);
            this.showToxSection11Popup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    }
  }
  closeToxSection11Popup() {
    this.showToxSection11Popup = false;
  }

  deleteToxSection11Item(item: any) {
    this.dataService
      .deleteTOXSECTION11TableItem(item.row_id)
      .subscribe((response) => {
        const index = this.toxSection11Data.indexOf(item);
        if (index >= 0) {
          this.toxSection11Data.splice(index, 1);
          this.updateLastUpdatedOn();
        }
      });
  }
}
