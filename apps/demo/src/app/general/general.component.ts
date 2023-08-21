import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../DataService';

@Component({
  selector: 'demo-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css'],
})
export class GeneralComponent implements OnInit {
  shmode!: string;
  submissionNumber!: string;
  valueData: any;

  showGenInfoSection2Popup = false;
  editGenInfoSection2Mode = false;
  currentGenInfoSection2Item: any;
  genInfoSection2Data: any;

  showGenInfoSection31Popup = false;
  showGenInfoSection32Popup = false;
  showGenInfoSection33Popup = false;
  editGenInfoSection3Mode = false;
  currentGenInfoSection3Item: any;
  genInfoSection3Data: any;
  genInfoSection31Data: any;
  genInfoSection32Data: any;
  genInfoSection33Data: any;

  genInfoTGAIRegistrantsListData: any;
  editGenInfoRegistrantsMode = false;
  currentGenInfoRegistrantsItem: any;
  showGenInfoRegistrantsPopup = false;

  genInfoRegulatorsData: any;
  editGenInfoRegulatorsMode = false;
  currentGenInfoRegulatorsItem: any;
  showGenInfoRegulatorsPopup = false;

  genInfoBackgroundData: any;
  editGenInfoBackgroundMode = false;
  currentGenInfoBackgroundItem: any;
  showGenInfoBackgroundPopup = false;

  genInfoEPMarketingData: any;
  editGenInfoEPMarketingMode = false;
  currentGenInfoEPMarketingItem: any;
  showGenInfoEPMarketingPopup = false;

  genInfoComplianceData: any;
  editGenInfoComplianceMode = false;
  currentGenInfoComplianceItem: any;
  showGenInfoCompliancePopup = false;

  genInfoInfoLineData: any;
  editGenInfoInfoLineMode = false;
  currentGenInfoInfoLineItem: any;
  showGenInfoInfoLinePopup = false;

  genInfoTGAI_EP_UnfulfilledConditionsData: any;
  editGenInfoTGAI_EP_UnfulfilledConditionsMode = false;
  currentGenInfoTGAI_EP_UnfulfilledConditionsItem: any;
  showGenInfoTGAI_EP_UnfulfilledConditionsPopup = false;

  genInfoScienceTeamALDsData: any;
  editGenInfoScienceTeamALDsMode = false;
  currentGenInfoScienceTeamALDsItem: any;
  showGenInfoScienceTeamALDsPopup = false;

  newGenInfoScienceTeamALDsItem = {
    Submission_Number: this.route.snapshot.paramMap.get('submissionNumber'),
    row_id: 0,
    TOX: 'N/A',
    TOX_Details: '',
    Dietary: 'N/A',
    Dietary_Details: '',
    Occupational: 'N/A',
    Occupational_Details: '',
    IRP: 'N/A',
    IRP_Details: '',
    RRS: 'N/A',
    RRS_Details: '',
    EAD: 'N/A',
    EAD_Details: '',
    EAD_WM: 'N/A',
    EAD_WM_Details: '',
    VALUE: 'N/A',
    VALUE_Details: '',
    CES: 'N/A',
    CES_Details: '',
  };

  newGenInfoTGAI_EP_UnfulfilledConditionsItem = {
    Submission_Number: this.route.snapshot.paramMap.get('submissionNumber'),
    row_id: 0,
    State: false,
    TGAI_EP_MA: '',
    Registration_Number: 0,
    PMRA_Number: 0,
    Due_date: '',
    DACO_Number: '',
    Unfulfilled_Requirements: '',
  };

  newGenInfoComplianceItem = {
    Submission_Number: this.route.snapshot.paramMap.get('submissionNumber'),
    row_id: 0,
    Sector: '',
    PCPA_Contravention: '',
    Date_Of_Reported_Contravention: '',
    Product_Description: '',
    Corrective_Action_Taken: '',
    Compliance_Status: '',
    Additional_Information: '',
  };

  newGenInfoInfoLineItem = {
    Submission_Number: this.route.snapshot.paramMap.get('submissionNumber'),
    row_id: 0,
    Date_Received: '',
    Comments_Received: '',
  };
  newGenInfoEPMarketingItem = {
    Submission_Number: this.route.snapshot.paramMap.get('submissionNumber'),
    Restrictions: 'No',
    Registration_Number: 0,
    Product_Name: '',
    Historical: false,
    Current: false,
    From_Submission_Number: '',
    row_id: 0,
  };

  newGenInfoBackgroundItem = {
    row_id: 0,
    Submission_Number: this.route.snapshot.paramMap.get('submissionNumber'),
    Subsection_Name: '',
    Subsection_ID: '',
    Conducted: false,
    Submission_Status_Level: '',
    Submission_Status_Activity: '',
    PMRA_Number: 0,
    Purpose: '',
  };

  newGenInfoRegulatorsItem = {
    row_id: 0,
    Submission_Number: this.route.snapshot.paramMap.get('submissionNumber'),
    Regulator: '',
    Status_of_Active_Ingredient: '',
    Status_date: '',
    Comments: '',
  };

  newGenInfoSection2Item = {
    row_id: 0,
    Submission_Number: this.route.snapshot.paramMap.get('submissionNumber'),
    Subsection_Name: '',
    Active_Code: '',
    Active_Name: '',
    CAS_Number: '',
  };

  newGenInfoSection3Item = {
    row_id: 0,
    Submission_Number: this.route.snapshot.paramMap.get('submissionNumber'),
    Subsection_Name: '',
    First_Registered_Date: '',
    First_Registration_Submission_Number: '',
    First_Registration_Submission_Type: '',
    Registration_Number: '',
    Registration_Status: '',
    Associated_Publication_RDD: '',
    PMRA_Number_RDD: '',
    Date_of_SMC2_BN_for_RDD: '',
    Re_Evaluation_Status: '',
    Last_Status_Update_Date: '',
    Re_Evaluation_Submission_Number: '',
    Re_Evaluation_Submission_Category: '',
    Re_Evaluation_Submission_Type: '',
    Scoping_Document_PMRA_Number: '',
    Category: '',
    Associated_Publication_PRVD: '',
    PMRA_Number_PRVD: '',
    Date_of_SMC2_BN_for_PRVD: '',
    PMRA_Number_SMC2_PRVD: '',
    Associated_Publication_RVD: '',
    PMRA_Number_RVD: '',
    Date_of_SMC2_BN_for_RVD: '',
    PMRA_Number_SMC2_RVD: '',
    Special_Review_Status_Status: '',
    Special_Review_Last_Status_Update_Date: '',
    Special_Review_Submission_Number: '',
    Special_Review_Submission_Category: '',
    Special_Review_Submission_Type: '',
    Preliminary_Analysis_PMRA_Document_Number: '',
    Trigger: '',
    Associated_Publication_PSR: '',
    PMRA_Number_PSR: '',
    Date_of_SMC2_BN_for_PSR: '',
    PMRA_Number_SMC2_PSR: '',
    Associated_Publication_SRD: '',
    PMRA_Number_SRD: '',
    Date_of_SMC2_BN_for_SRD: '',
    PMRA_Number_SMC2_SRD: '',
  };

