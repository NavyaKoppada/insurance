import { Component, OnInit } from "@angular/core";
import { UploadService } from 'src/app/Services/uploadService.service';
import { AgChartOptions } from 'ag-charts-community';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayData;
  public chartOptions: AgChartOptions;
  uhc_sum = 0;
  uhg_sum = 0;

  constructor(private uploadservice: UploadService) { }

  ngOnInit() {
    this.displayPieChart();
  }

  displayPieChart() {
    this.uploadservice.getAllInvoices().subscribe((data) => {
      this.displayData = data;
      console.log("called", this.displayData);

      // Reset the sums to zero before recalculating
      this.uhc_sum = 0;
      this.uhg_sum = 0;

      this.displayData.forEach((obj) => {
        // console.log(obj);
        if (obj.providerName === 'UHC') {
          this.uhc_sum += parseFloat(obj.chargeAmount);
        } else if (obj.providerName === 'UHG') {
          this.uhg_sum += parseFloat(obj.chargeAmount);
        }
      });

      console.log(this.uhc_sum);
      console.log(this.uhg_sum);

      // Initialize chart after data is loaded
      this.initializeChart();
    }, error => {
      console.error('Error fetching data:', error);
      // Handle error gracefully, e.g., display a message to the user
    });
  }

  initializeChart() {
    console.log('data', this.transformData());
    this.chartOptions = {
      // data: this.transformData(),
      data: [
        { asset: 'UHG', amount: 6000 },
        { asset: 'UHC', amount: 7000 }
      ],
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
            formatter: ({ value }) => `$${(value / 1000).toFixed(0)}K`,
          },
        },
      ],
    };
    console.log(this.chartOptions);
  }

  transformData() {
    console.log("hii")
    return [
      { asset: 'UHG', amount: this.uhg_sum },
      { asset: 'UHC', amount: this.uhc_sum }
    ];
  }
}
