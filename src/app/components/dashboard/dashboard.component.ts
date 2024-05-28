import { Component, OnInit } from "@angular/core";
import { UploadService } from 'src/app/Services/uploadService.service';
import { AgChartOptions } from 'ag-charts-community';
import { KeycloakService } from "keycloak-angular";
import { GetYearService } from "src/app/Services/year.service";
import { getYearsObj } from "../constants/generate-years";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayData;
  public chartOptions: AgChartOptions;
  isLoading: boolean = false;

  providerSums = {};
  selectedYear: number = 2024; // Default selected year
  years: any = [];

  constructor(
    private uploadservice: UploadService,
    private yearService: GetYearService
  ) { }

  ngOnInit() {
    this.generateYears();
    this.getChartByYear(); // Load pie chart for default selected year
  } 

  generateYears() {
    ({ currentYear: this.selectedYear, years: this.years } = getYearsObj());
  }

  getChartByYear() {
    this.isLoading = true; // Set loading state to true
    this.yearService.getYear(this.selectedYear).subscribe(
      (response) => {
        console.log(`Data for year ${this.selectedYear}:`, response);
        this.updatePieChart(response);
        this.isLoading = false; // Set loading state to false after data retrieval
      },
      (error) => {
        console.error(`Error fetching data for year ${this.selectedYear}:`, error);
        this.isLoading = false; // Ensure loading state is reset on error
      }
    );
  }

  onSelectedYearChange(event) {
    this.selectedYear = event.value;
    console.log(this.selectedYear);
    this.getChartByYear(); // Load pie chart for selected year
  }

  updatePieChart(data) {
    this.displayData = data;
    console.log("called", this.displayData);

    // Initialize provider sums with all categories set to zero
    this.providerSums = {};

    this.displayData.forEach((obj) => {
      let coverageDate = obj.id.coverageDates;
    
      if (coverageDate) {
        const dateRange = coverageDate.split('-'); // Split the date range into start and end dates
        const startDate = new Date(dateRange[0]); // Parse the start date
        const startYear = startDate.getFullYear(); // Get the year from the start date
    
        const chargeAmount = parseFloat(obj.chargeAmount);
        if (startYear === this.selectedYear) { // Example condition for the year
          const provider = obj.providerName;

          if (!this.providerSums[provider]) {
            this.providerSums[provider] = { positive: 0, negative: 0 };
          }

          if (chargeAmount >= 0) {
            this.providerSums[provider].positive += chargeAmount;
          } else {
            this.providerSums[provider].negative += Math.abs(chargeAmount);
          }
        }
      }
    });

    console.log(this.providerSums);

    // Initialize chart after data is loaded
    this.initializeChart();
  }

  initializeChart() {
    console.log('data', this.transformData());
    this.chartOptions = {
      data: this.transformData(),
      title: {
        text: "Providers Charge Amount",
      },
      series: [
        {
          type: "pie",
          angleKey: "amount",
          calloutLabelKey: "asset",
          sectorLabelKey: "amount",
          sectorLabel: {
            color: "white",
            fontWeight: "bold",
            formatter: ({ value }) => `$${(value / 1000).toFixed(2)}K`,
          },
        },
      ],
    };
    console.log(this.chartOptions);
  }

  transformData() {
    const transformedData = [];

    for (const provider in this.providerSums) {
      transformedData.push({ asset: `${provider} (Positive)`, amount: this.providerSums[provider].positive });
      transformedData.push({ asset: `${provider} (Negative)`, amount: this.providerSums[provider].negative });
    }

    return transformedData;
  }
}