  newGenInfoRegistrantsItem = {
    row_id: 0,
    Submission_Number: this.route.snapshot.paramMap.get('submissionNumber'),
    Registrant_Name: '',
    Registrant_Assigned_Code: '',
    Registrant_Assigned_Number: '',
    Registration_Number: '',
    Date_First_Registered: '',
    Initial_Submission_Category: '',
    Initial_Submission_Type: '',
    USC_List: 0,
    Registration_Status: 'Registered',
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
          this.newApprovalItem.Feedback == 'Approved'
            ? (this.valueData['flag'] = 1)
            : (this.valueData['flag'] = 0);
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
          x['ALD Report to Generate'] == 'General Info'
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
      .getGenInfo_SECTION_2_TableItem(this.submissionNumber)
      .subscribe((data) => {
        this.genInfoSection2Data = data.map(
          (item: {
            Submission_Number: string;
            row_id: string;
            Subsection_Name: string;
            Active_Code: string;
            Active_Name: string;
            CAS_Number: string;
          }) => {
            return {
              ...item,
            };
          }
        );
      });
    this.dataService
      .getGenInfo_SECTION_3_TableItem(this.submissionNumber)
      .subscribe((data) => {
        this.genInfoSection3Data = data.map(
          (item: {
            Submission_Number: string;
            row_id: number;
            Subsection_Name: string;
            First_Registered_Date: string;
            First_Registration_Submission_Number: string;
            First_Registration_Submission_Type: string;
            Registration_Number: string;
            Registration_Status: string;
            Associated_Publication_RDD: string;
            PMRA_Number_RDD: string;
            Date_of_SMC2_BN_for_RDD: string;
            Re_Evaluation_Status: string;
            Last_Status_Update_Date: string;
            Re_Evaluation_Submission_Number: string;
            Re_Evaluation_Submission_Category: string;
            Re_Evaluation_Submission_Type: string;
            Scoping_Document_PMRA_Number: string;
            Category: string;
            Associated_Publication_PRVD: string;
            PMRA_Number_PRVD: string;
            Date_of_SMC2_BN_for_PRVD: string;
            PMRA_Number_SMC2_PRVD: string;
            Associated_Publication_RVD: string;
            PMRA_Number_RVD: string;
            Date_of_SMC2_BN_for_RVD: Date;
            PMRA_Number_SMC2_RVD: string;
            Special_Review_Status_Status: string;
            Special_Review_Last_Status_Update_Date: string;
            Special_Review_Submission_Number: string;
            Special_Review_Submission_Category: string;
            Special_Review_Submission_Type: string;
            Preliminary_Analysis_PMRA_Document_Number: string;
            Trigger: string;
            Associated_Publication_PSR: string;
            PMRA_Number_PSR: string;
            Date_of_SMC2_BN_for_PSR: Date;
            PMRA_Number_SMC2_PSR: string;
            Associated_Publication_SRD: string;
            PMRA_Number_SRD: string;
            Date_of_SMC2_BN_for_SRD: string;
            PMRA_Number_SMC2_SRD: string;
          }) => {
            // Parse and format date fields
            const formattedItem = {
              ...item,
              Date_of_SMC2_BN_for_RVD: item.Date_of_SMC2_BN_for_RVD
                ? new Date(item.Date_of_SMC2_BN_for_RVD).toLocaleDateString()
                : '',
              First_Registered_Date: item.First_Registered_Date
                ? new Date(item.First_Registered_Date).toLocaleDateString()
                : '',
              Date_of_SMC2_BN_for_RDD: item.Date_of_SMC2_BN_for_RDD
                ? new Date(item.Date_of_SMC2_BN_for_RDD).toLocaleDateString()
                : '',
              Last_Status_Update_Date: item.Last_Status_Update_Date
                ? new Date(item.Last_Status_Update_Date).toLocaleDateString()
                : '',
              Date_of_SMC2_BN_for_PRVD: item.Date_of_SMC2_BN_for_PRVD
                ? new Date(item.Date_of_SMC2_BN_for_PRVD).toLocaleDateString()
                : '',
              Date_of_SMC2_BN_for_PSR: item.Date_of_SMC2_BN_for_PSR
                ? new Date(item.Date_of_SMC2_BN_for_PSR).toLocaleDateString()
                : '',
              Date_of_SMC2_BN_for_SRD: item.Date_of_SMC2_BN_for_SRD
                ? new Date(item.Date_of_SMC2_BN_for_SRD).toLocaleDateString()
                : '',
              Special_Review_Last_Status_Update_Date:
                item.Special_Review_Last_Status_Update_Date
                  ? new Date(
                      item.Special_Review_Last_Status_Update_Date
                    ).toLocaleDateString()
                  : '',
            };
            return formattedItem;
          }
        );
        this.genInfoSection31Data = this.genInfoSection3Data.filter(
          (i: { Subsection_Name: string }) =>
            i.Subsection_Name == 'Initial TGAI registration'
        );
        this.genInfoSection32Data = this.genInfoSection3Data.filter(
          (i: { Subsection_Name: string }) =>
            i.Subsection_Name == 'Completed (i-Done) or Open Re-evaluation'
        );
        this.genInfoSection33Data = this.genInfoSection3Data.filter(
          (i: { Subsection_Name: string }) =>
            i.Subsection_Name == 'Completed (i-Done) or Open Special Review'
        );
      });
    this.dataService
      .getGenInfo_TGAI_REGISTRANTS_LIST_TableItem(this.submissionNumber)
      .subscribe((data) => {
        this.genInfoTGAIRegistrantsListData = data.map(
          (item: {
            Submission_Number: string;
            Registrant_Name: string;
            Registrant_Assigned_Code: string;
            Registrant_Assigned_Number: string;
            Registration_Number: string;
            Date_First_Registered: Date;
            Initial_Submission_Category: string;
            Initial_Submission_Type: string;
            USC_List: number;
            Registration_Status: string;
            Comments: string;
          }) => {
            const formattedDate =item.Date_First_Registered
                ? new Date(item.Date_First_Registered).toLocaleDateString()
                : '';
            return {
              ...item,
              Date_First_Registered: formattedDate,
            };
          }
        );
      });

    this.dataService
      .getGenInfo_REGULATORS_TableItem(this.submissionNumber)
      .subscribe((data) => {
        this.genInfoRegulatorsData = data.map(
          (item: {
            Submission_Number: string;
            Regulator: string;
            Status_of_Active_Ingredient: string;
            Status_date: Date;
            Comments: string;
          }) => {
            const formattedDate =item.Status_date
            ? new Date(item.Status_date).toLocaleDateString()
            : '';
            return {
              ...item,
              Status_date: formattedDate,
            };
          }
        );
      });

    this.dataService
      .getGenInfo_BACKGROUND_TableItems(this.submissionNumber)
      .subscribe((data) => {
        this.genInfoBackgroundData = data.map(
          (item: {
            Submission_Number: string;
            row_id: string;
            Subsection_Name: string;
            Subsection_ID: string;
            Conducted: boolean;
            Submission_Status_Level: string;
            Submission_Status_Activity: string;
            PMRA_Number: number;
            Purpose: string;
          }) => {
            return {
              ...item,
            };
          }
        );
      });

    this.dataService
      .getGenInfo_EP_MARKETING_TableItem(this.submissionNumber)
      .subscribe((data) => {
        this.genInfoEPMarketingData = data.map(
          (item: {
            Submission_Number: string;
            Restrictions: string;
            Registration_Number: number;
            Product_Name: string;
            Historical: boolean;
            Current: boolean;
            From_Submission_Number: string;
          }) => {
            return {
              ...item,
            };
          }
        );
      });

    this.dataService
      .getGenInfo_ROEB_COMPLIANCE_AUDIT_TRAIL_TableItem(this.submissionNumber)
      .subscribe((data) => {
        this.genInfoComplianceData = data.map(
          (item: {
            Submission_Number: string;
            row_id: number;
            Sector: string;
            PCPA_Contravention: string;
            Date_Of_Reported_Contravention: Date;
            Product_Description_At_Time_Of_Contravention: string;
            Corrective_Action_Taken: string;
            Compliance_Status_Of_Registrant_At_Time_Of_Contravention: string;
            Additional_Information: string;
          }) => {
            const formattedDate =item.Date_Of_Reported_Contravention
            ? new Date(item.Date_Of_Reported_Contravention).toLocaleDateString()
            : '';
            return {
              ...item,
              Date_Of_Reported_Contravention: formattedDate,
              Compliance_Status:
                item.Compliance_Status_Of_Registrant_At_Time_Of_Contravention,
              Product_Description:
                item.Product_Description_At_Time_Of_Contravention,
            };
          }
        );
      });

    this.dataService
      .getGenInfo_INFO_LINE_TableItem(this.submissionNumber)
      .subscribe((data) => {
        this.genInfoInfoLineData = data.map(
          (item: {
            Submission_Number: string;
            row_id: number;
            Date_Received: Date;
            Comments_Received: string;
          }) => {
            const formattedDate =item.Date_Received
            ? new Date(item.Date_Received).toLocaleDateString()
            : '';
            return {
              ...item,
              Date_Received: formattedDate,
            };
          }
        );
      });

    this.dataService
      .getGenInfo_TGAI_EP_UNFULFILLED_CONDITIONS_TableItem(
        this.submissionNumber
      )
      .subscribe((data) => {
        this.genInfoTGAI_EP_UnfulfilledConditionsData = data.map(
          (item: {
            Submission_Number: string;
            row_id: number;
            State: boolean;
            TGAI_EP_MA: string;
            Registration_Number: number;
            PMRA_Number: number;
            Due_date: Date;
            DACO_Number: string;
            Unfulfilled_Requirements: string;
          }) => {
            const formattedDate =item.Due_date
            ? new Date(item.Due_date).toLocaleDateString()
            : '';
            return {
              ...item,
              Due_date: formattedDate,
            };
          }
        );
      });

    this.dataService
      .getGenInfo_SCIENCE_TEAM_ALDs_TableItem(this.submissionNumber)
      .subscribe((data) => {
        this.genInfoScienceTeamALDsData = data.map(
          (item: {
            Submission_Number: string;
            row_id: number;
            TOX: 'Yes' | 'No' | 'N/A';
            TOX_Details: string;
            Dietary: 'Yes' | 'No' | 'N/A';
            Dietary_Details: string;
            Occupational: 'Yes' | 'No' | 'N/A';
            Occupational_Details: string;
            IRP: 'Yes' | 'No' | 'N/A';
            IRP_Details: string;
            RRS: 'Yes' | 'No' | 'N/A';
            RRS_Details: string;
            EAD: 'Yes' | 'No' | 'N/A';
            EAD_Details: string;
            'EAD-WM': 'Yes' | 'No' | 'N/A';
            EAD_WM_Details: string;
            VALUE: 'Yes' | 'No' | 'N/A';
            VALUE_Details: string;
            CES: 'Yes' | 'No' | 'N/A';
            CES_Details: string;
          }) => {
            return {
              ...item,
              EAD_WM: item['EAD-WM'],
            };
          }
        );
      });
  }

