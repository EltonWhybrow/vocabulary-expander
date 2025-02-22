import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CloudData, CloudOptions, TagCloudComponent, ZoomOnHoverOptions } from 'angular-tag-cloud-module';

@Component({
  selector: 'app-cloud',
  standalone: true,
  imports: [TagCloudComponent],
  templateUrl: './cloud.component.html',
  styleUrl: './cloud.component.scss'
})
export class CloudComponent {

  constructor(private snackBar: MatSnackBar) {

  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Dismiss', {  // Add the options object as the second argument
      duration: 3000, // Auto-close in 3 seconds
      horizontalPosition: 'end', // 'start' | 'center' | 'end'
      verticalPosition: 'bottom', // 'top' | 'bottom'
      panelClass: ['snackbar-error'], // Apply custom styles
    });
  }

  copyToClipboard(clicked: CloudData) {
    // Create a temporary textarea element to hold the word text
    const textarea = document.createElement('textarea');
    textarea.value = clicked.text;
    document.body.appendChild(textarea);
    textarea.select();  // Select the text
    document.execCommand('copy');  // Copy the text to the clipboard
    document.body.removeChild(textarea);  // Remove the temporary textarea

    this.openSnackBar(`Copied word '${clicked.text}'!`);
  }

  zoomOnHoverOptions: ZoomOnHoverOptions = {
    scale: 1.1, // Elements will become 130 % of current zize on hover
    transitionTime: .5, // it will take 1.2 seconds until the zoom level defined in scale property has been reached
    delay: 0.2, // Zoom will take affect after 0.8 seconds
    color: '#fab222',
  };

  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the width of the upper element multiplied by the value
    width: 1,
    // if height is between 0 and 1 it will be set to the height of the upper element multiplied by the value
    height: 700,
    overflow: false,
    randomizeAngle: true,
    delay: 200,
    zoomOnHover: this.zoomOnHoverOptions,
    realignOnResize: true
  };



  tagCloudData: CloudData[] = [
    {
      "text": "Laconic",
      "weight": 1,
      "color": "#FFD279",
      "link": "http://google.com",
      "external": true
    },
    {
      "text": "serendipity",
      "weight": 10,
      "color": "#FFD279",

    },
    {
      "text": "Vivid",
      "weight": 5,
      "color": "#FFD279"
    },
    {
      "text": "Grace",
      "weight": 6,
      "color": "#FFD279"
    },
    {
      "text": "Glimmer",
      "weight": 7,
      "color": "#FFD279"
    },
    {
      "text": "Quirk",
      "weight": 4,
      "color": "#FFD279"
    },
    {
      "text": "Bliss",
      "weight": 5,
      "color": "#FFD279"
    },
    {
      "text": "Finesse",
      "weight": 6,
      "color": "#FFD279"
    },
    {
      "text": "Zest",
      "weight": 4,
      "color": "#FFD279"
    },
    {
      "text": "Spunk",
      "weight": 5,
      "color": "#FFD279"
    },
    {
      "text": "Rogue",
      "weight": 6,
      "color": "#FFD279"
    },
    {
      "text": "Vibe",
      "weight": 4,
      "color": "#FFD279"
    },
    {
      "text": "Ephemeral",
      "weight": 6,
      "color": "#FFD279",
    },
    {
      "text": "Sesquipedalian",
      "weight": 8,
      "color": "#FFD279",
    },
    {
      "text": "Quixotic",
      "weight": 4,
      "color": "#FFD279",
    },
    {
      "text": "Lugubrious",
      "weight": 6,
      "color": "#FFD279",
    },
    {
      "text": "Ineffable",
      "weight": 7,
      "color": "#FFD279",
    },
    {
      "text": "Absquatulate",
      "weight": 4,
      "color": "#FFD279",
    },
    {
      "text": "Susurrus",
      "weight": 9,
      "color": "#FFD279",
    },
    {
      "text": "Vorfreude",
      "weight": 8,
      "color": "#FFD279",
    },
    {
      "text": "Brevity",
      "weight": 5,
      "color": "#FFD279"
    },
    {
      "text": "Serene",
      "weight": 6,
      "color": "#FFD279"
    },
    {
      "text": "Eloquent",
      "weight": 7,
      "color": "#FFD279"
    },
    {
      "text": "Zeal",
      "weight": 4,
      "color": "#FFD279"
    },
    {
      "text": "Cacophony",
      "weight": 5,
      "color": "#FFD279"
    },
    {
      "text": "Aplomb",
      "weight": 6,
      "color": "#FFD279"
    },
    {
      "text": "Ephemeral",
      "weight": 7,
      "color": "#FFD279"
    },
    {
      "text": "Vivid",
      "weight": 4,
      "color": "#FFD279"
    },
    {
      "text": "Frugal",
      "weight": 5,
      "color": "#FFD279"
    },
    {
      "text": "Euphoria",
      "weight": 6,
      "color": "#FFD279"
    },
    {
      "text": "Nifty",
      "weight": 5,
      "color": "#FFD279"
    },
    {
      "text": "Chime",
      "weight": 6,
      "color": "#FFD279"
    },
    {
      "text": "Blaze",
      "weight": 7,
      "color": "#FFD279"
    },
    {
      "text": "Swift",
      "weight": 4,
      "color": "#FFD279"
    },
    {
      "text": "Mirth",
      "weight": 5,
      "color": "#FFD279"
    },
    {
      "text": "Harmonic",
      "weight": 6,
      "color": "#FFD279"
    },
    {
      "text": "Tonic",
      "weight": 5,
      "color": "#FFD279"
    },
    {
      "text": "Pith",
      "weight": 4,
      "color": "#FFD279"
    },
    {
      "text": "Aura",
      "weight": 6,
      "color": "#FFD279"
    }

  ];
}
