import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Device {
  id: number;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'warning';  
}

interface Location {
  [locationName: string]: Device[];
}

interface DeviceTree {
  [category: string]: Location;
}

@Component({
  selector: 'app-device-tree',
  imports: [CommonModule, FormsModule],
  templateUrl: './device-tree.component.html',
  styleUrls: ['./device-tree.component.css']
})
export class DeviceTreeComponent implements OnInit {
  iotDevices: DeviceTree = {
    "رئیس کل": {
      "معاون فناوری های نوین": [
        { id: 1, name: "مدیر هوش مصنوعی و امنیت اطلاعات", type: "entertainment", status: "online" },
        { id: 2, name: "مدیر اداره زیرساخت و پشتیبانی فناوری اطلاعات", type: "lighting", status: "online" },
        { id: 3, name: "مدیر اداره مهندسی نرم افزار", type: "climate", status: "warning" },
      ],
      "رئیس مرکز حراست": [
        { id: 5, name: "مدیرکل حفاظت پرسنلی", type: "appliance", status: "online"},
        { id: 6, name: "مدیرکل حفاظت فناوری اطلاعات", type: "appliance", status: "online"},
      ]
    }
  };

  searchQuery: string = '';
  expandedCategories: Set<string> = new Set();
  expandedLocations: Set<string> = new Set();
  activeDeviceId: number | null = null;
  notificationMessage: string = '';
  // showNotification: boolean = false;

  ngOnInit(): void {
    // Component initialization if needed
  }

  getDeviceTreeEntries(): Array<{category: string, locations: Location}> {
    return Object.entries(this.iotDevices).map(([category, locations]) => ({
      category,
      locations
    }));
  }

  getLocationEntries(locations: Location): Array<{locationName: string, devices: Device[]}> {
    return Object.entries(locations).map(([locationName, devices]) => ({
      locationName,
      devices
    }));
  }

  countDevicesInCategory(locations: Location): number {
    return Object.values(locations).reduce((total, devices) => total + devices.length, 0);
  }

  toggleCategory(category: string): void {
    if (this.expandedCategories.has(category)) {
      this.expandedCategories.delete(category);
    } else {
      this.expandedCategories.add(category);
    }
  }

  isCategoryExpanded(category: string): boolean {
    return this.expandedCategories.has(category);
  }

  toggleLocation(locationKey: string): void {
    if (this.expandedLocations.has(locationKey)) {
      this.expandedLocations.delete(locationKey);
    } else {
      this.expandedLocations.add(locationKey);
    }
  }

  isLocationExpanded(category: string, locationName: string): boolean {
    return this.expandedLocations.has(`${category}-${locationName}`);
  }

  onDeviceClick(device: Device, category: string, location: string): void {
    this.activeDeviceId = device.id;
  }

  isDeviceActive(deviceId: number): boolean {
    return this.activeDeviceId === deviceId;
  }

}