  openGenInfoSection2Popup(item?: any) {
    if (item) {
      // Editing an existing item
      this.newGenInfoSection2Item.Subsection_Name = item.Subsection_Name;
      this.newGenInfoSection2Item.Active_Code = item.Active_Code;
      this.newGenInfoSection2Item.Active_Name = item.Active_Name;
      this.newGenInfoSection2Item.CAS_Number = item.CAS_Number;
      this.newGenInfoSection2Item.row_id = item.row_id;
      this.editGenInfoSection2Mode = true;
      this.currentGenInfoSection2Item = this.newGenInfoSection2Item;
    } else {
      this.newGenInfoSection2Item.Subsection_Name = '';
      this.newGenInfoSection2Item.Active_Code = '';
      this.newGenInfoSection2Item.Active_Name = '';
      this.newGenInfoSection2Item.CAS_Number = '';
      this.editGenInfoSection2Mode = false;
      this.currentGenInfoSection2Item = '';
    }
    this.showGenInfoSection2Popup = true;
  }

  submitGenInfoSection2Form(editGenInfoSection2Mode: boolean) {
    if (editGenInfoSection2Mode) {
      this.dataService
        .editGenInfo_SECTION_2_TableItem(this.newGenInfoSection2Item)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Find the index of the item being edited
            const index = this.genInfoSection2Data.findIndex(
              (item: { row_id: number }) =>
                item.row_id === this.newGenInfoSection2Item.row_id
            );
            // Replace the item with the updated item
            this.genInfoSection2Data[index] = this.newGenInfoSection2Item;

            // Reset the newItem object and close the popup
            this.newGenInfoSection2Item = {
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Subsection_Name: '',
              Active_Code: '',
              Active_Name: '',
              CAS_Number: '',
            };
            this.showGenInfoSection2Popup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    } else {
      const lastitem = this.newGenInfoSection2Item;
      this.dataService
        .addNewGenInfo_SECTION_2_TableItem(this.newGenInfoSection2Item)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Reset the newItem object and close the popup
            this.newGenInfoSection2Item = {
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Subsection_Name: '',
              Active_Code: '',
              Active_Name: '',
              CAS_Number: '',
            };
            this.genInfoSection2Data.push(lastitem);
            this.showGenInfoSection2Popup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    }
  }

  closeGenInfoSection2Popup() {
    this.showGenInfoSection2Popup = false;
  }

  deleteGenInfoSection2Item(item: any) {
    this.dataService
      .deleteGenInfo_SECTION_2_TableItem(item.row_id)
      .subscribe((response) => {
        const index = this.genInfoSection2Data.indexOf(item);
        if (index >= 0) {
          this.genInfoSection2Data.splice(index, 1);
          this.updateLastUpdatedOn();
        }
      });
  }
  openGenInfoSection3Popup(item?: any) {
    if (item) {
      this.newGenInfoSection3Item.row_id = item.row_id;
      this.newGenInfoSection3Item.Subsection_Name = item.Subsection_Name;
      this.newGenInfoSection3Item.First_Registered_Date = item.First_Registered_Date?new Date(
        item.First_Registered_Date
      )
        .toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2'):'';
      this.newGenInfoSection3Item.First_Registration_Submission_Number =
        item.First_Registration_Submission_Number;
      this.newGenInfoSection3Item.First_Registration_Submission_Type =
        item.First_Registration_Submission_Type;
      this.newGenInfoSection3Item.Registration_Number =
        item.Registration_Number;
      this.newGenInfoSection3Item.Registration_Status =
        item.Registration_Status;
      this.newGenInfoSection3Item.Associated_Publication_RDD =
        item.Associated_Publication_RDD;
      this.newGenInfoSection3Item.PMRA_Number_RDD = item.PMRA_Number_RDD;
      this.newGenInfoSection3Item.Date_of_SMC2_BN_for_RDD =item.Date_of_SMC2_BN_for_RDD ? new Date(
        item.Date_of_SMC2_BN_for_RDD
      )
        .toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2'):'';
      this.newGenInfoSection3Item.Re_Evaluation_Status =
        item.Re_Evaluation_Status;
      this.newGenInfoSection3Item.Last_Status_Update_Date = item.Last_Status_Update_Date?new Date(
        item.Last_Status_Update_Date
      )
        .toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2'):'';
      this.newGenInfoSection3Item.Re_Evaluation_Submission_Number =
        item.Re_Evaluation_Submission_Number;
      this.newGenInfoSection3Item.Re_Evaluation_Submission_Category =
        item.Re_Evaluation_Submission_Category;
      this.newGenInfoSection3Item.Re_Evaluation_Submission_Type =
        item.Re_Evaluation_Submission_Type;
      this.newGenInfoSection3Item.Scoping_Document_PMRA_Number =
        item.Scoping_Document_PMRA_Number;
      this.newGenInfoSection3Item.Category = item.Category;
      this.newGenInfoSection3Item.Associated_Publication_PRVD =
        item.Associated_Publication_PRVD;
      this.newGenInfoSection3Item.PMRA_Number_PRVD = item.PMRA_Number_PRVD;
      this.newGenInfoSection3Item.Date_of_SMC2_BN_for_PRVD = item.Date_of_SMC2_BN_for_PRVD? new Date(
        item.Date_of_SMC2_BN_for_PRVD
      )
        .toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2'):'';
      this.newGenInfoSection3Item.PMRA_Number_SMC2_PRVD =
        item.PMRA_Number_SMC2_PRVD;
      this.newGenInfoSection3Item.Associated_Publication_RVD =
        item.Associated_Publication_RVD;
      this.newGenInfoSection3Item.PMRA_Number_RVD = item.PMRA_Number_RVD;
      this.newGenInfoSection3Item.Date_of_SMC2_BN_for_RVD = item.Date_of_SMC2_BN_for_RVD?new Date(
        item.Date_of_SMC2_BN_for_RVD
      )
        .toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2'):'';
      this.newGenInfoSection3Item.PMRA_Number_SMC2_RVD =
        item.PMRA_Number_SMC2_RVD;
      this.newGenInfoSection3Item.Special_Review_Status_Status =
        item.Special_Review_Status_Status;
      this.newGenInfoSection3Item.Special_Review_Last_Status_Update_Date =item.Special_Review_Last_Status_Update_Date?
        new Date(item.Special_Review_Last_Status_Update_Date)
          .toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2'):'';
      this.newGenInfoSection3Item.Special_Review_Submission_Number =
        item.Special_Review_Submission_Number;
      this.newGenInfoSection3Item.Special_Review_Submission_Category =
        item.Special_Review_Submission_Category;
      this.newGenInfoSection3Item.Special_Review_Submission_Type =
        item.Special_Review_Submission_Type;
      this.newGenInfoSection3Item.Preliminary_Analysis_PMRA_Document_Number =
        item.Preliminary_Analysis_PMRA_Document_Number;
      this.newGenInfoSection3Item.Associated_Publication_PSR =
        item.Associated_Publication_PSR;
      this.newGenInfoSection3Item.PMRA_Number_PSR = item.PMRA_Number_PSR;
      this.newGenInfoSection3Item.Date_of_SMC2_BN_for_PSR = item.Date_of_SMC2_BN_for_PSR?new Date(
        item.Date_of_SMC2_BN_for_PSR
      )
        .toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2'):'';
      this.newGenInfoSection3Item.PMRA_Number_SMC2_PSR =
        item.PMRA_Number_SMC2_PSR;
      this.newGenInfoSection3Item.Associated_Publication_SRD =
        item.Associated_Publication_SRD;
      this.newGenInfoSection3Item.PMRA_Number_SRD = item.PMRA_Number_SRD;
      this.newGenInfoSection3Item.Date_of_SMC2_BN_for_SRD = item.Date_of_SMC2_BN_for_SRD?new Date(
        item.Date_of_SMC2_BN_for_SRD
      )
        .toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2'):'';
      this.newGenInfoSection3Item.PMRA_Number_SMC2_SRD =
        item.PMRA_Number_SMC2_SRD;
      this.editGenInfoSection3Mode = true;
      this.currentGenInfoSection3Item = this.newGenInfoSection3Item;
    } else {
      this.newGenInfoSection3Item.Subsection_Name = '';
      this.newGenInfoSection3Item.First_Registered_Date = '';
      this.newGenInfoSection3Item.First_Registration_Submission_Number = '';
      this.newGenInfoSection3Item.First_Registration_Submission_Type = '';
      this.newGenInfoSection3Item.Registration_Number = '';
      this.newGenInfoSection3Item.Registration_Status = '';
      this.newGenInfoSection3Item.Associated_Publication_RDD = '';
      this.newGenInfoSection3Item.PMRA_Number_RDD = '';
      this.newGenInfoSection3Item.Date_of_SMC2_BN_for_RDD = '';
      this.newGenInfoSection3Item.Re_Evaluation_Status = '';
      this.newGenInfoSection3Item.Last_Status_Update_Date = '';
      this.newGenInfoSection3Item.Re_Evaluation_Submission_Number = '';
      this.newGenInfoSection3Item.Re_Evaluation_Submission_Category = '';
      this.newGenInfoSection3Item.Re_Evaluation_Submission_Type = '';
      this.newGenInfoSection3Item.Scoping_Document_PMRA_Number = '';
      this.newGenInfoSection3Item.Category = '';
      this.newGenInfoSection3Item.Associated_Publication_PRVD = '';
      this.newGenInfoSection3Item.PMRA_Number_PRVD = '';
      this.newGenInfoSection3Item.Date_of_SMC2_BN_for_PRVD = '';
      this.newGenInfoSection3Item.PMRA_Number_SMC2_PRVD = '';
      this.newGenInfoSection3Item.Associated_Publication_RVD = '';
      this.newGenInfoSection3Item.PMRA_Number_RVD = '';
      this.newGenInfoSection3Item.Date_of_SMC2_BN_for_RVD = '';
      this.newGenInfoSection3Item.PMRA_Number_SMC2_RVD = '';
      this.newGenInfoSection3Item.Special_Review_Status_Status = '';
      this.newGenInfoSection3Item.Special_Review_Last_Status_Update_Date = '';
      this.newGenInfoSection3Item.Special_Review_Submission_Number = '';
      this.newGenInfoSection3Item.Special_Review_Submission_Category = '';
      this.newGenInfoSection3Item.Special_Review_Submission_Type = '';
      this.newGenInfoSection3Item.Preliminary_Analysis_PMRA_Document_Number =
        '';
      this.newGenInfoSection3Item.Associated_Publication_PSR = '';
      this.newGenInfoSection3Item.PMRA_Number_PSR = '';
      this.newGenInfoSection3Item.Date_of_SMC2_BN_for_PSR = '';
      this.newGenInfoSection3Item.PMRA_Number_SMC2_PSR = '';
      this.newGenInfoSection3Item.Associated_Publication_SRD = '';
      this.newGenInfoSection3Item.PMRA_Number_SRD = '';
      this.newGenInfoSection3Item.Date_of_SMC2_BN_for_SRD = '';
      this.newGenInfoSection3Item.PMRA_Number_SMC2_SRD = '';
      this.editGenInfoSection3Mode = false;
      this.currentGenInfoSection3Item = '';
    }
  }

