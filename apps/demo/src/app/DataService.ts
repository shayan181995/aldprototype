import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {
  private db = 'https://aldprototype.ca:3000'; //https://aldprototype.ca:3000 for prod //http://localhost:3000 for local
  private apiUrl = this.db + '/api/data';
  private apiValueSection2Url = this.db + '/api/valuesection2';
  private apiValueSection3Url = this.db + '/api/valuesection3';
  private apiValueSection4Url = this.db + '/api/valuesection4';
  private apiValueUrl = this.db + '/api/value';
  private apiKeyDocsUrl = this.db + '/api/keydocsdata';
  private apiSection3to9Url = this.db + '/api/section3to9data';
  private apiSummaryTableUrl = this.db + '/api/toxsection21summarytable';
  private apiTOXSECTIONS22232434TableUrl =
    this.db + '/api/toxsections22232434data';
  private apiTOXSECTION5TableUrl = this.db + '/api/toxsection5data';
  private apiTOXSECTION6TableUrl = this.db + '/api/toxsection6data';
  private apiTOXSECTION7TableUrl = this.db + '/api/toxsection7data';
  private apiTOXSECTION8TableUrl = this.db + '/api/toxsection8data';
  private apiTOXSECTION9TableUrl = this.db + '/api/toxsection9data';
  private apiTOXSECTION10TableUrl = this.db + '/api/toxsection10data';
  private apiTOXSECTION11TableUrl = this.db + '/api/toxsection11data';
  private apiGenInfo_SECTION_2_TableUrl = this.db + '/api/geninfosection2data';
  private apiGenInfo_SECTION_3_TableUrl = this.db + '/api/geninfosection3data';
  private apiGenInfo_TGAI_REGISTRANTS_LIST_TableUrl =
    this.db + '/api/geninfotgairegistrantslist';
  private apiGenInfo_REGULATORS_TableUrl =
    this.db + '/api/geninforegulatorstable';
  private apiGenInfo_BACKGROUND_TableUrl =
    this.db + '/api/geninfobackgrounddata';
  private apiGenInfo_EP_MARKETING_TableUrl =
    this.db + '/api/geninfoepmarketingdata';
  private apiGenInfo_SALES_INFO_TableUrl = this.db + '/api/toxsection11data';
  private apiGenInfo_ROEB_COMPLIANCE_AUDIT_TRAIL_TableUrl =
    this.db + '/api/geninforoebcomplianceaudittrail';
  private apiGenInfo_INFO_LINE_TableUrl = this.db + '/api/geninfoinfolinetable';
  private apiGenInfo_TGAI_EP_UNFULFILLED_CONDITIONS_TableUrl =
    this.db + '/api/geninfotgaiepunfulfilledconditionstable';
  private apiGenInfo_SCIENCE_TEAM_ALDs_TableUrl =
    this.db + '/api/geninfoscienceteamaldstable';
  private feedbackURL = this.db + '/api/sectionheadfeedback';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getActiveData(activeCode: string): Observable<any> {
    const url = `${this.apiUrl}/${activeCode}`;
    return this.http.get(url);
  }

  editRecord(record: {
    'Anchor Submission Number': string;
    'ALD Report to Generate': string;
    'Active Code': string;
    'Active Name': string;
    'Cluster Name': string;
    'Related Submission Numbers': string;
    'Submission Number': string;
    'Initiation Date': string;
    'ALD Number': number;
    'Submission Category': string;
    'Submission Type': string;
    Level: string;
    'ALD created on': string;
    'ALD Last Updated on': string;
    'ALD Approved on': string;
    'ALD Approved By': string;
    Evaluator: string;
    USCs: number;
    'Purpose of Submission': string;
    'Additional Purpose of Submission Comments': string;
    'Scoping Document Number': number;
    'SMC BN1': string;
    'SMC BN1 Date': string;
    'SMC BN2': string;
    'SMC BN2 Date': string;
    'Proposed Decision Document Number': number;
    'Final Decision Document Number': number;
    Outcome: string;
    'Aditional Outcome Reasons': string;
    'Next Assessment Date': string;
    'ALD Required': boolean;
    'Program Activity': string;
    'flag':number;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiUrl}/${record['Submission Number']}`;
    return this.http.put(url, JSON.stringify(record), { headers: headers });
  }

  getValueSection2Data(submissionNumber: string): Observable<any> {
    const url = `${this.apiValueSection2Url}/${submissionNumber}`;
    return this.http.get(url);
  }

  addNewItem(item: {
    submissionNumber: string | null;
    Reference_PMRA_Document_Numbers_Date: string;
    Reference_PMRA_Document_Numbers: string;
    Comments: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiValueSection2Url}`, JSON.stringify(item), {
      headers: headers,
    });
  }

  editItem(item: {
    id: number;
    submissionNumber: string | null;
    Reference_PMRA_Document_Numbers_Date: string;
    Reference_PMRA_Document_Numbers: string;
    Comments: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const id = item.id;
    const url = `${this.apiValueSection2Url}/${id}`;
    return this.http.put(url, JSON.stringify(item), { headers: headers });
  }

  deleteItem(id: string): Observable<any> {
    const url = `${this.apiValueSection2Url}/${id}`;
    return this.http.delete(url);
  }

  getValueSection3Data(submissionNumber: string): Observable<any> {
    const url = `${this.apiValueSection3Url}/${submissionNumber}`;
    return this.http.get(url);
  }

  addNewSection3Item(item: {
    submissionNumber: string | null;
    Study_Type: string;
    Document_Type: string;
    PMRA_Number: number;
    PMRA_System_Document_Location: string;
    Comments: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiValueSection3Url}`, JSON.stringify(item), {
      headers: headers,
    });
  }

  editSection3Item(item: {
    id: number;
    submissionNumber: string | null;
    Study_Type: string;
    Document_Type: string;
    PMRA_Number: number;
    PMRA_System_Document_Location: string;
    Comments: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const id = item.id;
    const url = `${this.apiValueSection3Url}/${id}`;
    return this.http.put(url, JSON.stringify(item), { headers: headers });
  }

  deleteSection3Item(id: string): Observable<any> {
    const url = `${this.apiValueSection3Url}/${id}`;
    return this.http.delete(url);
  }

  getValueSection4Data(submissionNumber: string): Observable<any> {
    const url = `${this.apiValueSection4Url}/${submissionNumber}`;
    return this.http.get(url);
  }

  addNewSection4Item(item: {
    submissionNumber: string | null;
    Registration_Number: number;
    Reference_PMRA_Document_Numbers: number;
    Comments: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiValueSection4Url}`, JSON.stringify(item), {
      headers: headers,
    });
  }

  editSection4Item(item: {
    id: number;
    submissionNumber: string | null;
    Registration_Number: number;
    Reference_PMRA_Document_Numbers: number;
    Comments: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const id = item.id;
    const url = `${this.apiValueSection4Url}/${id}`;
    return this.http.put(url, JSON.stringify(item), { headers: headers });
  }

  deleteSection4Item(id: string): Observable<any> {
    const url = `${this.apiValueSection4Url}/${id}`;
    return this.http.delete(url);
  }

  getValueData(submissionNumber: string): Observable<any> {
    const url = `${this.apiValueUrl}/${submissionNumber}`;
    return this.http.get(url);
  }

  //Environment methods//
  getKeyDocsData(submissionNumber: string): Observable<any> {
    const url = `${this.apiKeyDocsUrl}/${submissionNumber}`;
    return this.http.get(url);
  }

  addNewKeyDocsItem(item: {
    Submission_Number: string | null;
    row_id: number;
    Document_Name: string;
    PMRA_Number: string;
    Comments: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiKeyDocsUrl}`, JSON.stringify(item), {
      headers: headers,
    });
  }

  editKeyDocsItem(item: {
    row_id: number;
    Submission_Number: string | null;
    Document_Name: string;
    PMRA_Number: string;
    Comments: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const id = item.row_id;
    const url = `${this.apiKeyDocsUrl}/${id}`;
    return this.http.put(url, JSON.stringify(item), { headers: headers });
  }

  deleteKeyDocsItem(id: number): Observable<any> {
    const url = `${this.apiKeyDocsUrl}/${id}`;
    return this.http.delete(url);
  }

  getSectionData(submissionNumber: string): Observable<any> {
    const url = `${this.apiSection3to9Url}/${submissionNumber}`;
    return this.http.get(url);
  }

  addNewSectionItem(item: {
    row_id: number;
    Submission_Number: string | null;
    Section_Number: string;
    Section_Name: string;
    Description: string;
    PMRA_Number: string;
    Potential_Flag: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiSection3to9Url}`, JSON.stringify(item), {
      headers: headers,
    });
  }

  editSectionItem(item: {
    row_id: number;
    Submission_Number: string | null;
    Section_Number: string;
    Section_Name: string;
    Description: string;
    PMRA_Number: string;
    Potential_Flag: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const id = item.row_id;
    const url = `${this.apiSection3to9Url}/${id}`;
    return this.http.put(url, JSON.stringify(item), { headers: headers });
  }

  deleteSectionItem(id: number): Observable<any> {
    const url = `${this.apiSection3to9Url}/${id}`;
    return this.http.delete(url);
  }

  //TOX Form//
  getSummaryTableData(submissionNumber: string): Observable<any> {
    const url = `${this.apiSummaryTableUrl}/${submissionNumber}`;
    return this.http.get(url);
  }

  addNewSummaryTableItem(item: {
    row_id: number;
    Submission_Number: string | null;
    CAS_Number: string;
    Exposure_Scenario: string;
    Exposure_Scenario_Subtype: string;
    Study: string;
    Point_of_Departure_and_End_Point: string;
    CAF_or_Target_MOE: number;
    Reference_Document: string;
    PMRA_Number: string;
    ARfD_Value: string;
    ARfD_Unit: string;
    Actual_End_Date: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiSummaryTableUrl}`, JSON.stringify(item), {
      headers: headers,
    });
  }

  editSummaryTableItem(item: {
    row_id: number;
    Submission_Number: string | null;
    CAS_Number: string;
    Exposure_Scenario: string;
    Exposure_Scenario_Subtype: string;
    Study: string;
    Point_of_Departure_and_End_Point: string;
    CAF_or_Target_MOE: number;
    Reference_Document: string;
    PMRA_Number: string;
    ARfD_Value: string;
    ARfD_Unit: string;
    Actual_End_Date: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const id = item.row_id;
    const url = `${this.apiSummaryTableUrl}/${id}`;
    return this.http.put(url, JSON.stringify(item), { headers: headers });
  }

  deleteSummaryTableItem(id: number): Observable<any> {
    const url = `${this.apiSummaryTableUrl}/${id}`;
    return this.http.delete(url);
  }

  getTOXSECTIONS22232434TableData(submissionNumber: string): Observable<any> {
    const url = `${this.apiTOXSECTIONS22232434TableUrl}/${submissionNumber}`;
    return this.http.get(url);
  }

  addNewTOXSECTIONS22232434TableItem(item: {
    row_id: number;
    Submission_Number: string | null;
    Section_Number: string;
    PCPA_Factor_Characterized: boolean;
    Cumulative_Risk_Assessment_Required_Flag: boolean;
    Cumulative_Risk_Assessment_Status: string;
    Date: string;
    Name_of_Reference_Document: string;
    Reference_Document_Table_of_Content_Reference: string;
    PMRA_Number: string;
    Comments: string;
    Reference_TOX_Review: string;
    Database_Completion_Comments: string;
    Tier_1_Studies_Comment: string;
    Reference_Dose_Submission_Number: string;
  }): Observable<any> {
    const Headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      `${this.apiTOXSECTIONS22232434TableUrl}`,
      JSON.stringify(item),
      { headers: Headers }
    );
  }

  editTOXSECTIONS22232434TableItem(item: {
    row_id: number;
    Submission_Number: string | null;
    Section_Number: string;
    PCPA_Factor_Characterized: boolean;
    Cumulative_Risk_Assessment_Required_Flag: boolean;
    Cumulative_Risk_Assessment_Status: string;
    Date: string;
    Name_of_Reference_Document: string;
    Reference_Document_Table_of_Content_Reference: string;
    PMRA_Number: string;
    Comments: string;
    Reference_TOX_Review: string;
    Database_Completion_Comments: string;
    Tier_1_Studies_Comment: string;
    Reference_Dose_Submission_Number: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const id = item.row_id;
    const url = `${this.apiTOXSECTIONS22232434TableUrl}/${id}`;
    return this.http.put(url, JSON.stringify(item), { headers: headers });
  }

  deleteTOXSECTIONS22232434TableItem(id: number): Observable<any> {
    const url = `${this.apiTOXSECTIONS22232434TableUrl}/${id}`;
    return this.http.delete(url);
  }

  getTOXSECTION5TableData(submissionNumber: string): Observable<any> {
    const url = `${this.apiTOXSECTION5TableUrl}/${submissionNumber}`;
    return this.http.get(url);
  }

  addNewTOXSECTION5TableItem(item: {
    row_id: number;
    Submission_Number: string | null;
    PMRA_Number_of_the_Record_of_Residue_Definition_Decision: string;
    List_of_Metabolites: string;
    PMRA_Number: string;
    Category: string;
  }): Observable<any> {
    const Headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      `${this.apiTOXSECTION5TableUrl}`,
      JSON.stringify(item),
      { headers: Headers }
    );
  }

  editTOXSECTION5TableItem(item: {
    row_id: number;
    Submission_Number: string | null;
    PMRA_Number_of_the_Record_of_Residue_Definition_Decision: string;
    List_of_Metabolites: string;
    PMRA_Number: string;
    Category: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const id = item.row_id;
    const url = `${this.apiTOXSECTION5TableUrl}/${id}`;
    return this.http.put(url, JSON.stringify(item), { headers: headers });
  }

  deleteTOXSECTION5TableItem(id: number): Observable<any> {
    const url = `${this.apiTOXSECTION5TableUrl}/${id}`;
    return this.http.delete(url);
  }

  getTOXSECTION6TableData(submissionNumber: string): Observable<any> {
    const url = `${this.apiTOXSECTION6TableUrl}/${submissionNumber}`;
    return this.http.get(url);
  }

  addNewTOXSECTION6TableItem(item: {
    row_id: number;
    Submission_Number: string | null;
    Subsection_Number: string;
    Impurity_Contaminant_Name: string;
    Use_Site_Categories: string;
    Acceptable_Level: string;
    PMRA_Number: string;
    Name_of_Reference_Document: string;
    Comments: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      `${this.apiTOXSECTION6TableUrl}`,
      JSON.stringify(item),
      {
        headers: headers,
      }
    );
  }

  editTOXSECTION6TableItem(item: {
    row_id: number;
    Submission_Number: string | null;
    Subsection_Number: string;
    Impurity_Contaminant_Name: string;
    Use_Site_Categories: string;
    Acceptable_Level: string;
    PMRA_Number: string;
    Name_of_Reference_Document: string;
    Comments: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const id = item.row_id;
    const url = `${this.apiTOXSECTION6TableUrl}/${id}`;
    return this.http.put(url, JSON.stringify(item), { headers: headers });
  }

  deleteTOXSECTION6TableItem(id: number): Observable<any> {
    const url = `${this.apiTOXSECTION6TableUrl}/${id}`;
    return this.http.delete(url);
  }

  // Get data for a specific submission number
  getTOXSECTION7TableData(submissionNumber: string): Observable<any> {
    const url = `${this.apiTOXSECTION7TableUrl}/${submissionNumber}`;
    return this.http.get(url);
  }

  // Add a new item to the table
  addNewTOXSECTION7TableItem(item: {
    row_id: number;
    Submission_Number: string | null;
    Subsection_Number: string;
    Document_Type: string;
    Date: string;
    PMRA_Number: string;
    Registration_Number: string;
    Comments: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      `${this.apiTOXSECTION7TableUrl}`,
      JSON.stringify(item),
      {
        headers: headers,
      }
    );
  }

  // Edit an existing item in the table
  editTOXSECTION7TableItem(item: {
    row_id: number;
    Submission_Number: string | null;
    Subsection_Number: string;
    Document_Type: string;
    Date: string;
    PMRA_Number: string;
    Registration_Number: string;
    Comments: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const id = item.row_id;
    const url = `${this.apiTOXSECTION7TableUrl}/${id}`;
    return this.http.put(url, JSON.stringify(item), { headers: headers });
  }

  // Delete an item from the table
  deleteTOXSECTION7TableItem(id: number): Observable<any> {
    const url = `${this.apiTOXSECTION7TableUrl}/${id}`;
    return this.http.delete(url);
  }

  // Get data for a specific submission number
  getTOXSECTION8TableData(submissionNumber: string): Observable<any> {
    const url = `${this.apiTOXSECTION8TableUrl}/${submissionNumber}`;
    return this.http.get(url);
  }

  // Add a new item to the table
  addNewTOXSECTION8TableItem(item: {
    row_id: number;
    Submission_Number: string | null;
    Evaluator: string;
    Date: string;
    Comments: string;
    Reference_PMRA_Document_Number: string;
    PMRA_Number: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      `${this.apiTOXSECTION8TableUrl}`,
      JSON.stringify(item),
      {
        headers: headers,
      }
    );
  }

  // Edit an existing item in the table
  editTOXSECTION8TableItem(item: {
    row_id: number;
    Submission_Number: string | null;
    Evaluator: string;
    Date: string;
    Comments: string;
    Reference_PMRA_Document_Number: string;
    PMRA_Number: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const id = item.row_id;
    const url = `${this.apiTOXSECTION8TableUrl}/${id}`;
    return this.http.put(url, JSON.stringify(item), { headers: headers });
  }

  // Delete an item from the table
  deleteTOXSECTION8TableItem(id: number): Observable<any> {
    const url = `${this.apiTOXSECTION8TableUrl}/${id}`;
    return this.http.delete(url);
  }

  // Get data for a specific submission number
  getTOXSECTION9TableData(submissionNumber: string): Observable<any> {
    const url = `${this.apiTOXSECTION9TableUrl}/${submissionNumber}`;
    return this.http.get(url);
  }

  // Add a new item to the table
  addNewTOXSECTION9TableItem(item: {
    row_id: number;
    Submission_Number: string | null;
    Subsection_Name: string;
    Study_Type: string;
    Document_Type: string;
    PMRA_Number: string;
    Document_Reference: string;
    Comments: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      `${this.apiTOXSECTION9TableUrl}`,
      JSON.stringify(item),
      {
        headers: headers,
      }
    );
  }

  // Edit an existing item in the table
  editTOXSECTION9TableItem(item: {
    row_id: number;
    Submission_Number: string | null;
    Subsection_Name: string;
    Study_Type: string;
    Document_Type: string;
    PMRA_Number: string;
    Document_Reference: string;
    Comments: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const id = item.row_id;
    const url = `${this.apiTOXSECTION9TableUrl}/${id}`;
    return this.http.put(url, JSON.stringify(item), { headers: headers });
  }

  // Delete an item from the table
  deleteTOXSECTION9TableItem(id: string): Observable<any> {
    const url = `${this.apiTOXSECTION9TableUrl}/${id}`;
    return this.http.delete(url);
  }

  // Get data for a specific submission number
  getTOXSECTION10TableData(submissionNumber: string): Observable<any> {
    const url = `${this.apiTOXSECTION10TableUrl}/${submissionNumber}`;
    return this.http.get(url);
  }

  // Add a new item to the table
  addNewTOXSECTION10TableItem(item: {
    row_id: number;
    Submission_Number: string | null;
    International_Organization: string;
    Document_Title: string;
    PMRA_Number: string;
    Date_of_Publication: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      `${this.apiTOXSECTION10TableUrl}`,
      JSON.stringify(item),
      {
        headers: headers,
      }
    );
  }

  // Edit an existing item in the table
  editTOXSECTION10TableItem(item: {
    row_id: number;
    Submission_Number: string | null;
    International_Organization: string;
    Document_Title: string;
    PMRA_Number: string;
    Date_of_Publication: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const id = item.row_id;
    const url = `${this.apiTOXSECTION10TableUrl}/${id}`;
    return this.http.put(url, JSON.stringify(item), { headers: headers });
  }

  // Delete an item from the table
  deleteTOXSECTION10TableItem(id: string): Observable<any> {
    const url = `${this.apiTOXSECTION10TableUrl}/${id}`;
    return this.http.delete(url);
  }

  // Get data for a specific submission number
  getTOXSECTION11TableData(submissionNumber: string): Observable<any> {
    const url = `${this.apiTOXSECTION11TableUrl}/${submissionNumber}`;
    return this.http.get(url);
  }

  // Add a new item to the table
  addNewTOXSECTION11TableItem(item: {
    row_id: number;
    Submission_Number: string | null;
    Search_Conducted_By: string;
    Evaluator: string;
    Search_Conducted_Date: string;
    Search_String: string;
    PMRA_Number: string;
    Comments: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      `${this.apiTOXSECTION11TableUrl}`,
      JSON.stringify(item),
      {
        headers: headers,
      }
    );
  }

  // Edit an existing item in the table
  editTOXSECTION11TableItem(item: {
    row_id: number;
    Submission_Number: string | null;
    Search_Conducted_By: string;
    Evaluator: string;
    Search_Conducted_Date: string;
    Search_String: string;
    PMRA_Number: string;
    Comments: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const id = item.row_id;
    const url = `${this.apiTOXSECTION11TableUrl}/${id}`;
    return this.http.put(url, JSON.stringify(item), { headers: headers });
  }

  // Delete an item from the table
  deleteTOXSECTION11TableItem(id: number): Observable<any> {
    const url = `${this.apiTOXSECTION11TableUrl}/${id}`;
    return this.http.delete(url);
  }

  ///////////////General Info Methods //////////////////////
  getGenInfo_SECTION_2_TableItem(submissionNumber: string): Observable<any> {
    const url = `${this.apiGenInfo_SECTION_2_TableUrl}/${submissionNumber}`;
    return this.http.get(url);
  }

  // Add a new item to the table
  addNewGenInfo_SECTION_2_TableItem(item: {
    row_id: number;
    Submission_Number: string | null;
    Subsection_Name: string;
    Active_Code: string;
    Active_Name: string;
    CAS_Number: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      `${this.apiGenInfo_SECTION_2_TableUrl}`,
      JSON.stringify(item),
      {
        headers: headers,
      }
    );
  }

  // Edit an existing item in the table
  editGenInfo_SECTION_2_TableItem(item: {
    row_id: number;
    Submission_Number: string | null;
    Subsection_Name: string;
    Active_Code: string;
    Active_Name: string;
    CAS_Number: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const id = item.row_id;
    const url = `${this.apiGenInfo_SECTION_2_TableUrl}/${id}`;
    return this.http.put(url, JSON.stringify(item), { headers: headers });
  }

  // Delete an item from the table
  deleteGenInfo_SECTION_2_TableItem(id: string): Observable<any> {
    const url = `${this.apiGenInfo_SECTION_2_TableUrl}/${id}`;
    return this.http.delete(url);
  }

  // Get a specific item from the table
  getGenInfo_SECTION_3_TableItem(submissionNumber: string): Observable<any> {
    const url = `${this.apiGenInfo_SECTION_3_TableUrl}/${submissionNumber}`;
    return this.http.get(url);
  }

  // Add a new item to the table
  addNewGenInfo_SECTION_3_TableItem(item: {
    row_id: number;
    Submission_Number: string | null;
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
    Date_of_SMC2_BN_for_RVD: string;
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
    Date_of_SMC2_BN_for_PSR: string;
    PMRA_Number_SMC2_PSR: string;
    Associated_Publication_SRD: string;
    PMRA_Number_SRD: string;
    Date_of_SMC2_BN_for_SRD: string;
    PMRA_Number_SMC2_SRD: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      `${this.apiGenInfo_SECTION_3_TableUrl}`,
      JSON.stringify(item),
      {
        headers: headers,
      }
    );
  }
  // Edit an existing item in the table
  editGenInfo_SECTION_3_TableItem(item: {
    row_id: number;
    Submission_Number: string | null;
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
    Date_of_SMC2_BN_for_RVD: string;
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
    Date_of_SMC2_BN_for_PSR: string;
    PMRA_Number_SMC2_PSR: string;
    Associated_Publication_SRD: string;
    PMRA_Number_SRD: string;
    Date_of_SMC2_BN_for_SRD: string;
    PMRA_Number_SMC2_SRD: string;
  }): Observable<any> {
    console.log('inside edit');
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const id = item.row_id;
    const url = `${this.apiGenInfo_SECTION_3_TableUrl}/${id}`;
    return this.http.put(url, JSON.stringify(item), { headers: headers });
  }

  // Delete an item from the table
  deleteGenInfo_SECTION_3_TableItem(id: string): Observable<any> {
    const url = `${this.apiGenInfo_SECTION_3_TableUrl}/${id}`;
    return this.http.delete(url);
  }

  // Get a single item from the table by submission number
  getGenInfo_TGAI_REGISTRANTS_LIST_TableItem(
    submissionNumber: string
  ): Observable<any> {
    const url = `${this.apiGenInfo_TGAI_REGISTRANTS_LIST_TableUrl}/${submissionNumber}`;
    return this.http.get(url);
  }

  // Add a new item to the table
  addNewGenInfo_TGAI_REGISTRANTS_LIST_TableItem(item: {
    Submission_Number: string | null;
    Registrant_Name: string;
    Registrant_Assigned_Code: string;
    Registrant_Assigned_Number: string;
    Registration_Number: string;
    Date_First_Registered: string;
    Initial_Submission_Category: string;
    Initial_Submission_Type: string;
    USC_List: number;
    Registration_Status: string;
    Comments: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      `${this.apiGenInfo_TGAI_REGISTRANTS_LIST_TableUrl}`,
      JSON.stringify(item),
      {
        headers: headers,
      }
    );
  }

  // Edit an existing item in the table
  editGenInfo_TGAI_REGISTRANTS_LIST_TableItem(item: {
    Submission_Number: string | null;
    Registrant_Name: string;
    Registrant_Assigned_Code: string;
    Registrant_Assigned_Number: string;
    Registration_Number: string;
    Date_First_Registered: string;
    Initial_Submission_Category: string;
    Initial_Submission_Type: string;
    USC_List: number;
    Registration_Status: string;
    Comments: string;
    row_id: number;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiGenInfo_TGAI_REGISTRANTS_LIST_TableUrl}/${item.row_id}`;
    return this.http.put(url, JSON.stringify(item), { headers: headers });
  }

  // Delete an item from the table by submission number
  deleteGenInfo_TGAI_REGISTRANTS_LIST_TableItem(
    submissionNumber: string
  ): Observable<any> {
    const url = `${this.apiGenInfo_TGAI_REGISTRANTS_LIST_TableUrl}/${submissionNumber}`;
    return this.http.delete(url);
  }

  // Get a specific item from the table by submission number
  getGenInfo_REGULATORS_TableItem(submissionNumber: string): Observable<any> {
    const url = `${this.apiGenInfo_REGULATORS_TableUrl}/${submissionNumber}`;
    return this.http.get(url);
  }

  // Add a new item to the table
  addNewGenInfo_REGULATORS_TableItem(item: {
    Submission_Number: string | null;
    Regulator: string;
    Status_of_Active_Ingredient: string;
    Status_date: string;
    Comments: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      `${this.apiGenInfo_REGULATORS_TableUrl}`,
      JSON.stringify(item),
      {
        headers: headers,
      }
    );
  }

  // Edit an existing item in the table
  editGenInfo_REGULATORS_TableItem(item: {
    Submission_Number: string | null;
    Regulator: string;
    Status_of_Active_Ingredient: string;
    Status_date: string;
    Comments: string;
    row_id: number;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiGenInfo_REGULATORS_TableUrl}/${item.row_id}`;
    return this.http.put(url, JSON.stringify(item), { headers: headers });
  }

  // Delete an item from the table
  deleteGenInfo_REGULATORS_TableItem(
    submissionNumber: string
  ): Observable<any> {
    const url = `${this.apiGenInfo_REGULATORS_TableUrl}/${submissionNumber}`;
    return this.http.delete(url);
  }

  getGenInfo_BACKGROUND_TableItems(submissionNumber: string): Observable<any> {
    const url = `${this.apiGenInfo_BACKGROUND_TableUrl}/${submissionNumber}`;
    return this.http.get(url);
  }

  addNewGenInfo_BACKGROUND_TableItem(item: {
    row_id: number;
    Submission_Number: string | null;
    Subsection_Name: string;
    Subsection_ID: string;
    Conducted: boolean;
    Submission_Status_Level: string;
    Submission_Status_Activity: string;
    PMRA_Number: number;
    Purpose: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      `${this.apiGenInfo_BACKGROUND_TableUrl}`,
      JSON.stringify(item),
      {
        headers: headers,
      }
    );
  }

  editGenInfo_BACKGROUND_TableItem(item: {
    row_id: number;
    Submission_Number: string | null;
    Subsection_Name: string;
    Subsection_ID: string;
    Conducted: boolean;
    Submission_Status_Level: string;
    Submission_Status_Activity: string;
    PMRA_Number: number;
    Purpose: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const id = item.row_id;
    const url = `${this.apiGenInfo_BACKGROUND_TableUrl}/${id}`;
    return this.http.put(url, JSON.stringify(item), { headers: headers });
  }

  deleteGenInfo_BACKGROUND_TableItem(id: string): Observable<any> {
    const url = `${this.apiGenInfo_BACKGROUND_TableUrl}/${id}`;
    return this.http.delete(url);
  }

  // Get a single item from the table
  getGenInfo_EP_MARKETING_TableItem(submissionNumber: string): Observable<any> {
    const url = `${this.apiGenInfo_EP_MARKETING_TableUrl}/${submissionNumber}`;
    return this.http.get(url);
  }
  // Add a new item to the table
  addNewGenInfo_EP_MARKETING_TableItem(item: {
    Submission_Number: string | null;
    Restrictions: string;
    Registration_Number: number;
    Product_Name: string;
    Historical: boolean;
    Current: boolean;
    From_Submission_Number: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      `${this.apiGenInfo_EP_MARKETING_TableUrl}`,
      JSON.stringify(item),
      {
        headers: headers,
      }
    );
  }

  // Edit an existing item in the table
  editGenInfo_EP_MARKETING_TableItem(item: {
    Submission_Number: string | null;
    Restrictions: string;
    Registration_Number: number;
    Product_Name: string;
    Historical: boolean;
    Current: boolean;
    From_Submission_Number: string;
    row_id: number;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiGenInfo_EP_MARKETING_TableUrl}/${item.row_id}`;
    return this.http.put(url, JSON.stringify(item), { headers: headers });
  }

  // Delete an item from the table
  deleteGenInfo_EP_MARKETING_TableItem(
    submissionNumber: string
  ): Observable<any> {
    const url = `${this.apiGenInfo_EP_MARKETING_TableUrl}/${submissionNumber}`;
    return this.http.delete(url);
  }

  // Get an item from the table based on submission number
  getGenInfo_SALES_INFO_TableItem(submissionNumber: string): Observable<any> {
    const url = `${this.apiGenInfo_SALES_INFO_TableUrl}/${submissionNumber}`;
    return this.http.get(url);
  }

  // Add a new item to the table
  addNewGenInfo_SALES_INFO_TableItem(item: {
    submissionNumber: string;
    row_id: number;
    atypicalSalesInfo: string;
    dateSalesInfoProvided: Date;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      `${this.apiGenInfo_SALES_INFO_TableUrl}`,
      JSON.stringify(item),
      {
        headers: headers,
      }
    );
  }

  // Edit an existing item in the table
  editGenInfo_SALES_INFO_TableItem(item: {
    submissionNumber: string;
    row_id: number;
    atypicalSalesInfo: string;
    dateSalesInfoProvided: Date;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiGenInfo_SALES_INFO_TableUrl}/${item.submissionNumber}`;
    return this.http.put(url, JSON.stringify(item), { headers: headers });
  }

  // Delete an item from the table
  deleteGenInfo_SALES_INFO_TableItem(
    submissionNumber: string
  ): Observable<any> {
    const url = `${this.apiGenInfo_SALES_INFO_TableUrl}/${submissionNumber}`;
    return this.http.delete(url);
  }

  // Get an item from the table based on submission number and row ID
  getGenInfo_ROEB_COMPLIANCE_AUDIT_TRAIL_TableItem(
    Submission_Number: string
  ): Observable<any> {
    const url = `${this.apiGenInfo_ROEB_COMPLIANCE_AUDIT_TRAIL_TableUrl}/${Submission_Number}`;
    return this.http.get(url);
  }

  // Add a new item to the table
  addNewGenInfo_ROEB_COMPLIANCE_AUDIT_TRAIL_TableItem(item: {
    Submission_Number: string | null;
    row_id: number;
    Sector: string;
    PCPA_Contravention: string;
    Date_Of_Reported_Contravention: string;
    Product_Description: string;
    Corrective_Action_Taken: string;
    Compliance_Status: string;
    Additional_Information: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      `${this.apiGenInfo_ROEB_COMPLIANCE_AUDIT_TRAIL_TableUrl}`,
      JSON.stringify(item),
      {
        headers: headers,
      }
    );
  }

  // Edit an existing item in the table
  editGenInfo_ROEB_COMPLIANCE_AUDIT_TRAIL_TableItem(item: {
    Submission_Number: string | null;
    row_id: number;
    Sector: string;
    PCPA_Contravention: string;
    Date_Of_Reported_Contravention: string;
    Product_Description: string;
    Corrective_Action_Taken: string;
    Compliance_Status: string;
    Additional_Information: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiGenInfo_ROEB_COMPLIANCE_AUDIT_TRAIL_TableUrl}/${item.row_id}`;
    return this.http.put(url, JSON.stringify(item), { headers: headers });
  }

  // Delete an item from the table based on submission number and row ID
  deleteGenInfo_ROEB_COMPLIANCE_AUDIT_TRAIL_TableItem(
    row_id: number
  ): Observable<any> {
    const url = `${this.apiGenInfo_ROEB_COMPLIANCE_AUDIT_TRAIL_TableUrl}/${row_id}`;
    return this.http.delete(url);
  }

  // Get an item from the table based on submission number and row ID
  getGenInfo_INFO_LINE_TableItem(Submission_Number: string): Observable<any> {
    const url = `${this.apiGenInfo_INFO_LINE_TableUrl}/${Submission_Number}`;
    return this.http.get(url);
  }

  // Add a new item to the table
  addNewGenInfo_INFO_LINE_TableItem(item: {
    Submission_Number: string | null;
    row_id: number;
    Date_Received: string;
    Comments_Received: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      `${this.apiGenInfo_INFO_LINE_TableUrl}`,
      JSON.stringify(item),
      {
        headers: headers,
      }
    );
  }

  // Edit an existing item in the table
  editGenInfo_INFO_LINE_TableItem(item: {
    Submission_Number: string | null;
    row_id: number;
    Date_Received: string;
    Comments_Received: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiGenInfo_INFO_LINE_TableUrl}/${item.row_id}`;
    return this.http.put(url, JSON.stringify(item), { headers: headers });
  }

  // Delete an item from the table based on submission number and row ID
  deleteGenInfo_INFO_LINE_TableItem(row_id: number): Observable<any> {
    const url = `${this.apiGenInfo_INFO_LINE_TableUrl}/${row_id}`;
    return this.http.delete(url);
  }

  // Get an item from the table based on submission number and row ID
  getGenInfo_TGAI_EP_UNFULFILLED_CONDITIONS_TableItem(
    submissionNumber: string
  ): Observable<any> {
    const url = `${this.apiGenInfo_TGAI_EP_UNFULFILLED_CONDITIONS_TableUrl}/${submissionNumber}`;
    return this.http.get(url);
  }

  // Add a new item to the table
  addNewGenInfo_TGAI_EP_UNFULFILLED_CONDITIONS_TableItem(item: {
    Submission_Number: string | null;
    row_id: number;
    State: boolean;
    TGAI_EP_MA: string;
    Registration_Number: number;
    PMRA_Number: number;
    Due_date: string;
    DACO_Number: string;
    Unfulfilled_Requirements: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      `${this.apiGenInfo_TGAI_EP_UNFULFILLED_CONDITIONS_TableUrl}`,
      JSON.stringify(item),
      {
        headers: headers,
      }
    );
  }

  // Edit an existing item in the table
  editGenInfo_TGAI_EP_UNFULFILLED_CONDITIONS_TableItem(item: {
    Submission_Number: string | null;
    row_id: number;
    State: boolean;
    TGAI_EP_MA: string;
    Registration_Number: number;
    PMRA_Number: number;
    Due_date: string;
    DACO_Number: string;
    Unfulfilled_Requirements: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiGenInfo_TGAI_EP_UNFULFILLED_CONDITIONS_TableUrl}/${item.row_id}`;
    return this.http.put(url, JSON.stringify(item), { headers: headers });
  }

  // Delete an item from the table based on submission number and row ID
  deleteGenInfo_TGAI_EP_UNFULFILLED_CONDITIONS_TableItem(
    row_id: number
  ): Observable<any> {
    const url = `${this.apiGenInfo_TGAI_EP_UNFULFILLED_CONDITIONS_TableUrl}/${row_id}`;
    return this.http.delete(url);
  }

  // Get an item from the table based on submission number
  getGenInfo_SCIENCE_TEAM_ALDs_TableItem(
    submissionNumber: string
  ): Observable<any> {
    const url = `${this.apiGenInfo_SCIENCE_TEAM_ALDs_TableUrl}/${submissionNumber}`;
    return this.http.get(url);
  }

  // Add a new item to the table
  addNewGenInfo_SCIENCE_TEAM_ALDs_TableItem(item: {
    Submission_Number: string | null;
    row_id: number;
    TOX: string;
    TOX_Details: string;
    Dietary: string;
    Dietary_Details: string;
    Occupational: string;
    Occupational_Details: string;
    IRP: string;
    IRP_Details: string;
    RRS: string;
    RRS_Details: string;
    EAD: string;
    EAD_Details: string;
    EAD_WM: string;
    EAD_WM_Details: string;
    VALUE: string;
    VALUE_Details: string;
    CES: string;
    CES_Details: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      `${this.apiGenInfo_SCIENCE_TEAM_ALDs_TableUrl}`,
      JSON.stringify(item),
      {
        headers: headers,
      }
    );
  }

  // Edit an existing item in the table
  editGenInfo_SCIENCE_TEAM_ALDs_TableItem(item: {
    Submission_Number: string | null;
    row_id: number;
    TOX: string;
    TOX_Details: string;
    Dietary: string;
    Dietary_Details: string;
    Occupational: string;
    Occupational_Details: string;
    IRP: string;
    IRP_Details: string;
    RRS: string;
    RRS_Details: string;
    EAD: string;
    EAD_Details: string;
    EAD_WM: string;
    EAD_WM_Details: string;
    VALUE: string;
    VALUE_Details: string;
    CES: string;
    CES_Details: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiGenInfo_SCIENCE_TEAM_ALDs_TableUrl}/${item.row_id}`;
    return this.http.put(url, JSON.stringify(item), { headers: headers });
  }

  // Delete an item from the table
  deleteGenInfo_SCIENCE_TEAM_ALDs_TableItem(
    submissionNumber: string
  ): Observable<any> {
    const url = `${this.apiGenInfo_SCIENCE_TEAM_ALDs_TableUrl}/${submissionNumber}`;
    return this.http.delete(url);
  }

  addNewSectionHeadFeedback(item: {
    SubmissionNumber: string | null;
    Comments: string;
    Feedback: string;
    DateofFeedback: string;
    activeCode: string;
    FormLink: string;
    SectionHeadName: string;
    EvaluatorName: string;
    updated: string;
    flags:number;
    id:number;
    Form:string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.feedbackURL}`, JSON.stringify(item), {
      headers: headers,
    });
  }

  getSectionHeadFeedback(
    submissionNumber: string,
    report:string
  ): Observable<any> {
    const url = `${this.feedbackURL}/${submissionNumber}/${report}`;
    return this.http.get(url);
  }

  // Edit an existing item in the table
  editSectionHeadFeedback(item: {
    SubmissionNumber: string | null;
    Comments: string;
    Feedback: string;
    DateofFeedback: string;
    activeCode: string;
    FormLink: string;
    SectionHeadName: string;
    EvaluatorName: string;
    updated: string;
    flags:number;
    id:number;
    Form:string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.feedbackURL}/${item.id}`;
    return this.http.put(url, JSON.stringify(item), { headers: headers });
  }
}