  submitGenInfoSection3Form(
    editGenInfoSection3Mode: boolean,
    Section_Name: string
  ) {
    this.newGenInfoSection3Item.Subsection_Name = Section_Name;
    if (editGenInfoSection3Mode) {
      this.dataService
        .editGenInfo_SECTION_3_TableItem(this.newGenInfoSection3Item)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Find the index of the item being edited
            if (
              this.newGenInfoSection3Item.Subsection_Name ==
              'Initial TGAI registration'
            ) {
              const index = this.genInfoSection31Data.findIndex(
                (item: { row_id: number }) =>
                  item.row_id === this.newGenInfoSection3Item.row_id
              );
              // Replace the item with the updated item
              this.genInfoSection31Data[index] = this.newGenInfoSection3Item;
            } else if (
              this.newGenInfoSection3Item.Subsection_Name ==
              'Completed (i-Done) or Open Re-evaluation'
            ) {
              const index = this.genInfoSection32Data.findIndex(
                (item: { row_id: number }) =>
                  item.row_id === this.newGenInfoSection3Item.row_id
              );
              // Replace the item with the updated item
              this.genInfoSection32Data[index] = this.newGenInfoSection3Item;
            } else if (
              this.newGenInfoSection3Item.Subsection_Name ==
              'Completed (i-Done) or Open Special Review'
            ) {
              const index = this.genInfoSection33Data.findIndex(
                (item: { row_id: number }) =>
                  item.row_id === this.newGenInfoSection3Item.row_id
              );
              // Replace the item with the updated item
              this.genInfoSection33Data[index] = this.newGenInfoSection3Item;
            }

            // Reset the newItem object and close the popup
            this.newGenInfoSection3Item = {
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Subsection_Name: '',
              First_Registered_Date: '',
              First_Registration_Submission_Number: '',
              First_Registration_Submission_Type: '',
              Registration_Number: '',
              Registration_Status: '',
              Associated_Publication_RDD: '',
              PMRA_Number_RDD: '',
              Date_of_SMC2_BN_for_RDD: '',
              Re_Evaluation_Status: '',
              Last_Status_Update_Date: '',
              Re_Evaluation_Submission_Number: '',
              Re_Evaluation_Submission_Category: '',
              Re_Evaluation_Submission_Type: '',
              Scoping_Document_PMRA_Number: '',
              Category: '',
              Associated_Publication_PRVD: '',
              PMRA_Number_PRVD: '',
              Date_of_SMC2_BN_for_PRVD: '',
              PMRA_Number_SMC2_PRVD: '',
              Associated_Publication_RVD: '',
              PMRA_Number_RVD: '',
              Date_of_SMC2_BN_for_RVD: '',
              PMRA_Number_SMC2_RVD: '',
              Special_Review_Status_Status: '',
              Special_Review_Last_Status_Update_Date: '',
              Special_Review_Submission_Number: '',
              Special_Review_Submission_Category: '',
              Special_Review_Submission_Type: '',
              Preliminary_Analysis_PMRA_Document_Number: '',
              Trigger: '',
              Associated_Publication_PSR: '',
              PMRA_Number_PSR: '',
              Date_of_SMC2_BN_for_PSR: '',
              PMRA_Number_SMC2_PSR: '',
              Associated_Publication_SRD: '',
              PMRA_Number_SRD: '',
              Date_of_SMC2_BN_for_SRD: '',
              PMRA_Number_SMC2_SRD: '',
            };
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    } else {
      const lastitem = this.newGenInfoSection3Item;
      this.dataService
        .addNewGenInfo_SECTION_3_TableItem(this.newGenInfoSection3Item)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Reset the newItem object and close the popup
            this.newGenInfoSection3Item = {
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Subsection_Name: '',
              First_Registered_Date: '',
              First_Registration_Submission_Number: '',
              First_Registration_Submission_Type: '',
              Registration_Number: '',
              Registration_Status: '',
              Associated_Publication_RDD: '',
              PMRA_Number_RDD: '',
              Date_of_SMC2_BN_for_RDD: '',
              Re_Evaluation_Status: '',
              Last_Status_Update_Date: '',
              Re_Evaluation_Submission_Number: '',
              Re_Evaluation_Submission_Category: '',
              Re_Evaluation_Submission_Type: '',
              Scoping_Document_PMRA_Number: '',
              Category: '',
              Associated_Publication_PRVD: '',
              PMRA_Number_PRVD: '',
              Date_of_SMC2_BN_for_PRVD: '',
              PMRA_Number_SMC2_PRVD: '',
              Associated_Publication_RVD: '',
              PMRA_Number_RVD: '',
              Date_of_SMC2_BN_for_RVD: '',
              PMRA_Number_SMC2_RVD: '',
              Special_Review_Status_Status: '',
              Special_Review_Last_Status_Update_Date: '',
              Special_Review_Submission_Number: '',
              Special_Review_Submission_Category: '',
              Special_Review_Submission_Type: '',
              Preliminary_Analysis_PMRA_Document_Number: '',
              Trigger: '',
              Associated_Publication_PSR: '',
              PMRA_Number_PSR: '',
              Date_of_SMC2_BN_for_PSR: '',
              PMRA_Number_SMC2_PSR: '',
              Associated_Publication_SRD: '',
              PMRA_Number_SRD: '',
              Date_of_SMC2_BN_for_SRD: '',
              PMRA_Number_SMC2_SRD: '',
            };
            if (lastitem.Subsection_Name == 'Initial TGAI registration') {
              this.genInfoSection31Data.push(lastitem);
            } else if (
              lastitem.Subsection_Name ==
              'Completed (i-Done) or Open Re-evaluation'
            ) {
              this.genInfoSection32Data.push(lastitem);
            } else if (
              lastitem.Subsection_Name ==
              'Completed (i-Done) or Open Special Review'
            ) {
              this.genInfoSection33Data.push(lastitem);
            }
            this.genInfoSection3Data.push(lastitem);
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    }
  }
  deleteGenInfoSection3Item(item: any) {
    this.dataService
      .deleteGenInfo_SECTION_3_TableItem(item.row_id)
      .subscribe((response) => {
        let index = this.genInfoSection3Data.indexOf(item);
        if (index >= 0) {
          this.genInfoSection3Data.splice(index, 1);
          this.updateLastUpdatedOn();
        }
        index = this.genInfoSection31Data.indexOf(item);
        if (index >= 0) {
          this.genInfoSection31Data.splice(index, 1);
          this.updateLastUpdatedOn();
        }
        index = this.genInfoSection32Data.indexOf(item);
        if (index >= 0) {
          this.genInfoSection32Data.splice(index, 1);
          this.updateLastUpdatedOn();
        }
        index = this.genInfoSection33Data.indexOf(item);
        if (index >= 0) {
          this.genInfoSection33Data.splice(index, 1);
          this.updateLastUpdatedOn();
        }
      });
  }

  openGenInfoRegistrantsPopup(item?: any) {
    if (item) {
      // Editing an existing item
      this.newGenInfoRegistrantsItem.Registrant_Name = item.Registrant_Name;
      this.newGenInfoRegistrantsItem.Registrant_Assigned_Code =
        item.Registrant_Assigned_Code;
      this.newGenInfoRegistrantsItem.Registrant_Assigned_Number =
        item.Registrant_Assigned_Number;
      this.newGenInfoRegistrantsItem.Registration_Number =
        item.Registration_Number;
      this.newGenInfoRegistrantsItem.Date_First_Registered = item.Date_First_Registered?new Date(
        item.Date_First_Registered
      )
        .toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2'):'';
      this.newGenInfoRegistrantsItem.Initial_Submission_Category =
        item.Initial_Submission_Category;
      this.newGenInfoRegistrantsItem.Initial_Submission_Type =
        item.Initial_Submission_Type;
      this.newGenInfoRegistrantsItem.USC_List = item.USC_List;
      this.newGenInfoRegistrantsItem.Registration_Status =
        item.Registration_Status;
      this.newGenInfoRegistrantsItem.Comments = item.Comments;
      this.newGenInfoRegistrantsItem.row_id = item.row_id;
      this.editGenInfoRegistrantsMode = true;
      this.currentGenInfoRegistrantsItem = this.newGenInfoRegistrantsItem;
    } else {
      this.newGenInfoRegistrantsItem.Registrant_Name = '';
      this.newGenInfoRegistrantsItem.Registrant_Assigned_Code = '';
      this.newGenInfoRegistrantsItem.Registrant_Assigned_Number = '';
      this.newGenInfoRegistrantsItem.Registration_Number = '';
      this.newGenInfoRegistrantsItem.Date_First_Registered = '';
      this.newGenInfoRegistrantsItem.Initial_Submission_Category = '';
      this.newGenInfoRegistrantsItem.Initial_Submission_Type = '';
      this.newGenInfoRegistrantsItem.USC_List = 0;
      this.newGenInfoRegistrantsItem.Registration_Status = '';
      this.newGenInfoRegistrantsItem.Comments = '';
      this.editGenInfoRegistrantsMode = false;
      this.currentGenInfoRegistrantsItem = '';
    }
    this.showGenInfoRegistrantsPopup = true;
  }

  submitGenInfoTGAIRegistrantsListForm(
    editGenInfoTGAIRegistrantsListMode: boolean
  ) {
    if (editGenInfoTGAIRegistrantsListMode) {
      this.dataService
        .editGenInfo_TGAI_REGISTRANTS_LIST_TableItem(
          this.newGenInfoRegistrantsItem
        )
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Find the index of the item being edited
            const index = this.genInfoTGAIRegistrantsListData.findIndex(
              (item: { row_id: number }) =>
                item.row_id === this.newGenInfoRegistrantsItem.row_id
            );
            // Replace the item with the updated item
            this.genInfoTGAIRegistrantsListData[index] =
              this.newGenInfoRegistrantsItem;

            // Reset the newItem object and close the popup
            this.newGenInfoRegistrantsItem = {
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Registrant_Name: '',
              Registrant_Assigned_Code: '',
              Registrant_Assigned_Number: '',
              Registration_Number: '',
              Date_First_Registered: '',
              Initial_Submission_Category: '',
              Initial_Submission_Type: '',
              USC_List: 0,
              Registration_Status: '',
              Comments: '',
            };
            this.showGenInfoRegistrantsPopup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    } else {
      const lastitem = this.newGenInfoRegistrantsItem;
      this.dataService
        .addNewGenInfo_TGAI_REGISTRANTS_LIST_TableItem(
          this.newGenInfoRegistrantsItem
        )
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Reset the newItem object and close the popup
            this.newGenInfoRegistrantsItem = {
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Registrant_Name: '',
              Registrant_Assigned_Code: '',
              Registrant_Assigned_Number: '',
              Registration_Number: '',
              Date_First_Registered: '',
              Initial_Submission_Category: '',
              Initial_Submission_Type: '',
              USC_List: 0,
              Registration_Status: '',
              Comments: '',
            };
            this.genInfoTGAIRegistrantsListData.push(lastitem);
            this.showGenInfoRegistrantsPopup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    }
  }

  closeTGAIRegistrantsListPopup() {
    this.showGenInfoRegistrantsPopup = false;
  }

  deleteTGAIRegistrantsListItem(item: any) {
    this.dataService
      .deleteGenInfo_TGAI_REGISTRANTS_LIST_TableItem(item.row_id)
      .subscribe(() => {
        const index = this.genInfoTGAIRegistrantsListData.indexOf(item);
        if (index >= 0) {
          this.genInfoTGAIRegistrantsListData.splice(index, 1);
          this.updateLastUpdatedOn();
        }
      });
  }

  openGenInfoRegulatorsPopup(item?: any) {
    if (item) {
      // Editing an existing item
      this.newGenInfoRegulatorsItem.Regulator = item.Regulator;
      this.newGenInfoRegulatorsItem.Status_of_Active_Ingredient =
        item.Status_of_Active_Ingredient;
      this.newGenInfoRegulatorsItem.Status_date = item.Status_date?new Date(item.Status_date)
        .toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2'):'';
      this.newGenInfoRegulatorsItem.Comments = item.Comments;
      this.newGenInfoRegulatorsItem.row_id = item.row_id;
      this.editGenInfoRegulatorsMode = true;
      this.currentGenInfoRegulatorsItem = this.newGenInfoRegulatorsItem;
    } else {
      this.newGenInfoRegulatorsItem.Regulator = '';
      this.newGenInfoRegulatorsItem.Status_of_Active_Ingredient = '';
      this.newGenInfoRegulatorsItem.Status_date = '';
      this.newGenInfoRegulatorsItem.Comments = '';
      this.editGenInfoRegulatorsMode = false;
      this.currentGenInfoRegulatorsItem = '';
    }
    this.showGenInfoRegulatorsPopup = true;
  }

  submitGenInfoRegulatorsForm(editGenInfoRegulatorsMode: boolean) {
    if (editGenInfoRegulatorsMode) {
      this.dataService
        .editGenInfo_REGULATORS_TableItem(this.newGenInfoRegulatorsItem)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Find the index of the item being edited
            const index = this.genInfoRegulatorsData.findIndex(
              (item: { row_id: number }) =>
                item.row_id === this.newGenInfoRegulatorsItem.row_id
            );
            // Replace the item with the updated item
            this.genInfoRegulatorsData[index] = this.newGenInfoRegulatorsItem;

            // Reset the newItem object and close the popup
            this.newGenInfoRegulatorsItem = {
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Regulator: '',
              Status_of_Active_Ingredient: '',
              Status_date: '',
              Comments: '',
            };
            this.showGenInfoRegulatorsPopup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    } else {
      const lastitem = this.newGenInfoRegulatorsItem;
      this.dataService
        .addNewGenInfo_REGULATORS_TableItem(this.newGenInfoRegulatorsItem)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Reset the newItem object and close the popup
            this.newGenInfoRegulatorsItem = {
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Regulator: '',
              Status_of_Active_Ingredient: '',
              Status_date: '',
              Comments: '',
            };
            this.genInfoRegulatorsData.push(lastitem);
            this.showGenInfoRegulatorsPopup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    }
  }

  closeGenInfoRegulatorsPopup() {
    this.showGenInfoRegulatorsPopup = false;
  }

  deleteGenInfoRegulatorsItem(item: any) {
    this.dataService
      .deleteGenInfo_REGULATORS_TableItem(item.row_id)
      .subscribe((response) => {
        const index = this.genInfoRegulatorsData.indexOf(item);
        if (index >= 0) {
          this.genInfoRegulatorsData.splice(index, 1);
          this.updateLastUpdatedOn();
        }
      });
  }

  // CRUD methods for GenInfo_BACKGROUND_Table
  openGenInfoBackgroundPopup(item?: any) {
    if (item) {
      // Editing an existing item
      this.newGenInfoBackgroundItem.row_id = item.row_id;
      this.newGenInfoBackgroundItem.Subsection_Name = item.Subsection_Name;
      this.newGenInfoBackgroundItem.Subsection_ID = item.Subsection_ID;
      this.newGenInfoBackgroundItem.Conducted = item.Conducted;
      this.newGenInfoBackgroundItem.Submission_Status_Level =
        item.Submission_Status_Level;
      this.newGenInfoBackgroundItem.Submission_Status_Activity =
        item.Submission_Status_Activity;
      this.newGenInfoBackgroundItem.PMRA_Number = item.PMRA_Number;
      this.newGenInfoBackgroundItem.Purpose = item.Purpose;
      this.editGenInfoBackgroundMode = true;
      this.currentGenInfoBackgroundItem = this.newGenInfoBackgroundItem;
    } else {
      // Adding a new item
      this.newGenInfoBackgroundItem.row_id = 0;
      this.newGenInfoBackgroundItem.Subsection_Name = '';
      this.newGenInfoBackgroundItem.Subsection_ID = '';
      this.newGenInfoBackgroundItem.Conducted = false;
      this.newGenInfoBackgroundItem.Submission_Status_Level = '';
      this.newGenInfoBackgroundItem.Submission_Status_Activity = '';
      this.newGenInfoBackgroundItem.PMRA_Number = 0;
      this.newGenInfoBackgroundItem.Purpose = '';
      this.editGenInfoBackgroundMode = false;
      this.currentGenInfoBackgroundItem = '';
    }
    this.showGenInfoBackgroundPopup = true;
  }

  submitGenInfoBackgroundForm(editGenInfoBackgroundMode: boolean) {
    if (
      this.newGenInfoBackgroundItem.Subsection_Name ==
      'Pre-Submission Consultations'
    ) {
      this.newGenInfoBackgroundItem.Subsection_ID = '4.1';
    } else if (
      this.newGenInfoBackgroundItem.Subsection_Name == 'Emergency Registrations'
    ) {
      this.newGenInfoBackgroundItem.Subsection_ID = '4.2';
    } else if (
      this.newGenInfoBackgroundItem.Subsection_Name == 'Research Authoizations'
    ) {
      this.newGenInfoBackgroundItem.Subsection_ID = '4.3';
    }
    if (editGenInfoBackgroundMode) {
      this.dataService
        .editGenInfo_BACKGROUND_TableItem(this.newGenInfoBackgroundItem)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Find the index of the item being edited
            const index = this.genInfoBackgroundData.findIndex(
              (item: { row_id: number }) =>
                item.row_id === this.newGenInfoBackgroundItem.row_id
            );

            // Replace the item with the updated item
            this.genInfoBackgroundData[index] = this.newGenInfoBackgroundItem;

            // Reset the newItem object and close the popup
            this.newGenInfoBackgroundItem = {
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Subsection_Name: '',
              Subsection_ID: '',
              Conducted: false,
              Submission_Status_Level: '',
              Submission_Status_Activity: '',
              PMRA_Number: 0,
              Purpose: '',
            };
            this.showGenInfoBackgroundPopup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    } else {
      const lastItem = this.newGenInfoBackgroundItem;
      this.dataService
        .addNewGenInfo_BACKGROUND_TableItem(this.newGenInfoBackgroundItem)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Reset the newItem object and close the popup
            this.newGenInfoBackgroundItem = {
              row_id: 0,
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Subsection_Name: '',
              Subsection_ID: '',
              Conducted: false,
              Submission_Status_Level: '',
              Submission_Status_Activity: '',
              PMRA_Number: 0,
              Purpose: '',
            };
            this.genInfoBackgroundData.push(lastItem);
            this.showGenInfoBackgroundPopup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    }
  }

  closeGenInfoBackgroundPopup() {
    this.showGenInfoBackgroundPopup = false;
  }

  deleteGenInfoBackgroundItem(item: any) {
    this.dataService
      .deleteGenInfo_BACKGROUND_TableItem(item.row_id)
      .subscribe((response) => {
        const index = this.genInfoBackgroundData.indexOf(item);
        if (index >= 0) {
          this.genInfoBackgroundData.splice(index, 1);
          this.updateLastUpdatedOn();
        }
      });
  }

  openGenInfoEPMarketingPopup(item?: any) {
    if (item) {
      // Editing an existing item
      this.newGenInfoEPMarketingItem.row_id = item.row_id;
      this.newGenInfoEPMarketingItem.Restrictions = item.Restrictions;
      this.newGenInfoEPMarketingItem.Registration_Number =
        item.Registration_Number;
      this.newGenInfoEPMarketingItem.Product_Name = item.Product_Name;
      this.newGenInfoEPMarketingItem.Historical = item.Historical;
      this.newGenInfoEPMarketingItem.Current = item.Current;
      this.newGenInfoEPMarketingItem.From_Submission_Number =
        item.From_Submission_Number;
      this.editGenInfoEPMarketingMode = true;
      this.currentGenInfoEPMarketingItem = this.newGenInfoEPMarketingItem;
    } else {
      this.newGenInfoEPMarketingItem.row_id = 0;
      this.newGenInfoEPMarketingItem.Restrictions = 'No';
      this.newGenInfoEPMarketingItem.Registration_Number = 0;
      this.newGenInfoEPMarketingItem.Product_Name = '';
      this.newGenInfoEPMarketingItem.Historical = false;
      this.newGenInfoEPMarketingItem.Current = false;
      this.newGenInfoEPMarketingItem.From_Submission_Number = '';
      this.editGenInfoEPMarketingMode = false;
      this.currentGenInfoEPMarketingItem = '';
    }
    this.showGenInfoEPMarketingPopup = true;
  }

  submitGenInfoEPMarketingForm(editGenInfoEPMarketingMode: boolean) {
    if (editGenInfoEPMarketingMode) {
      this.dataService
        .editGenInfo_EP_MARKETING_TableItem(this.newGenInfoEPMarketingItem)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Find the index of the item being edited
            const index = this.genInfoEPMarketingData.findIndex(
              (item: { row_id: number }) =>
                item.row_id === this.newGenInfoEPMarketingItem.row_id
            );
            // Replace the item with the updated item
            this.genInfoEPMarketingData[index] = this.newGenInfoEPMarketingItem;

            // Reset the newItem object and close the popup
            this.newGenInfoEPMarketingItem = {
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Restrictions: 'No',
              Registration_Number: 0,
              Product_Name: '',
              Historical: false,
              Current: false,
              From_Submission_Number: '',
              row_id: 0,
            };
            this.showGenInfoEPMarketingPopup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    } else {
      const lastitem = this.newGenInfoEPMarketingItem;
      this.dataService
        .addNewGenInfo_EP_MARKETING_TableItem(this.newGenInfoEPMarketingItem)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Reset the newItem object and close the popup
            this.newGenInfoEPMarketingItem = {
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              Restrictions: 'No',
              Registration_Number: 0,
              Product_Name: '',
              Historical: false,
              Current: false,
              From_Submission_Number: '',
              row_id: 0,
            };
            this.genInfoEPMarketingData.push(lastitem);
            this.showGenInfoEPMarketingPopup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    }
  }
  closeGenInfoEPMarketingPopup() {
    this.showGenInfoEPMarketingPopup = false;
  }

  deleteGenInfoEPMarketingItem(item: any) {
    this.dataService
      .deleteGenInfo_EP_MARKETING_TableItem(item.Registration_Number)
      .subscribe((response) => {
        const index = this.genInfoEPMarketingData.indexOf(item);
        if (index >= 0) {
          this.genInfoEPMarketingData.splice(index, 1);
          this.updateLastUpdatedOn();
        }
      });
  }

  openGenInfoCompliancePopup(item?: any) {
    if (item) {
      // Editing an existing item
      this.newGenInfoComplianceItem.row_id = item.row_id;
      this.newGenInfoComplianceItem.Sector = item.Sector;
      this.newGenInfoComplianceItem.PCPA_Contravention =
        item.PCPA_Contravention;
      this.newGenInfoComplianceItem.Date_Of_Reported_Contravention =  item.Date_Of_Reported_Contravention?new Date(
        item.Date_Of_Reported_Contravention
      )
        .toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2'):'';
      this.newGenInfoComplianceItem.Product_Description =
        item.Product_Description;
      this.newGenInfoComplianceItem.Corrective_Action_Taken =
        item.Corrective_Action_Taken;
      this.newGenInfoComplianceItem.Compliance_Status = item.Compliance_Status;
      this.newGenInfoComplianceItem.Additional_Information =
        item.Additional_Information;
      this.editGenInfoComplianceMode = true;
      this.currentGenInfoComplianceItem = this.newGenInfoComplianceItem;
    } else {
      // Creating a new item
      this.newGenInfoComplianceItem.row_id = 0;
      this.newGenInfoComplianceItem.Sector = '';
      this.newGenInfoComplianceItem.PCPA_Contravention = '';
      this.newGenInfoComplianceItem.Date_Of_Reported_Contravention = '';
      this.newGenInfoComplianceItem.Product_Description = '';
      this.newGenInfoComplianceItem.Corrective_Action_Taken = '';
      this.newGenInfoComplianceItem.Compliance_Status = 'Compliant';
      this.newGenInfoComplianceItem.Additional_Information = '';
      this.editGenInfoComplianceMode = false;
      this.currentGenInfoComplianceItem = '';
    }
    this.showGenInfoCompliancePopup = true;
  }

  submitGenInfoComplianceForm(editGenInfoComplianceMode: boolean) {
    if (editGenInfoComplianceMode) {
      this.dataService
        .editGenInfo_ROEB_COMPLIANCE_AUDIT_TRAIL_TableItem(
          this.newGenInfoComplianceItem
        )
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Find the index of the item being edited
            const index = this.genInfoComplianceData.findIndex(
              (item: { row_id: number }) =>
                item.row_id === this.newGenInfoComplianceItem.row_id
            );
            // Replace the item with the updated item
            this.genInfoComplianceData[index] = this.newGenInfoComplianceItem;

            // Reset the newItem object and close the popup
            this.newGenInfoComplianceItem = {
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              row_id: 0,
              Sector: '',
              PCPA_Contravention: '',
              Date_Of_Reported_Contravention: '',
              Product_Description: '',
              Corrective_Action_Taken: '',
              Compliance_Status: 'Compliant',
              Additional_Information: '',
            };
            this.showGenInfoCompliancePopup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    } else {
      const lastitem = this.newGenInfoComplianceItem;
      this.dataService
        .addNewGenInfo_ROEB_COMPLIANCE_AUDIT_TRAIL_TableItem(
          this.newGenInfoComplianceItem
        )
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Reset the newItem object and close the popup
            this.newGenInfoComplianceItem = {
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              row_id: 0,
              Sector: '',
              PCPA_Contravention: '',
              Date_Of_Reported_Contravention: '',
              Product_Description: '',
              Corrective_Action_Taken: '',
              Compliance_Status: 'Compliant',
              Additional_Information: '',
            };
            this.genInfoComplianceData.push(lastitem);
            this.showGenInfoCompliancePopup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    }
  }

  closeGenInfoCompliancePopup() {
    this.showGenInfoCompliancePopup = false;
  }

  deleteGenInfoComplianceItem(item: any) {
    this.dataService
      .deleteGenInfo_ROEB_COMPLIANCE_AUDIT_TRAIL_TableItem(item.row_id)
      .subscribe((response) => {
        const index = this.genInfoComplianceData.indexOf(item);
        if (index >= 0) {
          this.genInfoComplianceData.splice(index, 1);
          this.updateLastUpdatedOn();
        }
      });
  }

  openGenInfoInfoLinePopup(item?: any) {
    if (item) {
      // Editing an existing item
      this.newGenInfoInfoLineItem.row_id = item.row_id;
      this.newGenInfoInfoLineItem.Date_Received = item.Date_Received?new Date(item.Date_Received)
        .toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2'):'';
      this.newGenInfoInfoLineItem.Comments_Received = item.Comments_Received;
      this.editGenInfoInfoLineMode = true;
      this.currentGenInfoInfoLineItem = this.newGenInfoInfoLineItem;
    } else {
      // Creating a new item
      this.newGenInfoInfoLineItem.row_id = 0;
      this.newGenInfoInfoLineItem.Date_Received = '';
      this.newGenInfoInfoLineItem.Comments_Received = '';
      this.editGenInfoInfoLineMode = false;
      this.currentGenInfoInfoLineItem = '';
    }
    this.showGenInfoInfoLinePopup = true;
  }

  submitGenInfoInfoLineForm(editGenInfoInfoLineMode: boolean) {
    if (editGenInfoInfoLineMode) {
      this.dataService
        .editGenInfo_INFO_LINE_TableItem(this.newGenInfoInfoLineItem)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Find the index of the item being edited
            const index = this.genInfoInfoLineData.findIndex(
              (item: { row_id: number }) =>
                item.row_id === this.newGenInfoInfoLineItem.row_id
            );
            // Replace the item with the updated item
            this.genInfoInfoLineData[index] = this.newGenInfoInfoLineItem;
            // Reset the newItem object and close the popup
            this.newGenInfoInfoLineItem = {
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              row_id: 0,
              Date_Received: '',
              Comments_Received: '',
            };
            this.showGenInfoInfoLinePopup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    } else {
      const lastitem = this.newGenInfoInfoLineItem;
      this.dataService
        .addNewGenInfo_INFO_LINE_TableItem(this.newGenInfoInfoLineItem)
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Reset the newItem object and close the popup
            this.newGenInfoInfoLineItem = {
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              row_id: 0,
              Date_Received: '',
              Comments_Received: '',
            };
            this.genInfoInfoLineData.push(lastitem);
            this.showGenInfoInfoLinePopup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    }
  }

  closeGenInfoInfoLinePopup() {
    this.showGenInfoInfoLinePopup = false;
  }

  deleteGenInfoInfoLineItem(item: any) {
    this.dataService
      .deleteGenInfo_INFO_LINE_TableItem(item.row_id)
      .subscribe((response) => {
        const index = this.genInfoInfoLineData.indexOf(item);
        if (index >= 0) {
          this.genInfoInfoLineData.splice(index, 1);
          this.updateLastUpdatedOn();
        }
      });
  }

  openGenInfoTGAI_EP_UnfulfilledConditionsPopup(item?: any) {
    if (item) {
      // Editing an existing item
      this.newGenInfoTGAI_EP_UnfulfilledConditionsItem.row_id = item.row_id;
      this.newGenInfoTGAI_EP_UnfulfilledConditionsItem.State = item.State;
      this.newGenInfoTGAI_EP_UnfulfilledConditionsItem.TGAI_EP_MA =
        item.TGAI_EP_MA;
      this.newGenInfoTGAI_EP_UnfulfilledConditionsItem.Registration_Number =
        item.Registration_Number;
      this.newGenInfoTGAI_EP_UnfulfilledConditionsItem.PMRA_Number =
        item.PMRA_Number;
      this.newGenInfoTGAI_EP_UnfulfilledConditionsItem.Due_date = item.Due_date?new Date(
        item.Due_date
      )
        .toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2'):'';
      this.newGenInfoTGAI_EP_UnfulfilledConditionsItem.DACO_Number =
        item.DACO_Number;
      this.newGenInfoTGAI_EP_UnfulfilledConditionsItem.Unfulfilled_Requirements =
        item.Unfulfilled_Requirements;
      this.editGenInfoTGAI_EP_UnfulfilledConditionsMode = true;
      this.currentGenInfoTGAI_EP_UnfulfilledConditionsItem =
        this.newGenInfoTGAI_EP_UnfulfilledConditionsItem;
    } else {
      // Creating a new item
      this.newGenInfoTGAI_EP_UnfulfilledConditionsItem.row_id = 0;
      this.newGenInfoTGAI_EP_UnfulfilledConditionsItem.State = false;
      this.newGenInfoTGAI_EP_UnfulfilledConditionsItem.TGAI_EP_MA = '';
      this.newGenInfoTGAI_EP_UnfulfilledConditionsItem.Registration_Number = 0;
      this.newGenInfoTGAI_EP_UnfulfilledConditionsItem.PMRA_Number = 0;
      this.newGenInfoTGAI_EP_UnfulfilledConditionsItem.Due_date = '';
      this.newGenInfoTGAI_EP_UnfulfilledConditionsItem.DACO_Number = '';
      this.newGenInfoTGAI_EP_UnfulfilledConditionsItem.Unfulfilled_Requirements =
        '';
      this.editGenInfoTGAI_EP_UnfulfilledConditionsMode = false;
      this.currentGenInfoTGAI_EP_UnfulfilledConditionsItem = '';
    }
    this.showGenInfoTGAI_EP_UnfulfilledConditionsPopup = true;
  }

  submitGenInfoTGAI_EP_UnfulfilledConditionsForm(
    editGenInfoTGAI_EP_UnfulfilledConditionsMode: boolean
  ) {
    if (editGenInfoTGAI_EP_UnfulfilledConditionsMode) {
      this.dataService
        .editGenInfo_TGAI_EP_UNFULFILLED_CONDITIONS_TableItem(
          this.newGenInfoTGAI_EP_UnfulfilledConditionsItem
        )
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Find the index of the item being edited
            const index =
              this.genInfoTGAI_EP_UnfulfilledConditionsData.findIndex(
                (item: { row_id: number }) =>
                  item.row_id ===
                  this.newGenInfoTGAI_EP_UnfulfilledConditionsItem.row_id
              );
            // Replace the item with the updated item
            this.genInfoTGAI_EP_UnfulfilledConditionsData[index] =
              this.newGenInfoTGAI_EP_UnfulfilledConditionsItem;
            // Reset the newItem object and close the popup
            this.newGenInfoTGAI_EP_UnfulfilledConditionsItem = {
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              row_id: 0,
              State: false,
              TGAI_EP_MA: '',
              Registration_Number: 0,
              PMRA_Number: 0,
              Due_date: '',
              DACO_Number: '',
              Unfulfilled_Requirements: '',
            };
            this.showGenInfoTGAI_EP_UnfulfilledConditionsPopup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    } else {
      const lastitem = this.newGenInfoTGAI_EP_UnfulfilledConditionsItem;
      this.dataService
        .addNewGenInfo_TGAI_EP_UNFULFILLED_CONDITIONS_TableItem(
          this.newGenInfoTGAI_EP_UnfulfilledConditionsItem
        )
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Reset the newItem object and close the popup
            this.newGenInfoTGAI_EP_UnfulfilledConditionsItem = {
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              row_id: 0,
              State: false,
              TGAI_EP_MA: '',
              Registration_Number: 0,
              PMRA_Number: 0,
              Due_date: '',
              DACO_Number: '',
              Unfulfilled_Requirements: '',
            };
            this.genInfoTGAI_EP_UnfulfilledConditionsData.push(lastitem);
            this.showGenInfoTGAI_EP_UnfulfilledConditionsPopup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    }
  }
  closeGenInfoTGAI_EP_UnfulfilledConditionsItem() {
    this.showGenInfoTGAI_EP_UnfulfilledConditionsPopup = false;
  }

  deleteGenInfoTGAI_EP_UnfulfilledConditionsItem(item: any) {
    this.dataService
      .deleteGenInfo_TGAI_EP_UNFULFILLED_CONDITIONS_TableItem(item.row_id)
      .subscribe((response) => {
        const index =
          this.genInfoTGAI_EP_UnfulfilledConditionsData.indexOf(item);
        if (index >= 0) {
          this.genInfoTGAI_EP_UnfulfilledConditionsData.splice(index, 1);
          this.updateLastUpdatedOn();
        }
      });
  }

  openGenInfoScienceTeamALDsPopup(item?: any) {
    if (item) {
      // Editing an existing item
      this.newGenInfoScienceTeamALDsItem.row_id = item.row_id;
      this.newGenInfoScienceTeamALDsItem.TOX = item.TOX;
      this.newGenInfoScienceTeamALDsItem.TOX_Details = item.TOX_Details;
      this.newGenInfoScienceTeamALDsItem.Dietary = item.Dietary;
      this.newGenInfoScienceTeamALDsItem.Dietary_Details = item.Dietary_Details;
      this.newGenInfoScienceTeamALDsItem.Occupational = item.Occupational;
      this.newGenInfoScienceTeamALDsItem.Occupational_Details =
        item.Occupational_Details;
      this.newGenInfoScienceTeamALDsItem.IRP = item.IRP;
      this.newGenInfoScienceTeamALDsItem.IRP_Details = item.IRP_Details;
      this.newGenInfoScienceTeamALDsItem.RRS = item.RRS;
      this.newGenInfoScienceTeamALDsItem.RRS_Details = item.RRS_Details;
      this.newGenInfoScienceTeamALDsItem.EAD = item.EAD;
      this.newGenInfoScienceTeamALDsItem.EAD_Details = item.EAD_Details;
      this.newGenInfoScienceTeamALDsItem.EAD_WM = item.EAD_WM;
      this.newGenInfoScienceTeamALDsItem.EAD_WM_Details = item.EAD_WM_Details;
      this.newGenInfoScienceTeamALDsItem.VALUE = item.VALUE;
      this.newGenInfoScienceTeamALDsItem.VALUE_Details = item.VALUE_Details;
      this.newGenInfoScienceTeamALDsItem.CES = item.CES;
      this.newGenInfoScienceTeamALDsItem.CES_Details = item.CES_Details;
      this.editGenInfoScienceTeamALDsMode = true;
      this.currentGenInfoScienceTeamALDsItem =
        this.newGenInfoScienceTeamALDsItem;
    } else {
      // Creating a new item
      this.newGenInfoScienceTeamALDsItem.row_id = 0;
      this.newGenInfoScienceTeamALDsItem.TOX = 'N/A';
      this.newGenInfoScienceTeamALDsItem.TOX_Details = '';
      this.newGenInfoScienceTeamALDsItem.Dietary = 'N/A';
      this.newGenInfoScienceTeamALDsItem.Dietary_Details = '';
      this.newGenInfoScienceTeamALDsItem.Occupational = 'N/A';
      this.newGenInfoScienceTeamALDsItem.Occupational_Details = '';
      this.newGenInfoScienceTeamALDsItem.IRP = 'N/A';
      this.newGenInfoScienceTeamALDsItem.IRP_Details = '';
      this.newGenInfoScienceTeamALDsItem.RRS = 'N/A';
      this.newGenInfoScienceTeamALDsItem.RRS_Details = '';
      this.newGenInfoScienceTeamALDsItem.EAD = 'N/A';
      this.newGenInfoScienceTeamALDsItem.EAD_Details = '';
      this.newGenInfoScienceTeamALDsItem.EAD_WM = 'N/A';
      this.newGenInfoScienceTeamALDsItem.EAD_WM_Details = '';
      this.newGenInfoScienceTeamALDsItem.VALUE = 'N/A';
      this.newGenInfoScienceTeamALDsItem.VALUE_Details = '';
      this.newGenInfoScienceTeamALDsItem.CES = 'N/A';
      this.newGenInfoScienceTeamALDsItem.CES_Details = '';
      this.editGenInfoScienceTeamALDsMode = false;
      this.currentGenInfoScienceTeamALDsItem = '';
    }
    this.showGenInfoScienceTeamALDsPopup = true;
  }

  submitGenInfoScienceTeamALDsForm(editScienceTeamALDsMode: boolean) {
    if (editScienceTeamALDsMode) {
      this.dataService
        .editGenInfo_SCIENCE_TEAM_ALDs_TableItem(
          this.newGenInfoScienceTeamALDsItem
        )
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Find the index of the item being edited
            const index = this.genInfoScienceTeamALDsData.findIndex(
              (item: { row_id: number }) =>
                item.row_id === this.newGenInfoScienceTeamALDsItem.row_id
            );
            // Replace the item with the updated item
            this.genInfoScienceTeamALDsData[index] =
              this.newGenInfoScienceTeamALDsItem;
            // Reset the newItem object and close the popup
            this.newGenInfoScienceTeamALDsItem = {
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              row_id: 0,
              TOX: 'N/A',
              TOX_Details: '',
              Dietary: 'N/A',
              Dietary_Details: '',
              Occupational: 'N/A',
              Occupational_Details: '',
              IRP: 'N/A',
              IRP_Details: '',
              RRS: 'N/A',
              RRS_Details: '',
              EAD: 'N/A',
              EAD_Details: '',
              EAD_WM: 'N/A',
              EAD_WM_Details: '',
              VALUE: 'N/A',
              VALUE_Details: '',
              CES: 'N/A',
              CES_Details: '',
            };
            this.showGenInfoScienceTeamALDsPopup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    } else {
      const lastitem = this.newGenInfoScienceTeamALDsItem;
      this.dataService
        .addNewGenInfo_SCIENCE_TEAM_ALDs_TableItem(
          this.newGenInfoScienceTeamALDsItem
        )
        .subscribe((response) => {
          if (response) {
            this.updateLastUpdatedOn();
            // Reset the newItem object and close the popup
            this.newGenInfoScienceTeamALDsItem = {
              Submission_Number:
                this.route.snapshot.paramMap.get('submissionNumber'),
              row_id: 0,
              TOX: 'N/A',
              TOX_Details: '',
              Dietary: 'N/A',
              Dietary_Details: '',
              Occupational: 'N/A',
              Occupational_Details: '',
              IRP: 'N/A',
              IRP_Details: '',
              RRS: 'N/A',
              RRS_Details: '',
              EAD: 'N/A',
              EAD_Details: '',
              EAD_WM: 'N/A',
              EAD_WM_Details: '',
              VALUE: 'N/A',
              VALUE_Details: '',
              CES: 'N/A',
              CES_Details: '',
            };
            this.genInfoScienceTeamALDsData.push(lastitem);
            this.showGenInfoScienceTeamALDsPopup = false;
          } else {
            alert(
              'Form Fields have incorrect Data types, Kindly check and try again'
            );
          }
        });
    }
  }

  closeGenInfoScienceTeamALDsPopup() {
    this.showGenInfoScienceTeamALDsPopup = false;
  }

  deleteGenInfoScienceTeamALDsItem(item: any) {
    this.dataService
      .deleteGenInfo_SCIENCE_TEAM_ALDs_TableItem(item.row_id)
      .subscribe((response) => {
        const index = this.genInfoScienceTeamALDsData.indexOf(item);
        if (index >= 0) {
          this.genInfoScienceTeamALDsData.splice(index, 1);
          this.updateLastUpdatedOn();
        }
      });
  }
}
